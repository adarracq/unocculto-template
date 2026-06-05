import MyButton from '@/components/atoms/MyButton';
import { MyText } from '@/components/atoms/MyText';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { BaseBottomSheet } from '@/components/molecules/BaseBottomSheet';
import { ALL_COUNTRIES } from '@/data/Countries';
import { RevisionStats, useRevisionGame } from '@/hooks/useRevisionGame';
import { useLearningStore } from '@/store/useLearningStore';
import { THEME } from '@/theme/theme';
import { functions } from '@/utils/Functions';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native'; // 💡 Import de Keyboard
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GameLevel1View from '@/screens/geogames/components/GameLevel1View';
import GameLevel2View from '@/screens/geogames/components/GameLevel2View';
import GameLevel3View from '@/screens/geogames/components/GameLevel3View';

export default function RevisionSessionScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [isFinished, setIsFinished] = useState(false);
    const [sessionStats, setSessionStats] = useState<RevisionStats | null>(null);

    const [urgentCountries] = useState(() => {
        const now = Date.now();
        const currentMemoryMap = useLearningStore.getState().memoryMap;
        return ALL_COUNTRIES.filter(c => {
            const data = currentMemoryMap[c.code];
            return data && data.box > 0 && data.box < 5 && data.nextReviewDate <= now;
        });
    });

    const handleFinish = (stats: RevisionStats) => {
        setSessionStats(stats);
        setIsFinished(true);
    };

    const handleExit = () => {
        if (router.canGoBack()) {
            console.log("Exiting revision session, going back to previous screen.");
            router.back(); // Détruit l'écran et revient à l'accueil
        } else {
            console.warn("No previous screen to go back to, replacing with home screen.");
            router.replace('/'); // Sécurité anti-crash
        }
    };

    const {
        currentTask, queueLength, totalTasks, status, mapFeedback, validateAnswer, nextTask
    } = useRevisionGame(urgentCountries, ALL_COUNTRIES, handleFinish);

    // 💡 GESTION INTELLIGENTE DU FLUX ET DU CLAVIER
    useEffect(() => {
        if (status === 'success') {
            const timer = setTimeout(() => {
                nextTask();
            }, 1000);
            return () => clearTimeout(timer);
        } else if (status === 'error') {
            // 💡 On ferme le clavier pour dévoiler le bouton flottant et la correction
            Keyboard.dismiss();
        }
    }, [status]);

    if (isFinished || urgentCountries.length === 0) {
        return (
            <View style={styles.container}>
                <BaseBottomSheet
                    isVisible={true}
                    onClose={handleExit}
                    title="RAPPORT DE RÉVISION"
                >
                    <View style={styles.finishedContent}>
                        <View style={styles.iconWrapper}>
                            <Ionicons name="checkmark" size={50} color={THEME.colors.success} />
                        </View>

                        <MyText variant="h1" align="center" style={{ color: THEME.colors.text.primary, marginBottom: 8 }}>
                            MÉMOIRE CONSOLIDÉE
                        </MyText>

                        <MyText variant="body" colorType="secondary" align="center" style={{ marginBottom: 24 }}>
                            Vos connexions neuronales ont été renforcées.
                        </MyText>

                        {sessionStats && (
                            <View style={styles.statsContainer}>
                                <View style={styles.statRow}>
                                    <View style={styles.statLabel}>
                                        <Ionicons name="scan-circle" size={20} color={THEME.colors.text.secondary} />
                                        <MyText variant="bodySmall" colorType="secondary" style={{ letterSpacing: 1 }}>PRÉCISION</MyText>
                                    </View>
                                    <MyText variant="h3">{sessionStats.accuracy}%</MyText>
                                </View>
                                <View style={styles.statRow}>
                                    <View style={styles.statLabel}>
                                        <Ionicons name="timer" size={20} color={THEME.colors.text.secondary} />
                                        <MyText variant="bodySmall" colorType="secondary" style={{ letterSpacing: 1 }}>TEMPS ÉCOULÉ</MyText>
                                    </View>
                                    <MyText variant="h3">{functions.formatTime(sessionStats.timeTaken)}</MyText>
                                </View>
                                <View style={styles.statRow}>
                                    <View style={styles.statLabel}>
                                        <Ionicons name="warning" size={20} color={THEME.colors.text.secondary} />
                                        <MyText variant="bodySmall" colorType="secondary" style={{ letterSpacing: 1 }}>ERREURS</MyText>
                                    </View>
                                    <MyText variant="h3" style={{ color: sessionStats.errors === 0 ? THEME.colors.success : THEME.colors.text.primary }}>
                                        {sessionStats.errors}
                                    </MyText>
                                </View>
                            </View>
                        )}

                        <MyButton
                            title="TERMINER"
                            onPress={handleExit}
                            variant="outline"
                            iconLeft="home"
                            iconRight="chevron-forward"
                            style={{ width: '100%', marginTop: 12 }}
                        />
                    </View>
                </BaseBottomSheet>
            </View>
        );
    }

    if (!currentTask) return null;

    const progress = (totalTasks - queueLength) / totalTasks;

    const engineAdapter = {
        currentQuestion: { target: currentTask.target, options: currentTask.options },
        validateAnswer,
        mapFeedback,
        status,
        currentIndex: totalTasks - queueLength,
        total: totalTasks,
        errors: 0,
        elapsedTime: 0,
    } as any;

    const renderGameView = () => {
        const props = {
            engine: engineAdapter,
            mode: currentTask.mode,
            regionCode: currentTask.target.continentId || 'WLD',
            hasFloatingButton: true
        };

        switch (currentTask.level) {
            case 1: return <GameLevel1View {...props} />;
            case 2: return <GameLevel2View {...props} />;
            case 3: return <GameLevel3View {...props} />;
            default: return <GameLevel1View {...props} />;
        }
    };

    const getPhaseName = (level: number) => {
        if (level === 1) return "RECONNAISSANCE";
        if (level === 2) return "LOCALISATION";
        return "RAPPEL ACTIF";
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) + 10 }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                    <Ionicons name="close" size={28} color={THEME.colors.text.secondary} />
                </TouchableOpacity>

                <View style={styles.progressContainer}>
                    <View style={styles.progressHeader}>
                        <MyText variant="caps" colorType="secondary" style={{ fontSize: 11, letterSpacing: 1 }}>
                            {getPhaseName(currentTask.level)}
                        </MyText>
                        <MyText variant="caps" style={{ color: THEME.colors.primary, fontSize: 11 }}>
                            {queueLength} TÂCHE{queueLength > 1 ? 'S' : ''}
                        </MyText>
                    </View>
                    <ProgressBar progress={progress} color={THEME.colors.primary} />
                </View>

                <View style={{ width: 40 }} />
            </View>

            {/* 💡 Plus de paddingBottom dynamique ! La carte prend toute la place */}
            <View style={styles.gameWrapper}>
                {renderGameView()}
            </View>

            {/* 💡 BOUTON FLOTTANT D'ERREUR */}
            {status === 'error' && (
                <View style={styles.floatingErrorBtn}>
                    <MyButton
                        title="J'AI COMPRIS"
                        onPress={nextTask}
                        variant="danger"
                        iconRight="arrow-forward"
                        iconLeft='close'
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.colors.background },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: THEME.metrics.spacing.md, paddingBottom: THEME.metrics.spacing.md, zIndex: 10 },
    closeBtn: { width: 40, height: 40, justifyContent: 'center' },
    progressContainer: { flex: 1, },
    progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    gameWrapper: { flex: 1 },

    // 💡 Nouveau style 100% flottant pour le bouton
    floatingErrorBtn: {
        position: 'absolute',
        bottom: 40,
        left: THEME.paddings.horizontal,
        right: THEME.paddings.horizontal,
        zIndex: 50,
        // Ajout d'une ombre douce pour bien le détacher de la carte
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
    },

    finishedContent: { width: '100%', alignItems: 'center', paddingTop: 10 },
    iconWrapper: { width: 80, height: 80, borderRadius: THEME.metrics.radius.round, backgroundColor: THEME.colors.success + '15', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: THEME.colors.success + '40' },
    statsContainer: { width: '100%', marginVertical: 20 },
    statRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: THEME.metrics.radius.sm, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', marginBottom: 8 },
    statLabel: { flexDirection: 'row', alignItems: 'center', gap: 10 },
});