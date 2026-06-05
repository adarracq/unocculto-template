import { getFlagImage, MICRO_STATES } from '@/data/Countries';
import { THEME } from '@/theme/theme';
import { useEffect, useMemo, useState } from 'react';
import { Image, Keyboard, Platform, StyleSheet, View } from 'react-native';

import { MyText } from '@/components/atoms/MyText';
import InteractiveMap from '@/components/organisms/InteractiveMap';
import { Ionicons } from '@expo/vector-icons';
import type { GameViewProps } from '../GeoGameScreen';
import ArcadeSaisieControls from './ArcadeSaisieControls';

const getLevenshteinDistance = (a: string, b: string): number => {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    Math.min(
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    )
                );
            }
        }
    }
    return matrix[b.length][a.length];
};

// 💡 1. Extension des props pour accueillir hasFloatingButton
interface Props extends GameViewProps {
    hasFloatingButton?: boolean;
}

export default function GameLevel3View({ engine, mode, hasFloatingButton = false }: Props) { // 💡 2. Ajout de la prop
    const { currentQuestion, validateAnswer, mapFeedback, status } = engine;

    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const showSubscription = Keyboard.addListener(showEvent, (e) => {
            setKeyboardHeight(e.endCoordinates.height);
        });
        const hideSubscription = Keyboard.addListener(hideEvent, () => {
            setKeyboardHeight(0);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    if (!currentQuestion) return null;
    const target = currentQuestion.target;

    const expectedRawAnswer = mode === 'capital'
        ? (target.capital || 'Inconnue')
        : (target.name_fr || 'Inconnu');

    const expectedRawAnswerEn = mode === 'capital'
        ? (target.capital || 'Inconnue')
        : (target.name_en || 'Unknown');

    const handleTextSubmit = (text: string) => {
        const normalize = (str: string) =>
            str.normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/[-']/g, " ")
                .replace(/[^a-z0-9 ]/g, "")
                .replace(/\s+/g, " ")
                .trim();

        const input = normalize(text);
        const expectedFr = normalize(expectedRawAnswer);
        const expectedEn = normalize(expectedRawAnswerEn);

        const distanceFr = getLevenshteinDistance(input, expectedFr);
        const distanceEn = getLevenshteinDistance(input, expectedEn);

        const maxErrorsAllowedFr = expectedFr.length <= 3 ? 0 : Math.floor(expectedFr.length / 4);
        const maxErrorsAllowedEn = expectedEn.length <= 3 ? 0 : Math.floor(expectedEn.length / 4);

        if (distanceFr <= maxErrorsAllowedFr || distanceEn <= maxErrorsAllowedEn) {
            validateAnswer(target.code);
        } else {
            validateAnswer('WRONG_CODE');
        }
    };

    const cameraTarget = useMemo(() => {
        const isMicro = MICRO_STATES.includes(target.code);
        return {
            center: [target.longitude || 0, target.latitude || 0] as [number, number],
            zoom: isMicro ? 5 : 3
        };
    }, [target]);

    const dynamicRatio = useMemo(() => {
        if (mode !== 'flag') return 1.5;
        const source = getFlagImage(target.code);
        const { width, height } = Image.resolveAssetSource(source as any);
        return (width && height) ? width / height : 1.5;
    }, [target, mode]);

    const getMapColors = () => {
        const colors: Record<string, string> = {};

        if (mode !== 'flag') {
            colors[target.code] = THEME.colors.primary;
        }

        Object.keys(mapFeedback).forEach(code => {
            if (mapFeedback[code] === 'correct') colors[code] = THEME.colors.success;
            if (mapFeedback[code] === 'wrong') colors[code] = THEME.colors.danger;
        });

        return colors;
    };

    // 💡 3. LOGIQUE DYNAMIQUE DU PADDING BOTTOM
    // On prend la valeur maximale entre la hauteur du clavier OU notre espace pour le bouton flottant (si actif et en erreur)
    const dynamicPaddingBottom = Math.max(
        keyboardHeight,
        (status === 'error' && hasFloatingButton) ? 120 : 0
    );

    return (
        <View style={styles.container}>

            {/* 1. INPUT FLOTTANT ET FEEDBACK */}
            <View style={styles.topInputContainer}>
                <ArcadeSaisieControls
                    status={status as 'playing' | 'success' | 'error'}
                    onSubmit={handleTextSubmit}
                    placeholder={`IDENTIFIEZ ${mode === 'capital' ? 'LA CAPITALE' : 'LE TERRITOIRE'}`}
                />

                {status !== 'playing' && (
                    <View style={[styles.feedbackBox, { borderColor: status === 'success' ? THEME.colors.success + '40' : THEME.colors.danger + '40', backgroundColor: status === 'success' ? THEME.colors.success + '10' : THEME.colors.danger + '10' }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons
                                name={status === 'success' ? 'checkmark-circle' : 'close-circle'}
                                size={16}
                                color={status === 'success' ? THEME.colors.success : THEME.colors.danger}
                            />
                            <MyText variant="caps" style={{ color: status === 'success' ? THEME.colors.success : THEME.colors.danger, letterSpacing: 1 }}>
                                {status === 'success' ? 'EXACT' : 'RÉPONSE ATTENDUE'}
                            </MyText>
                        </View>
                        <MyText variant="h2" style={{ color: THEME.colors.text.primary, marginTop: 4 }}>
                            {expectedRawAnswer.toUpperCase()}
                        </MyText>
                    </View>
                )}
            </View>

            {/* 2. ZONE VISUELLE (Dynamiquement réduite par le clavier OU le bouton flottant) */}
            <View style={[styles.visualArea, { paddingBottom: dynamicPaddingBottom }]}>
                {mode === 'flag' ? (
                    <View style={styles.bigFlagContainer}>
                        <Image
                            source={getFlagImage(target.code)}
                            style={[styles.flagLarge, { aspectRatio: dynamicRatio }]}
                            resizeMode="contain"
                        />
                    </View>
                ) : (
                    <View style={styles.mapWrapper}>
                        <InteractiveMap
                            countryColors={getMapColors()}
                            focusCoordinates={cameraTarget.center}
                            zoomLevel={cameraTarget.zoom}
                        />
                    </View>
                )}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: THEME.colors.background,
    },
    topInputContainer: {
        position: 'absolute',
        top: 20,
        width: '100%',
        paddingHorizontal: THEME.metrics.spacing.lg,
        zIndex: 20,
    },

    feedbackBox: {
        marginTop: 12,
        padding: 12,
        borderRadius: THEME.metrics.radius.sm,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },

    visualArea: {
        flex: 1,
        justifyContent: 'center',
    },

    mapWrapper: {
        flex: 1,
        width: '100%',
    },

    bigFlagContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80, // On garde un peu d'espace en haut pour ne pas coller à l'input
    },
    flagLarge: {
        width: 280,
        height: undefined,
        borderRadius: THEME.metrics.radius.md,
        borderWidth: 2,
        borderColor: THEME.colors.glass.borderHighlight,
        shadowColor: THEME.colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
});