import MyButton from '@/components/atoms/MyButton';
import { MyText } from '@/components/atoms/MyText';
import { BaseBottomSheet } from '@/components/molecules/BaseBottomSheet';
import { GAME_CONFIG, GameMode } from '@/constants/GameConfig';
import { ALL_COUNTRIES } from '@/data/Countries';
import { useArcadeGame } from '@/hooks/useArcadeGame';
import { useArenaStore } from '@/store/useArenaStore';
import { THEME } from '@/theme/theme';
import { functions } from '@/utils/Functions';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import ArcadeHeader from './components/ArcadeHeader';
import GameLevel1View from './components/GameLevel1View';
import GameLevel2View from './components/GameLevel2View';
import GameLevel3View from './components/GameLevel3View';
import GameLevel4View from './components/GameLevel4View';
import GameLevel5View from './components/GameLevel5View';

export interface GameViewProps {
    engine: ReturnType<typeof useArcadeGame>;
    mode: GameMode;
    regionCode: string;
}

interface GameStats {
    accuracy: number;
    timeTaken: number;
    errors: number;
    grade: 'PARFAIT' | 'SUCCÈS' | 'À AMÉLIORER';
    gradeColor: string;
}

const calculateStats = (accuracy: number, timeTaken: number, errors: number): GameStats => {
    let grade: GameStats['grade'] = 'À AMÉLIORER';
    let gradeColor: string = THEME.colors.danger;

    if (accuracy === 100) {
        grade = 'PARFAIT';
        gradeColor = THEME.colors.levels.gold;
    } else if (accuracy >= 90) {
        grade = 'SUCCÈS';
        gradeColor = THEME.colors.success;
    }

    return { accuracy, timeTaken, errors, grade, gradeColor };
};

export default function GeoGameScreen() {
    const router = useRouter();

    const { regionId, mode, level, batch } = useLocalSearchParams<{
        regionId?: string; mode: string; level: string; batch?: string;
    }>();

    const currentMode = (mode || 'country') as GameMode;
    const currentLevelId = parseInt(level || '1', 10);

    const isTrainingMode = !!batch;
    const regionCode = regionId || (isTrainingMode ? 'WLD' : 'EUR');

    const regionCountries = useMemo(() => {
        if (batch) {
            const batchCodes = batch.split(',');
            return ALL_COUNTRIES.filter(c => batchCodes.includes(c.code));
        }

        if (regionCode === 'WLD') return ALL_COUNTRIES;
        return ALL_COUNTRIES.filter(c => c.continentId === regionCode);
    }, [regionCode, batch]);

    const [isResultModalVisible, setResultModalVisible] = useState(false);
    const [missionStats, setMissionStats] = useState<GameStats | null>(null);

    const saveLevelResult = useArenaStore(state => state.saveLevelResult);

    // 💡 NOUVELLE FONCTION DE SORTIE PROPRE
    const handleExit = () => {
        setResultModalVisible(false);
        setMissionStats(null); // Nettoyage des statistiques en mémoire

        // On laisse 150ms à la modale pour amorcer sa fermeture avant de tuer l'écran
        setTimeout(() => {
            if (router.canGoBack()) {
                router.back();
            } else {
                router.replace('/');
            }
        }, 150);
    };

    const handleGameFinish = (stats: { timeTaken: number; accuracy: number; errors: number }) => {
        const finalStats = calculateStats(stats.accuracy, stats.timeTaken, stats.errors);

        setMissionStats(finalStats);
        setResultModalVisible(true);

        if (!isTrainingMode) {
            saveLevelResult({
                regionId: regionCode,
                modeId: currentMode,
                levelId: currentLevelId,
                timeTaken: stats.timeTaken,
                accuracy: stats.accuracy,
            });
        }
    };

    const gameEngine = useArcadeGame(regionCountries, currentLevelId, currentMode, handleGameFinish);

    const renderGameView = () => {
        const commonProps: GameViewProps = { engine: gameEngine, mode: currentMode, regionCode };
        switch (currentLevelId) {
            case 1: return <GameLevel1View {...commonProps} />;
            case 2: return <GameLevel2View {...commonProps} />;
            case 3: return <GameLevel3View {...commonProps} />;
            case 4: return <GameLevel4View {...commonProps} />;
            case 5: return <GameLevel5View {...commonProps} />;
            default: return null;
        }
    };

    const liveAccuracy = useMemo(() => {
        if (currentLevelId === 4) {
            const totalAttempts = gameEngine.currentIndex + gameEngine.errors;
            return totalAttempts === 0 ? 100 : Math.max(0, Math.round((gameEngine.currentIndex / totalAttempts) * 100));
        } else {
            return gameEngine.currentIndex === 0 ? 100 : Math.max(0, Math.round(((gameEngine.currentIndex - gameEngine.errors) / gameEngine.currentIndex) * 100));
        }
    }, [currentLevelId, gameEngine.currentIndex, gameEngine.errors]);

    return (
        <View style={styles.container}>
            <ArcadeHeader
                currentIndex={gameEngine.currentIndex}
                total={gameEngine.total}
                timeLeft={gameEngine.elapsedTime}
                accuracy={liveAccuracy}
                title={GAME_CONFIG[currentMode]?.levels.find(l => l.id === currentLevelId)?.title || 'SIMULATION'}
            />

            <View style={styles.gameViewWrapper}>
                {gameEngine.status !== 'loading' && renderGameView()}
            </View>

            <BaseBottomSheet
                isVisible={isResultModalVisible}
                onClose={handleExit} // 💡 Correction ici
                title={isTrainingMode ? "RAPPORT D'ENTRAÎNEMENT" : "RAPPORT"}
            >
                {missionStats && (
                    <View style={styles.resultContainer}>
                        <View style={styles.gradeContainer}>
                            <View style={[styles.iconWrapper, { borderColor: missionStats.gradeColor + '40', backgroundColor: missionStats.gradeColor + '10' }]}>
                                <Ionicons name="analytics" size={40} color={missionStats.gradeColor} />
                            </View>
                            <MyText variant="caps" colorType="secondary" style={{ letterSpacing: 2, marginBottom: 4, marginTop: 12 }}>
                                ÉVALUATION
                            </MyText>
                            <MyText variant="h1" style={{ color: missionStats.gradeColor, fontSize: 32 }}>
                                {missionStats.grade}
                            </MyText>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.statRow}>
                            <View style={styles.statLabel}>
                                <Ionicons name="scan-circle" size={20} color={THEME.colors.text.secondary} />
                                <MyText variant="bodySmall" colorType="secondary" style={{ letterSpacing: 1 }}>PRÉCISION</MyText>
                            </View>
                            <MyText variant="h3" >
                                {missionStats.accuracy}%
                            </MyText>
                        </View>

                        <View style={styles.statRow}>
                            <View style={styles.statLabel}>
                                <Ionicons name="timer" size={20} color={THEME.colors.text.secondary} />
                                <MyText variant="bodySmall" colorType="secondary" style={{ letterSpacing: 1 }}>
                                    TEMPS ÉCOULÉ
                                </MyText>
                            </View>
                            <MyText variant="h3" >
                                {functions.formatTime(missionStats.timeTaken)}
                            </MyText>
                        </View>

                        <View style={styles.statRow}>
                            <View style={styles.statLabel}>
                                <Ionicons name="warning" size={20} color={THEME.colors.text.secondary} />
                                <MyText variant="bodySmall" colorType="secondary" style={{ letterSpacing: 1 }}>
                                    ERREURS
                                </MyText>
                            </View>
                            <MyText variant="h3" style={{ color: missionStats.errors === 0 ? THEME.colors.success : THEME.colors.text.primary }}>
                                {missionStats.errors}
                            </MyText>
                        </View>

                        <MyButton
                            title="TERMINER"
                            iconRight="chevron-forward"
                            iconLeft={missionStats.accuracy > 90 ? 'checkmark-circle' : 'close-circle'}
                            variant={missionStats.accuracy > 90 ? 'outline' : 'danger'}
                            onPress={handleExit} // 💡 Correction ici
                            style={{ width: '100%', marginTop: 24 }}
                        />
                    </View>
                )}
            </BaseBottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.colors.background },
    gameViewWrapper: { flex: 1, paddingBottom: 20 },
    resultContainer: { width: '100%', paddingTop: 10 },
    gradeContainer: { alignItems: 'center', paddingVertical: 10 },
    iconWrapper: { width: 80, height: 80, borderRadius: THEME.metrics.radius.round, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
    statRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: THEME.metrics.radius.sm, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', marginBottom: 8 },
    statLabel: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 16 },
});