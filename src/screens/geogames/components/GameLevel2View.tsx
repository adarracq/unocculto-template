import { CyberText } from '@/components/atoms/CyberText';
import InteractiveMap from '@/components/organisms/InteractiveMap';
import { getFlagImage } from '@/data/Countries';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import type { GameViewProps } from '../GeoGameScreen';

// Fallback pour les caméras par défaut si vous n'avez plus l'import REGION_CAMERAS
const REGION_CAMERAS: Record<string, { center: [number, number], zoom: number }> = {
    EUR: { center: [15, 50], zoom: 3 },
    ASI: { center: [90, 40], zoom: 2 },
    AFR: { center: [20, 0], zoom: 2.5 },
    AME: { center: [-80, 15], zoom: 1.5 },
    OCE: { center: [135, -25], zoom: 3 },
    WLD: { center: [10, 20], zoom: 1 }
};

export default function GameLevel2View({ engine, mode, regionCode }: GameViewProps) {
    const { currentQuestion, validateAnswer, mapFeedback, status } = engine;
    const [userSelection, setUserSelection] = useState<string | null>(null);

    // Reset de la sélection quand on passe à la question suivante
    useEffect(() => {
        setUserSelection(null);
    }, [currentQuestion]);

    // --- LOGIQUE DE LA CARTE ---
    const handleMapPress = (code: string) => {
        if (status !== 'playing') return;

        if (userSelection === code) {
            // Double tap pour valider rapidement
            validateAnswer(code);
        } else {
            // Simple tap pour cibler
            setUserSelection(code);
        }
    };

    const getMapColors = () => {
        const colors: Record<string, string> = {};

        // Ciblage du Joueur (Mise en évidence en bleu/or)
        if (status === 'playing' && userSelection) {
            colors[userSelection] = THEME.colors.primary;
        }

        // Retour du moteur après validation (Le Vert/Rouge écrase le ciblage)
        Object.keys(mapFeedback).forEach(code => {
            if (mapFeedback[code] === 'correct') colors[code] = THEME.colors.success;
            if (mapFeedback[code] === 'wrong') colors[code] = THEME.colors.danger;
        });

        return colors;
    };

    if (!currentQuestion) return null;

    return (
        <View style={styles.container}>

            {/* 1. CARTE EN ARRIÈRE-PLAN (Plein écran) */}
            <View style={StyleSheet.absoluteFill}>
                <InteractiveMap
                    countryColors={getMapColors()}
                    selectedCountry={userSelection}
                    onCountryPress={handleMapPress}
                    defaultCenter={REGION_CAMERAS[regionCode]?.center || [0, 0]}
                    defaultZoom={REGION_CAMERAS[regionCode]?.zoom || 1}
                />
            </View>

            {/* 2. HUD SUPÉRIEUR (La consigne / L'objectif) */}
            <View style={styles.headerHud}>
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
                            <CyberText variant="caps" colorType="secondary" style={{ marginTop: 8, letterSpacing: 1 }}>
                                LOCALISEZ CE DRAPEAU
                            </CyberText>
                        </View>
                    ) : (
                        <View style={{ alignItems: 'center' }}>
                            <CyberText variant="caps" colorType="secondary" style={{ letterSpacing: 2, marginBottom: 4 }}>
                                CIBLE À LOCALISER
                            </CyberText>
                            <CyberText variant="h1" align="center" style={{ fontSize: 28 }}>
                                {mode === 'capital'
                                    ? currentQuestion.target.capital?.toUpperCase()
                                    : currentQuestion.target.name_fr.toUpperCase()}
                            </CyberText>
                        </View>
                    )}
                </View>
            </View>

            {/* 3. HUD INFÉRIEUR (Feedback & Validation) */}
            <View style={styles.footerHud}>
                <LinearGradient
                    colors={['rgba(5,5,7,0)', 'rgba(5,5,7,0.95)', THEME.colors.background]}
                    style={StyleSheet.absoluteFill}
                />

                <View style={styles.footerContent}>
                    {/* Bouton d'Action */}
                    {status === 'playing' && (
                        <TouchableOpacity
                            activeOpacity={userSelection ? 0.8 : 1}
                            onPress={() => userSelection && validateAnswer(userSelection)}
                            disabled={!userSelection}
                            style={[
                                styles.actionButton,
                                !userSelection ? styles.actionButtonDisabled : styles.actionButtonActive
                            ]}
                        >
                            <CyberText
                                variant="caps"
                                style={{ color: userSelection ? THEME.colors.background : THEME.colors.text.disabled }}
                            >
                                {userSelection ? "CONFIRMER LES COORDONNÉES" : "SCANNEZ LA CARTE"}
                            </CyberText>
                            {userSelection && (
                                <Ionicons name="scan-outline" size={20} color={THEME.colors.background} style={{ marginLeft: 8 }} />
                            )}
                        </TouchableOpacity>
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

    // HUD Header
    headerHud: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 180,
        zIndex: 10,
        pointerEvents: 'none', // Laisse passer les clics vers la carte
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
        aspectRatio: 1.5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: THEME.colors.glass.borderHighlight,
    },

    // HUD Footer
    footerHud: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        minHeight: 140,
        zIndex: 10,
        justifyContent: 'flex-end',
        pointerEvents: 'box-none',
    },
    footerContent: {
        paddingHorizontal: THEME.metrics.spacing.lg,
        paddingBottom: THEME.metrics.spacing.xl,
    },

    // Boutons Action
    actionButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        borderRadius: THEME.metrics.radius.md,
        overflow: 'hidden',
    },
    actionButtonActive: {
        backgroundColor: THEME.colors.primary,
        shadowColor: THEME.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
    },
    actionButtonDisabled: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
    }
});