import { ALL_COUNTRIES, REGION_CAMERAS } from '@/data/Countries';
import { THEME } from '@/theme/theme';
import { useEffect, useMemo, useState } from 'react';
import { Keyboard, Platform, StyleSheet, View } from 'react-native';

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
                    Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                );
            }
        }
    }
    return matrix[b.length][a.length];
};

const normalize = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[-']/g, " ").replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();

export default function GameLevel4View({ engine, mode }: GameViewProps) {
    const { currentQuestion, validateAnswer } = engine;

    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [foundCodes, setFoundCodes] = useState<Set<string>>(new Set());

    // États pour le feedback visuel
    const [lastFoundName, setLastFoundName] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);

    // 💡 1. On récupère TOUS les pays du continent actuel
    const regionCountries = useMemo(() => {
        if (!currentQuestion) return [];
        return ALL_COUNTRIES.filter(c => c.continentId === currentQuestion.target.continentId);
    }, [currentQuestion]);

    useEffect(() => {
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
        const showSub = Keyboard.addListener(showEvent, (e) => setKeyboardHeight(e.endCoordinates.height));
        const hideSub = Keyboard.addListener(hideEvent, () => setKeyboardHeight(0));
        return () => { showSub.remove(); hideSub.remove(); };
    }, []);

    // 💡 2. La validation compare la saisie avec TOUT le continent
    const handleTextSubmit = (text: string) => {
        const input = normalize(text);
        let match = null;

        for (const country of regionCountries) {
            if (foundCodes.has(country.code)) continue;

            const expectedFr = normalize(mode === 'capital' ? (country.capital || '') : country.name_fr);
            const expectedEn = normalize(mode === 'capital' ? (country.capital || '') : (country.name_en || ''));

            const distanceFr = getLevenshteinDistance(input, expectedFr);
            const distanceEn = getLevenshteinDistance(input, expectedEn);

            const maxAllowedFr = expectedFr.length <= 3 ? 0 : Math.floor(expectedFr.length / 4);
            const maxAllowedEn = expectedEn.length <= 3 ? 0 : Math.floor(expectedEn.length / 4);

            if (distanceFr <= maxAllowedFr || distanceEn <= maxAllowedEn) {
                match = country;
                break;
            }
        }

        if (match) {
            setFoundCodes(prev => new Set(prev).add(match!.code));

            const displayName = mode === 'capital' ? match.capital : match.name_fr;
            setLastFoundName(displayName || '');
            setTimeout(() => setLastFoundName(null), 2000);

            validateAnswer(match.code);

            return true; // 💡 DIT AU CHAMP DE SE VIDER TOUT DE SUITE
        } else {
            setShowError(true);

            // 💡 ASTUCE UX : Réduit à 400ms pour ne pas bloquer le joueur trop longtemps s'il fait une faute de frappe
            setTimeout(() => setShowError(false), 400);

            validateAnswer('WRONG_CODE');

            return true; // 💡 DIT AU CHAMP DE SE VIDER MEME EN CAS D'ERREUR
        }
    };

    // 💡 3. Caméra totalement figée sur le continent
    const cameraTarget = useMemo(() => {
        if (!currentQuestion) return REGION_CAMERAS.WLD;
        return REGION_CAMERAS[currentQuestion.target.continentId] || REGION_CAMERAS.WLD;
    }, [currentQuestion]);

    // 💡 4. Seuls les pays de `foundCodes` apparaissent
    const getMapColors = () => {
        const colors: Record<string, string> = {};
        foundCodes.forEach(code => {
            colors[code] = THEME.colors.primary;
        });
        return colors;
    };

    if (!currentQuestion) return null;

    return (
        <View style={styles.container}>
            <View style={styles.topInputContainer}>
                <ArcadeSaisieControls
                    // 💡 LIGNE MODIFIÉE : On a retiré le passage en 'success' pour le champ texte
                    status={showError ? 'error' : 'playing'}
                    onSubmit={handleTextSubmit}
                    placeholder={`SAISISSEZ ${mode === 'capital' ? 'UNE CAPITALE' : 'UN PAYS'}...`}
                />

                {/* Le badge vert continue de s'afficher indépendamment en dessous */}
                {lastFoundName && (
                    <View style={styles.successBadge}>
                        <Ionicons name="checkmark-circle" size={18} color={THEME.colors.success} />
                        <MyText variant="h3" style={{ color: THEME.colors.success }}>
                            {lastFoundName.toUpperCase()}
                        </MyText>
                    </View>
                )}
            </View>
            <View style={[styles.visualArea, { paddingBottom: keyboardHeight }]}>
                <View style={styles.mapWrapper}>
                    <InteractiveMap
                        countryColors={getMapColors()}
                        focusCoordinates={cameraTarget.center}
                        zoomLevel={cameraTarget.zoom}
                        defaultFillColor={THEME.colors.background}
                        hideUncoloredBorders={true} // Fusionne avec le fond noir
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.colors.background },
    topInputContainer: { position: 'absolute', top: 20, width: '100%', paddingHorizontal: THEME.metrics.spacing.lg, zIndex: 20 },
    successBadge: {
        marginTop: 12, padding: 12, borderRadius: THEME.metrics.radius.sm, borderWidth: 1,
        borderColor: THEME.colors.success + '40', backgroundColor: THEME.colors.success + '10',
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8
    },
    visualArea: { flex: 1, justifyContent: 'center' },
    mapWrapper: { flex: 1, width: '100%', paddingTop: 80 }
});