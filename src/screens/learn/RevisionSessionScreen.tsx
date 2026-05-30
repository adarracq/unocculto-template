// src/screens/learn/RevisionSessionScreen.tsx
import { CyberText } from '@/components/atoms/CyberText';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { ALL_COUNTRIES } from '@/data/Countries';
import { useRevisionGame } from '@/hooks/useRevisionGame';
import { useLearningStore } from '@/store/useLearningStore';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import de vos Vues d'Arène (Réutilisation)
import GameLevel1View from '@/screens/geogames/components/GameLevel1View';
import GameLevel2View from '@/screens/geogames/components/GameLevel2View';
import GameLevel3View from '@/screens/geogames/components/GameLevel3View';

export default function RevisionSessionScreen() {
    const router = useRouter();
    const [isFinished, setIsFinished] = useState(false);

    // 1. Récupération des pays URGENTS depuis le store
    const currentZone = useLearningStore(state => state.currentLearningZone);
    const memoryMap = useLearningStore(state => state.memoryMap);

    const urgentCountries = useMemo(() => {
        const now = Date.now();
        // 💡 On ne filtre plus par "c.continent === currentZone"
        return ALL_COUNTRIES.filter(c => {
            const data = memoryMap[c.code];
            return data && data.box > 0 && data.box < 5 && data.nextReviewDate <= now;
        });
    }, [memoryMap]);

    // 2. Lancement du Moteur de Jeu
    const {
        currentTask,
        queueLength,
        totalTasks,
        status,
        mapFeedback,
        validateAnswer
    } = useRevisionGame(urgentCountries, ALL_COUNTRIES, () => setIsFinished(true));

    // 3. ÉCRAN DE FIN
    if (isFinished || urgentCountries.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.finishedContent}>
                    <Ionicons name="shield-checkmark" size={80} color={THEME.colors.success} style={{ marginBottom: 20 }} />
                    <CyberText variant="h1" align="center" style={{ color: THEME.colors.success }}>
                        RÉSEAU SÉCURISÉ
                    </CyberText>
                    <CyberText variant="body" colorType="secondary" align="center" style={{ paddingHorizontal: 40, marginTop: 10, marginBottom: 40 }}>
                        Toutes vos mémoires urgentes ont été consolidées et repoussées dans le temps.
                    </CyberText>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => router.push('/')} style={styles.primaryButton}>
                        <CyberText variant="caps" style={{ color: THEME.colors.background }}>RETOUR AU CENTRE D'OPÉRATIONS</CyberText>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    if (!currentTask) return null;

    const progress = (totalTasks - queueLength) / totalTasks;

    // 4. Adaptateur pour vos Vues
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
            {/* HEADER DE RÉVISION */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                    <Ionicons name="close" size={24} color={THEME.colors.text.secondary} />
                </TouchableOpacity>
                <View style={styles.progressContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <CyberText variant="caps" colorType="secondary" style={{ fontSize: 10, letterSpacing: 1 }}>
                            CONSOLIDATION NEURALE
                        </CyberText>
                        <CyberText variant="caps" style={{ color: THEME.colors.danger, fontSize: 10 }}>
                            {queueLength} EN ATTENTE
                        </CyberText>
                    </View>
                    <ProgressBar progress={progress} color={THEME.colors.danger} />
                </View>
                <View style={{ width: 40 }} />
            </View>

            {/* VUE DU JEU */}
            <View style={styles.gameWrapper}>
                {renderGameView()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.colors.background },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: THEME.metrics.spacing.lg, paddingTop: 60, paddingBottom: THEME.metrics.spacing.md, borderBottomWidth: 1, borderBottomColor: THEME.colors.glass.border, backgroundColor: 'rgba(5,5,7,0.9)', zIndex: 10 },
    closeBtn: { width: 40, height: 40, justifyContent: 'center' },
    progressContainer: { flex: 1, paddingHorizontal: THEME.metrics.spacing.md },
    gameWrapper: { flex: 1 },
    finishedContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: THEME.metrics.spacing.xl },
    primaryButton: { backgroundColor: THEME.colors.primary, paddingHorizontal: 24, paddingVertical: 18, borderRadius: THEME.metrics.radius.md }
});