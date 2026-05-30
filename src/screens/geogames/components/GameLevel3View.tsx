import { getFlagImage, MICRO_STATES } from '@/data/Countries';
import { THEME } from '@/theme/theme';
import { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import InteractiveMap from '@/components/organisms/InteractiveMap';
import type { GameViewProps } from '../GeoGameScreen';
import ArcadeSaisieControls from './ArcadeSaisieControls';

export default function GameLevel3View({ engine, mode }: GameViewProps) {
    const { currentQuestion, validateAnswer, mapFeedback, status } = engine;

    // Sécurité au chargement
    if (!currentQuestion) return null;
    const target = currentQuestion.target;

    // --- LOGIQUE DE VALIDATION TEXTUELLE ---
    const handleTextSubmit = (text: string) => {
        // Fonction pour retirer les accents, majuscules et espaces superflus
        const normalize = (str: string) =>
            str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

        const input = normalize(text);
        // On compare soit avec la capitale, soit avec le nom (français)
        const expected = mode === 'capital'
            ? normalize(target.capital || '')
            : normalize(target.name_fr || target.name_fr || '');

        if (input === expected) {
            validateAnswer(target.code); // C'est la bonne réponse !
        } else {
            validateAnswer('WRONG_CODE'); // C'est faux, on déclenche l'erreur
        }
    };

    // --- LOGIQUE CAMERA (Focus Auto) ---
    const cameraTarget = useMemo(() => {
        const isMicro = MICRO_STATES.includes(target.code);
        return {
            center: [target.longitude || 0, target.latitude || 0] as [number, number],
            zoom: isMicro ? 5 : 3
        };
    }, [target]);

    // --- LOGIQUE IMAGE DRAPEAU ---
    const dynamicRatio = useMemo(() => {
        if (mode !== 'flag') return 1.5;
        const source = getFlagImage(target.code);
        const { width, height } = Image.resolveAssetSource(source as any);
        return (width && height) ? width / height : 1.5;
    }, [target, mode]);

    // --- LOGIQUE COULEURS DE LA CARTE ---
    const getMapColors = () => {
        const colors: Record<string, string> = {};

        // Highlight Cible (Sauf si mode flag pour ne pas tricher)
        if (mode !== 'flag') {
            colors[target.code] = THEME.colors.primary;
        }

        // Feedback de correction (Vert/Rouge)
        Object.keys(mapFeedback).forEach(code => {
            if (mapFeedback[code] === 'correct') colors[code] = THEME.colors.success;
            if (mapFeedback[code] === 'wrong') colors[code] = THEME.colors.danger;
        });

        return colors;
    };

    return (
        <View style={styles.container}>

            {/* 1. INPUT FLOTTANT (Terminal Holographique) */}
            <View style={styles.topInputContainer}>
                <ArcadeSaisieControls
                    status={status as 'playing' | 'success' | 'error'}
                    onSubmit={handleTextSubmit}
                    placeholder={`IDENTIFIEZ ${mode === 'capital' ? 'LA CAPITALE' : 'LE TERRITOIRE'}`}
                />
            </View>

            {/* 2. ZONE VISUELLE */}
            <View style={styles.visualArea}>
                {mode === 'flag' ? (
                    // MODE DRAPEAU : Gros drapeau centré
                    <View style={styles.bigFlagContainer}>
                        <Image
                            source={getFlagImage(target.code)}
                            style={[styles.flagLarge, { aspectRatio: dynamicRatio }]}
                            resizeMode="contain"
                        />
                    </View>
                ) : (
                    // AUTRES MODES : Carte du monde focalisée
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
        top: 20, // Ajustez selon la hauteur de votre ArcadeHeader
        width: '100%',
        paddingHorizontal: THEME.metrics.spacing.lg,
        zIndex: 20, // Toujours au-dessus de la carte
    },
    visualArea: {
        flex: 1,
        justifyContent: 'center'
    },

    // --- Styles Carte ---
    mapWrapper: {
        flex: 1,
        width: '100%',
        // On libère un peu d'espace en haut pour ne pas que l'input cache le pays
        paddingTop: 80,
    },

    // --- Styles Drapeau ---
    bigFlagContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80, // Laisse la place à l'input
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