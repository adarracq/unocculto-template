import { CyberText } from '@/components/atoms/CyberText';
import MyButton from '@/components/atoms/MyButton';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { ALL_COUNTRIES } from '@/data/Countries';
import { useRevisionGame } from '@/hooks/useRevisionGame';
import { useLearningStore } from '@/store/useLearningStore';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import GameLevel1View from '@/screens/geogames/components/GameLevel1View';
import GameLevel2View from '@/screens/geogames/components/GameLevel2View';
import GameLevel3View from '@/screens/geogames/components/GameLevel3View';

export default function RevisionSessionScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [isFinished, setIsFinished] = useState(false);


    const [urgentCountries] = useState(() => {
        const now = Date.now();
        // On lit le store directement sans s'abonner aux changements (getState)
        const currentMemoryMap = useLearningStore.getState().memoryMap;

        return ALL_COUNTRIES.filter(c => {
            const data = currentMemoryMap[c.code];
            return data && data.box > 0 && data.box < 5 && data.nextReviewDate <= now;
        });
    });

    const {
        currentTask,
        queueLength,
        totalTasks,
        status,
        mapFeedback,
        validateAnswer,
        nextTask // 💡 Import de l'action manuelle
    } = useRevisionGame(urgentCountries, ALL_COUNTRIES, () => setIsFinished(true));

    if (isFinished || urgentCountries.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.finishedContent}>
                    <View style={styles.iconWrapper}>
                        <Ionicons name="checkmark-done" size={64} color={THEME.colors.success} />
                    </View>
                    <CyberText variant="h1" align="center" style={{ color: THEME.colors.text.primary, marginBottom: 12 }}>
                        RÉVISION TERMINÉE
                    </CyberText>
                    <CyberText variant="body" colorType="secondary" align="center" style={{ paddingHorizontal: 20, marginBottom: 40, lineHeight: 24 }}>
                        Vous avez consolidé toutes vos connaissances en attente. Votre mémoire est à jour.
                    </CyberText>

                    <MyButton
                        title="TERMINER"
                        onPress={() => router.push('/')}
                        variant="gradient"
                        style={{ width: '100%', maxWidth: 300 }}
                    />
                </View>
            </SafeAreaView>
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
        const uniqueKey = `${currentTask.target.code}-${currentTask.mode}-${currentTask.level}`;

        const props = {
            //key: uniqueKey,
            engine: engineAdapter,
            mode: currentTask.mode,
            regionCode: currentTask.target.continentId || 'WLD'
        };

        switch (currentTask.level) {
            case 1: return <GameLevel1View {...props} />;
            case 2: return <GameLevel2View {...props} />;
            case 3: return <GameLevel3View {...props} />;
            default: return <GameLevel1View {...props} />;
        }
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) + 10 }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                    <Ionicons name="close" size={28} color={THEME.colors.text.secondary} />
                </TouchableOpacity>

                <View style={styles.progressContainer}>
                    <View style={styles.progressHeader}>
                        <CyberText variant="caps" colorType="secondary" style={{ fontSize: 11, letterSpacing: 1 }}>
                            RÉVISION
                        </CyberText>
                        <CyberText variant="caps" style={{ color: THEME.colors.primary, fontSize: 11 }}>
                            {queueLength} RESTANT{queueLength > 1 ? 'S' : ''}
                        </CyberText>
                    </View>
                    <ProgressBar progress={progress} color={THEME.colors.primary} />
                </View>

                <View style={{ width: 40 }} />
            </View>

            <View style={[styles.gameWrapper, { paddingBottom: 120 }]}>
                {renderGameView()}
            </View>

            {/* 💡 BANDEAU D'ACTION MANUELLE (Fixé en bas) */}

            <View style={styles.continuePanel}>

                <MyButton
                    title="CONTINUER"
                    onPress={nextTask}
                    variant={status === 'success' ? 'outline' : 'danger'}
                    iconRight="arrow-forward"
                    disabled={status === 'playing'}
                />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: THEME.metrics.spacing.md,
        paddingBottom: THEME.metrics.spacing.md,
        zIndex: 10
    },
    closeBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center'
    },
    progressContainer: {
        flex: 1,
        paddingHorizontal: THEME.metrics.spacing.md
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
    },
    gameWrapper: {
        flex: 1
    },

    // 💡 Nouveau style pour le bandeau "Continuer"
    continuePanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: THEME.metrics.spacing.lg,
        paddingTop: 20,
        paddingBottom: 40,
        backgroundColor: 'rgba(5, 5, 7, 0.95)', // Rendu Glassmorphism foncé
        borderTopWidth: 1,
        borderColor: THEME.colors.glass.border,
        zIndex: 20,
    },

    finishedContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: THEME.metrics.spacing.xl
    },
    iconWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: THEME.colors.success + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: THEME.colors.success + '40',
    }
});