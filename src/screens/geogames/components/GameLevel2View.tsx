import { CyberText } from '@/components/atoms/CyberText';
import MyButton from '@/components/atoms/MyButton'; // 💡 Import du bouton Premium
import InteractiveMap from '@/components/organisms/InteractiveMap';
import { getFlagImage, REGION_CAMERAS } from '@/data/Countries';
import { THEME } from '@/theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import type { GameViewProps } from '../GeoGameScreen';

export default function GameLevel2View({ engine, mode, regionCode }: GameViewProps) {
    const { currentQuestion, validateAnswer, mapFeedback, status } = engine;
    const [userSelection, setUserSelection] = useState<string | null>(null);

    // 💡 BUG FIX : Purger la sélection à chaque nouvelle question pour éviter la surbrillance fantôme
    useEffect(() => {
        setUserSelection(null);
    }, [currentQuestion?.target?.code]); // Dépendance sur le code de la cible, pas juste l'objet

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

        // Seulement si le statut est "playing" et que l'utilisateur a fait un choix délibéré
        if (status === 'playing' && userSelection) {
            colors[userSelection] = THEME.colors.primary;
        }

        // Si le moteur a validé (Feedback visuel)
        if (mapFeedback && Object.keys(mapFeedback).length > 0) {
            Object.keys(mapFeedback).forEach(code => {
                if (mapFeedback[code] === 'correct') colors[code] = THEME.colors.success;
                if (mapFeedback[code] === 'wrong') colors[code] = THEME.colors.danger;
            });
        }

        return colors;
    };

    if (!currentQuestion) return null;

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
                            <CyberText variant="caps" colorType="secondary" style={{ marginTop: 8 }}>
                                LOCALISEZ CE DRAPEAU
                            </CyberText>
                        </View>
                    ) : (
                        <View style={{ alignItems: 'center' }}>
                            <CyberText variant="caps" colorType="secondary" style={{ marginBottom: 4 }}>
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

            {/* 3. HUD INFÉRIEUR (Bouton Premium) */}
            <View style={styles.footerHud} pointerEvents="box-none">
                <LinearGradient
                    colors={['rgba(5,5,7,0)', 'rgba(5,5,7,0.95)', THEME.colors.background]}
                    style={StyleSheet.absoluteFill}
                />

                <View style={styles.footerContent}>
                    {status === 'playing' && (
                        // 💡 Utilisation de MyButton
                        <MyButton
                            title={userSelection ? "CONFIRMER" : "SCANNEZ LA CARTE"}
                            variant={userSelection ? 'gradient' : 'outline'}
                            iconLeft={userSelection ? "scan-circle-outline" : "finger-print-outline"}
                            iconRight={userSelection ? "arrow-forward" : undefined}
                            disabled={!userSelection}
                            onPress={() => userSelection && validateAnswer(userSelection)}
                        />
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
        borderRadius: 8,
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
        paddingHorizontal: 20,
        paddingBottom: 40,
    }
});