import MyButton from '@/components/atoms/MyButton';
import { MyText } from '@/components/atoms/MyText';
import InteractiveMap from '@/components/organisms/InteractiveMap';
import { ALL_COUNTRIES, getFlagImage, REGION_CAMERAS } from '@/data/Countries';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import type { GameViewProps } from '../GeoGameScreen';

interface Props extends GameViewProps {
    hasFloatingButton?: boolean;
}

export default function GameLevel2View({ engine, mode, regionCode, hasFloatingButton = false }: Props) {
    const { currentQuestion, validateAnswer, mapFeedback, status } = engine;
    const [userSelection, setUserSelection] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'playing') {
            setUserSelection(null);
        }
    }, [status, currentQuestion?.target?.code, mode]);

    // --- LOGIQUE DE LA CARTE ---
    const handleMapPress = (code: string) => {
        if (status !== 'playing') return;

        if (userSelection === code) {
            validateAnswer(code);
        } else {
            setUserSelection(code);
        }
    };

    const getMapColors = () => {
        const colors: Record<string, string> = {};

        if (status === 'playing' && userSelection) {
            colors[userSelection] = THEME.colors.primary;
        }

        if (mapFeedback && Object.keys(mapFeedback).length > 0) {
            Object.keys(mapFeedback).forEach(code => {
                if (mapFeedback[code] === 'correct') colors[code] = THEME.colors.success;
                if (mapFeedback[code] === 'wrong') colors[code] = THEME.colors.danger;
            });
        }

        return colors;
    };

    if (!currentQuestion) return null;

    const expectedName = currentQuestion.target.name_fr.toUpperCase();
    const selectedName = ALL_COUNTRIES.find(c => c.code === userSelection)?.name_fr.toUpperCase() || '';

    return (
        <View style={styles.container}>

            {/* 1. CARTE EN ARRIÈRE-PLAN */}
            <View style={StyleSheet.absoluteFill}>
                <InteractiveMap
                    countryColors={getMapColors()}
                    selectedCountry={userSelection}
                    onCountryPress={handleMapPress}
                    defaultCenter={REGION_CAMERAS[regionCode]?.center || [0, 0]}
                    defaultZoom={REGION_CAMERAS[regionCode]?.zoom || 1}
                />
            </View>

            {/* 2. HUD SUPÉRIEUR */}
            <View style={styles.headerHud} pointerEvents="none">
                <LinearGradient
                    colors={['rgba(5,5,7,0.95)', 'rgba(5,5,7,0)']}
                    style={StyleSheet.absoluteFill}
                />
                <View style={styles.headerContent}>
                    {mode === 'flag' ? (
                        <View style={styles.flagWrapper}>
                            <Image
                                source={getFlagImage(currentQuestion.target.code)}
                                style={styles.flagMedium}
                            />
                            <MyText variant="caps" colorType="secondary" style={{ marginTop: 8 }}>
                                LOCALISEZ CE DRAPEAU
                            </MyText>
                        </View>
                    ) : (
                        <View style={{ alignItems: 'center' }}>
                            <MyText variant="caps" colorType="secondary" style={{ marginBottom: 4 }}>
                                CIBLE À LOCALISER
                            </MyText>
                            <MyText variant="h1" align="center" style={{ fontSize: 28 }}>
                                {mode === 'capital'
                                    ? currentQuestion.target.capital?.toUpperCase()
                                    : expectedName}
                            </MyText>
                        </View>
                    )}
                </View>
            </View>

            {/* 3. HUD INFÉRIEUR */}
            <View style={styles.footerHud} pointerEvents="box-none">
                <LinearGradient
                    colors={['rgba(5,5,7,0)', 'rgba(5,5,7,0.95)', THEME.colors.background]}
                    style={StyleSheet.absoluteFill}
                />

                {/* 💡 CORRECTION ICI : Le paddingBottom augmente en cas d'erreur pour laisser la place au bouton */}
                <View style={[styles.footerContent,
                { paddingBottom: (status === 'error' && hasFloatingButton) ? 120 : 30 }
                ]}>
                    {status === 'playing' ? (
                        // BOUTON DE JEU NORMAL
                        <MyButton
                            title={userSelection ? "CONFIRMER" : "SCANNEZ LA CARTE"}
                            variant={'outline'}
                            iconLeft={userSelection ? "scan-circle-outline" : "finger-print-outline"}
                            iconRight={userSelection ? "arrow-forward" : undefined}
                            disabled={!userSelection}
                            onPress={() => userSelection && validateAnswer(userSelection)}
                        />
                    ) : (
                        // FEEDBACK VISUEL APRÈS VALIDATION
                        <View style={[styles.feedbackBox, {
                            borderColor: status === 'success' ? THEME.colors.success + '40' : THEME.colors.danger + '40',
                            backgroundColor: status === 'success' ? THEME.colors.success + '10' : THEME.colors.danger + '10'
                        }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <Ionicons
                                    name={status === 'success' ? 'checkmark-circle' : 'close-circle'}
                                    size={24}
                                    color={status === 'success' ? THEME.colors.success : THEME.colors.danger}
                                />
                                <MyText variant="h3" style={{ color: status === 'success' ? THEME.colors.success : THEME.colors.danger }}>
                                    {status === 'success' ? 'CIBLE ATTEINTE' : 'CIBLE MANQUÉE'}
                                </MyText>
                            </View>

                            {status === 'error' && (
                                <MyText variant="bodySmall" style={{ color: THEME.colors.text.secondary, marginTop: 8, letterSpacing: 1 }}>
                                    MAUVAISE REPONSE : <MyText variant="bodySmall" style={{ color: THEME.colors.text.primary }}>{selectedName}</MyText>
                                </MyText>
                            )}
                        </View>
                    )}
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background,
    },
    headerHud: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 180,
        zIndex: 10,
    },
    headerContent: {
        alignItems: 'center',
        paddingTop: 10,
    },
    flagWrapper: {
        alignItems: 'center',
        shadowColor: THEME.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    flagMedium: {
        width: 120,
        height: 80,
        borderRadius: THEME.metrics.radius.sm,
        borderWidth: 1,
        borderColor: THEME.colors.glass.borderHighlight,
    },
    footerHud: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        minHeight: 140,
        zIndex: 10,
        justifyContent: 'flex-end',
    },
    footerContent: {
        paddingHorizontal: THEME.paddings.horizontal,
        // Le paddingBottom est maintenant géré dynamiquement dans le JSX
    },
    feedbackBox: {
        paddingVertical: 16,
        paddingHorizontal: THEME.paddings.horizontal,
        borderRadius: THEME.metrics.radius.sm,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});