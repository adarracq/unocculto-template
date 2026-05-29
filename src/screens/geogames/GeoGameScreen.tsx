import { CyberText } from '@/components/atoms/CyberText';
import { GAME_CONFIG, GameMode } from '@/constants/GameConfig';
import { ALL_COUNTRIES } from '@/data/Countries'; // Votre base de données
import { useArcadeGame } from '@/hooks/useArcadeGame';
import { useArenaStore } from '@/store/useArenaStore';
import { THEME } from '@/theme/theme';
import { functions } from '@/utils/Functions';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import CustomModal from '@/components/molecules/CustomModal';
import { Target } from 'lucide-react-native';
import ArcadeHeader from './components/ArcadeHeader';
import GameLevel1View from './components/GameLevel1View';
import GameLevel2View from './components/GameLevel2View';
import GameLevel3View from './components/GameLevel3View';
import GameLevel4View from './components/GameLevel4View';


// --- INTERFACE PARTAGÉE POUR LES VUES ---
export interface GameViewProps {
    engine: ReturnType<typeof useArcadeGame>;
    mode: GameMode;
    regionCode: string;
}

// --- LOGIQUE SCORE EXACTE ---
interface ScoreDetails {
    accuracy: number;
    timeTaken: number;
    basePoints: number;
    timeBonus: number;
    isDaily: boolean;
    totalScore: number;
    alreadyDone: boolean;
    timeBonusEligible: boolean;
}

const calculateDetailedScore = (accuracy: number, timeTaken: number, isDaily: boolean, alreadyDone: boolean): ScoreDetails => {
    const basePoints = Math.round((accuracy / 100) * 100);

    let potentialTimeBonus = 0;
    if (timeTaken <= 60) potentialTimeBonus = 50;
    else if (timeTaken <= 120) potentialTimeBonus = 30;
    else if (timeTaken <= 300) potentialTimeBonus = 10;

    const isEligibleForTimeBonus = accuracy >= 80;
    const timeBonus = isEligibleForTimeBonus ? potentialTimeBonus : 0;

    let total = basePoints + timeBonus;

    if (alreadyDone) total = Math.round(total * 0.2); // 20% des points si déjà fait
    if (isDaily) total *= 2; // Bonus quotidien

    return {
        accuracy,
        timeTaken,
        basePoints,
        timeBonus,
        isDaily,
        totalScore: total,
        alreadyDone,
        timeBonusEligible: isEligibleForTimeBonus
    };
};

export default function GeoGameScreen() {
    const router = useRouter();

    // --- 1. PARAMÈTRES (Expo Router) ---
    const { regionId, mode, level, alreadyDone, isDailyBonus } = useLocalSearchParams<{
        regionId: string;
        mode: string;
        level: string;
        alreadyDone: string;
        isDailyBonus: string;
    }>();

    const currentMode = (mode || 'country') as GameMode;
    const regionCode = regionId || 'EUR';
    const currentLevelId = parseInt(level || '1', 10);
    const isAlreadyDone = alreadyDone === 'true';
    const isDaily = isDailyBonus === 'true';

    // --- 2. DATA ---
    const regionCountries = useMemo(() => {
        if (regionCode === 'WLD') return ALL_COUNTRIES;
        return ALL_COUNTRIES.filter(c => c.continentId === regionCode);
    }, [regionCode]);

    // --- 3. STATE & STORE (Remplace l'API) ---
    const [isResultModalVisible, setResultModalVisible] = useState(false);
    const [resultDetails, setResultDetails] = useState<ScoreDetails | null>(null);

    const saveLevelResult = useArenaStore(state => state.saveLevelResult);

    // --- 4. GAME ENGINE HOOK ---
    const handleGameFinish = (stats: { timeTaken: number; accuracy: number; errors: number }) => {
        const details = calculateDetailedScore(
            stats.accuracy,
            stats.timeTaken,
            isDaily,
            isAlreadyDone
        );

        setResultDetails(details);
        setResultModalVisible(true);

        // SAUVEGARDE HORS-LIGNE
        saveLevelResult({
            regionId: regionCode,
            modeId: currentMode,
            levelId: currentLevelId,
            timeTaken: stats.timeTaken,
            accuracy: stats.accuracy,
            // totalScore pourrait être rajouté dans votre store plus tard si vous avez un système d'XP global
        });
    };

    const gameEngine = useArcadeGame(
        regionCountries,
        currentLevelId,
        currentMode,
        handleGameFinish
    );

    // --- 5. RENDER VIEW SELECTION ---
    const renderGameView = () => {
        const commonProps: GameViewProps = {
            engine: gameEngine,
            mode: currentMode,
            regionCode
        };

        switch (currentLevelId) {
            case 1: return <GameLevel1View {...commonProps} />;
            case 2: return <GameLevel2View {...commonProps} />;
            case 3: return <GameLevel3View {...commonProps} />;
            case 4: return <GameLevel4View {...commonProps} />;
            default: return null;
        }
    };

    return (
        <View style={styles.container}>

            {/* HEADER : Sécurisé contre les erreurs null. Utilise les variables directement issues de l'engine */}
            <ArcadeHeader
                currentIndex={gameEngine.currentIndex}
                total={gameEngine.total}
                timeLeft={gameEngine.elapsedTime} // Optionnel : à adapter à votre nouveau design ArcadeHeader
                accuracy={
                    gameEngine.currentIndex === 0
                        ? 100
                        : Math.max(0, ((gameEngine.currentIndex - gameEngine.errors) / gameEngine.currentIndex) * 100)
                }
                title={GAME_CONFIG[currentMode]?.levels.find(l => l.id === currentLevelId)?.title || 'SIMULATION'}
            />

            <View style={styles.gameViewWrapper}>
                {gameEngine.status !== 'loading' && renderGameView()}
            </View>

            {/* MODAL RÉSULTATS EXACTEMENT COMME VOTRE ORIGINAL MAIS AVEC LE THEME OLED */}
            <CustomModal
                visible={isResultModalVisible}
                onConfirm={() => router.back()}
                title="MISSION TERMINÉE"
                color={THEME.colors.primary}
            >
                {resultDetails && (
                    <View style={styles.resultContainer}>

                        <View style={styles.statRow}>
                            <View style={styles.statLabel}>
                                <Target size={18} color={THEME.colors.text.secondary} />
                                <CyberText variant="body" colorType="secondary">Précision</CyberText>
                            </View>
                            <View style={styles.statValue}>
                                <CyberText variant="body" style={{ fontWeight: 'bold' }}>{resultDetails.accuracy}%</CyberText>
                                <CyberText variant="bodySmall" style={styles.pointsText}>+{resultDetails.basePoints}</CyberText>
                            </View>
                        </View>

                        <View style={[styles.statRow, !resultDetails.timeBonusEligible && { opacity: 0.5 }]}>
                            <View style={styles.statLabel}>
                                <Ionicons name="time" size={18} color={THEME.colors.text.secondary} />
                                <View>
                                    <CyberText variant="body" colorType="secondary">Temps</CyberText>
                                    {!resultDetails.timeBonusEligible && (
                                        <CyberText variant="bodySmall" style={{ color: THEME.colors.danger }}>(Précision faible)</CyberText>
                                    )}
                                </View>
                            </View>
                            <View style={styles.statValue}>
                                <CyberText variant="body" style={{ fontWeight: 'bold' }}>{functions.formatTime(resultDetails.timeTaken)}</CyberText>
                                {resultDetails.timeBonus > 0 ? (
                                    <CyberText variant="bodySmall" style={styles.pointsText}>+{resultDetails.timeBonus}</CyberText>
                                ) : (
                                    <CyberText variant="bodySmall" colorType="disabled" style={styles.pointsText}>--</CyberText>
                                )}
                            </View>
                        </View>

                        {resultDetails.isDaily && (
                            <View style={[styles.statRow, styles.bonusRow]}>
                                <View style={styles.statLabel}>
                                    <Ionicons name="flash" size={18} color={THEME.colors.background} />
                                    <CyberText variant="body" style={{ color: THEME.colors.background, fontWeight: 'bold' }}>Bonus Quotidien</CyberText>
                                </View>
                                <CyberText variant="body" style={{ color: THEME.colors.background, fontWeight: 'bold' }}>x2</CyberText>
                            </View>
                        )}

                        {resultDetails.alreadyDone && (
                            <View style={styles.statRow}>
                                <View style={styles.statLabel}>
                                    <Ionicons name="repeat" size={18} color={THEME.colors.text.secondary} />
                                    <CyberText variant="body" colorType="secondary">Déjà complété</CyberText>
                                </View>
                                <View style={styles.statValue}>
                                    <CyberText variant="body" style={{ color: THEME.colors.danger, fontWeight: 'bold' }}>÷ 5</CyberText>
                                </View>
                            </View>
                        )}

                        <View style={styles.divider} />

                        <View style={styles.totalRow}>
                            <CyberText variant="body" colorType="secondary" style={{ letterSpacing: 2 }}>TOTAL XP</CyberText>
                            <CyberText variant="h1" style={{ color: THEME.colors.primary }}>{resultDetails.totalScore}</CyberText>
                        </View>

                    </View>
                )}
            </CustomModal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background
    },
    gameViewWrapper: {
        flex: 1
    },

    // --- Styles Modal (Adaptés au Thème) ---
    resultContainer: { width: '100%', gap: 12, paddingTop: 10 },
    statRow: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingVertical: 12, paddingHorizontal: 16,
        backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 12,
        borderWidth: 1, borderColor: THEME.colors.glass.border
    },
    statLabel: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    statValue: { alignItems: 'flex-end' },
    pointsText: { color: THEME.colors.primary, fontWeight: 'bold' },
    bonusRow: { backgroundColor: THEME.colors.primary, borderColor: THEME.colors.primary },
    divider: { height: 1, backgroundColor: THEME.colors.glass.borderHighlight, marginVertical: 10 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }
});