// src/screens/arena/components/GameLevel3View.tsx
import { getFlagImage, MICRO_STATES } from '@/data/Countries';
import { THEME } from '@/theme/theme';
import { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { CyberText } from '@/components/atoms/CyberText';
import InteractiveMap from '@/components/organisms/InteractiveMap';
import { Ionicons } from '@expo/vector-icons';
import type { GameViewProps } from '../GeoGameScreen';
import ArcadeSaisieControls from './ArcadeSaisieControls';

// --- ALGORITHME DE TOLÉRANCE (Distance de Levenshtein) ---
// Calcule le nombre de caractères de différence entre deux chaînes
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
                    matrix[i - 1][j - 1] + 1, // Remplacement
                    Math.min(
                        matrix[i][j - 1] + 1, // Insertion
                        matrix[i - 1][j] + 1  // Suppression
                    )
                );
            }
        }
    }
    return matrix[b.length][a.length];
};

export default function GameLevel3View({ engine, mode }: GameViewProps) {
    const { currentQuestion, validateAnswer, mapFeedback, status } = engine;

    // Sécurité au chargement
    if (!currentQuestion) return null;
    const target = currentQuestion.target;

    // La réponse attendue brute FR (pour l'affichage et la validation)
    const expectedRawAnswer = mode === 'capital'
        ? (target.capital || 'Inconnue')
        : (target.name_fr || 'Inconnu');

    // La réponse attendue brute EN (pour la validation alternative)
    // (Si tu as aussi un champ `target.capital_en`, tu peux l'ajouter ici)
    const expectedRawAnswerEn = mode === 'capital'
        ? (target.capital || 'Inconnue')
        : (target.name_en || 'Unknown');

    // --- LOGIQUE DE VALIDATION TEXTUELLE TOLÉRANTE ---
    const handleTextSubmit = (text: string) => {
        // 1. Nettoyage extrême
        const normalize = (str: string) =>
            str.normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
                .toLowerCase()
                .replace(/[-']/g, " ") // Remplace les tirets et apostrophes par des espaces
                .replace(/[^a-z0-9 ]/g, "") // Supprime la ponctuation
                .replace(/\s+/g, " ") // Condense les espaces
                .trim();

        const input = normalize(text);
        const expectedFr = normalize(expectedRawAnswer);
        const expectedEn = normalize(expectedRawAnswerEn);

        // 2. Calcul de la distance pour les deux langues
        const distanceFr = getLevenshteinDistance(input, expectedFr);
        const distanceEn = getLevenshteinDistance(input, expectedEn);

        // 3. Calcul de la tolérance indépendante (car FR et EN n'ont pas la même longueur)
        const maxErrorsAllowedFr = expectedFr.length <= 3 ? 0 : Math.floor(expectedFr.length / 4);
        const maxErrorsAllowedEn = expectedEn.length <= 3 ? 0 : Math.floor(expectedEn.length / 4);

        // 4. Validation (valide si bon en FR *OU* en EN)
        if (distanceFr <= maxErrorsAllowedFr || distanceEn <= maxErrorsAllowedEn) {
            validateAnswer(target.code); // C'est validé !
        } else {
            validateAnswer('WRONG_CODE'); // Trop d'erreurs
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

            {/* 1. INPUT FLOTTANT ET FEEDBACK */}
            <View style={styles.topInputContainer}>
                <ArcadeSaisieControls
                    status={status as 'playing' | 'success' | 'error'}
                    onSubmit={handleTextSubmit}
                    placeholder={`IDENTIFIEZ ${mode === 'capital' ? 'LA CAPITALE' : 'LE TERRITOIRE'}`}
                />

                {/* 💡 AFFICHAGE DE LA BONNE RÉPONSE (Pendant l'animation de fin de tour) */}
                {status !== 'playing' && (
                    <View style={[styles.feedbackBox, { borderColor: status === 'success' ? THEME.colors.success + '40' : THEME.colors.danger + '40', backgroundColor: status === 'success' ? THEME.colors.success + '10' : THEME.colors.danger + '10' }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons
                                name={status === 'success' ? 'checkmark-circle' : 'close-circle'}
                                size={16}
                                color={status === 'success' ? THEME.colors.success : THEME.colors.danger}
                            />
                            <CyberText variant="caps" style={{ color: status === 'success' ? THEME.colors.success : THEME.colors.danger, letterSpacing: 1 }}>
                                {status === 'success' ? 'EXACT' : 'RÉPONSE ATTENDUE'}
                            </CyberText>
                        </View>
                        <CyberText variant="h2" style={{ color: THEME.colors.text.primary, marginTop: 4 }}>
                            {expectedRawAnswer.toUpperCase()}
                        </CyberText>
                    </View>
                )}
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
        top: 20,
        width: '100%',
        paddingHorizontal: THEME.metrics.spacing.lg,
        zIndex: 20,
    },

    // --- Styles du panneau de Feedback ---
    feedbackBox: {
        marginTop: 12,
        padding: 12,
        borderRadius: 12,
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
        justifyContent: 'center'
    },

    // --- Styles Carte ---
    mapWrapper: {
        flex: 1,
        width: '100%',
        paddingTop: 80,
    },

    // --- Styles Drapeau ---
    bigFlagContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80,
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