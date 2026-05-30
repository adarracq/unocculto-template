// src/screens/home/HomeScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CyberText } from '@/components/atoms/CyberText';
import MyButton from '@/components/atoms/MyButton';
import { BaseBottomSheet } from '@/components/molecules/BaseBottomSheet';
import WorldProgressMap from '@/components/organisms/WorldProgressMap';
import LearningSheetContent from './components/LearningSheetContent';
import RevisionSheetContent from './components/RevisionSheetContent'; // (Le composant du message précédent)

import { ALL_COUNTRIES } from '@/data/Countries';
import { useLearningStore } from '@/store/useLearningStore';
import { useUserStore } from '@/store/useUserStore';
import { THEME } from '@/theme/theme';

export default function HomeScreen() {
    const router = useRouter();

    const pseudo = useUserStore((state) => state.pseudo);
    const dayStreak = 12; // Mock temporaire

    const currentZoneId = useLearningStore((state) => state.currentLearningZone);
    const setCurrentLearningZone = useLearningStore((state) => state.setCurrentLearningZone);
    const remainingCount = useLearningStore((state) => state.getRemainingCount());
    const memoryMap = useLearningStore((state) => state.memoryMap);

    // Calculs GLOBAUX pour la carte et la modale de révision (Plus restreint à la zone !)
    const { urgentList, consolidatedList, masteredList } = useMemo(() => {
        const now = Date.now();
        const urgents: string[] = [];
        const consols: string[] = [];
        const masters: string[] = [];

        ALL_COUNTRIES.forEach(c => {
            const mem = memoryMap[c.code];
            if (!mem || mem.box === 0) return;
            if (mem.box === 5) {
                masters.push(c.code);
            } else if (mem.nextReviewDate <= now) {
                urgents.push(c.code);
            } else {
                consols.push(c.code);
            }
        });
        return { urgentList: urgents, consolidatedList: consols, masteredList: masters };
    }, [memoryMap]);

    const urgentCount = urgentList.length;

    const [activeSheet, setActiveSheet] = useState<'learning' | 'revision' | null>(null);

    const handleStartLearning = () => {
        const nextBatch = useLearningStore.getState().getNewCountriesBatch(4);
        if (nextBatch.length > 0) {
            setActiveSheet(null);
            router.push({ pathname: '/learn/discovery', params: { batch: nextBatch.join(',') } });
        }
    };

    return (
        <View style={styles.container}>
            {/* CARTE EN BACKGROUND */}
            <WorldProgressMap validCountries={ALL_COUNTRIES.map(c => c.code)} urgentCountries={urgentList} consolidatedCountries={consolidatedList} masteredCountries={masteredList} isBackground />

            <SafeAreaView style={styles.hudContainer} pointerEvents="box-none">

                {/* --- HEADER (Streak & Legend) --- */}
                <View style={styles.topHeader} pointerEvents="box-none">
                    <View style={styles.streakBadge}>
                        <Ionicons name="flame" size={16} color={THEME.colors.danger} style={{ marginRight: 6 }} />
                        <CyberText variant="h2" style={{ fontSize: 14, color: THEME.colors.danger }}>{dayStreak}</CyberText>
                    </View>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => setActiveSheet('revision')} style={styles.legendBadge}>
                        <View style={styles.legendItem}>
                            <Ionicons name="warning" size={16} color={THEME.colors.danger} />
                            <CyberText variant="caps" style={[styles.legendText, { color: THEME.colors.danger }]}>{urgentCount}</CyberText>
                        </View>
                        <View style={styles.legendItem}>
                            <Ionicons name="sync" size={16} color={THEME.colors.secondary} />
                            <CyberText variant="caps" style={[styles.legendText, { color: THEME.colors.secondary }]}>{consolidatedList.length}</CyberText>
                        </View>
                        <View style={styles.legendItem}>
                            <Ionicons name="shield-checkmark" size={16} color={THEME.colors.success} />
                            <CyberText variant="caps" style={[styles.legendText, { color: THEME.colors.success }]}>{masteredList.length}</CyberText>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Espace libre pour scroller la carte */}
                <View style={{ flex: 1 }} pointerEvents="none" />

                {/* --- ACTIONS MINIMALISTES (En bas) --- */}
                <View style={styles.bottomActions} pointerEvents="box-none">
                    <MyButton
                        title="APPRENTISSAGE"
                        subtitle={`Zone actuelle : ${currentZoneId}`}
                        iconLeft="book"
                        iconRight="arrow-forward"
                        onPress={() => setActiveSheet('learning')}
                        style={{ marginBottom: 12 }}
                    />

                    {/* Le bouton révision n'apparaît que s'il y a des urgences */}
                    {urgentCount > 0 && (
                        <MyButton
                            title="RÉVISIONS"
                            subtitle={`${urgentCount} données critiques`}
                            variant="danger"
                            iconRight="arrow-forward"
                            iconLeft="shield-checkmark"
                            onPress={() => setActiveSheet('revision')}
                        />
                    )}
                </View>

            </SafeAreaView>

            {/* MODALES */}
            <BaseBottomSheet isVisible={activeSheet === 'learning'} onClose={() => setActiveSheet(null)} title="PROGRAMME D'APPRENTISSAGE">
                <LearningSheetContent currentZoneId={currentZoneId} onSelectZone={setCurrentLearningZone} remainingCount={remainingCount} memoryMap={memoryMap} onStartLearning={handleStartLearning} />
            </BaseBottomSheet>

            <BaseBottomSheet isVisible={activeSheet === 'revision'} onClose={() => setActiveSheet(null)} title="MÉMOIRE GLOBALE">
                <RevisionSheetContent urgentCount={urgentCount} consolidationCount={consolidatedList.length} masteredCount={masteredList.length} onStartRevision={() => { setActiveSheet(null); router.push('/learn/revision'); }} />
            </BaseBottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.colors.background },
    hudContainer: { flex: 1, justifyContent: 'space-between' },

    topHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10 },
    streakBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(5, 5, 7, 0.7)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
    legendBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(5, 5, 7, 0.7)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, gap: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
    legendItem: { flexDirection: 'row', alignItems: 'center' },
    legendText: { color: THEME.colors.text.primary, fontSize: 12, marginLeft: 4 },

    bottomActions: { paddingHorizontal: 20, paddingBottom: 40 },
});