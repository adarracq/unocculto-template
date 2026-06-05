import { MyText } from '@/components/atoms/MyText';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Keyboard, Platform, StyleSheet, View } from 'react-native';

import type { GameViewProps } from '../GeoGameScreen';
import ArcadeSaisieControls from './ArcadeSaisieControls';
import SingleCountryMap from './SingleCountryMap';

// --- ALGORITHME DE TOLÉRANCE (Distance de Levenshtein) ---
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

export default function GameLevel5View({ engine, mode }: GameViewProps) {
    const { currentQuestion, validateAnswer, status } = engine;

    // 💡 État pour stocker la hauteur du clavier
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    // 💡 Écouteurs pour le clavier
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

    // La réponse attendue brute FR et EN
    const expectedRawAnswer = mode === 'capital'
        ? (target.capital || 'Inconnue')
        : (target.name_fr || 'Inconnu');

    const expectedRawAnswerEn = mode === 'capital'
        ? (target.capital || 'Inconnue')
        : (target.name_en || 'Unknown');

    // --- LOGIQUE DE VALIDATION TEXTUELLE TOLÉRANTE ---
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

    return (
        <View style={styles.container}>

            {/* 1. INPUT ET FEEDBACK : En haut dans le flux normal */}
            <View style={styles.inputWrapper}>
                <ArcadeSaisieControls
                    status={status as 'playing' | 'success' | 'error'}
                    onSubmit={handleTextSubmit}
                    placeholder={`IDENTIFIEZ ${mode === 'capital' ? 'LA CAPITALE' : 'LE TERRITOIRE'}`}
                />

                {/* 💡 PANNEAU DE FEEDBACK (Visible uniquement à la fin) */}
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

            {/* 2. MAP : Prend tout l'espace restant, et se réduit avec le clavier */}
            <View style={[styles.mapArea, { paddingBottom: keyboardHeight }]}>
                <SingleCountryMap
                    countryCode={target.code}
                    status={status as 'playing' | 'success' | 'error'}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: THEME.colors.background,
    },
    inputWrapper: {
        width: '100%',
        zIndex: 20,
        paddingHorizontal: THEME.metrics.spacing.lg,
        paddingTop: THEME.metrics.spacing.md,
        paddingBottom: THEME.metrics.spacing.md,
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
    mapArea: {
        flex: 1,
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
    }
});