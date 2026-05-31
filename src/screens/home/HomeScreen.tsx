// src/screens/home/HomeScreen.tsx
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CyberText } from '@/components/atoms/CyberText';
import MyButton from '@/components/atoms/MyButton';
import { BaseBottomSheet } from '@/components/molecules/BaseBottomSheet';
import WorldProgressMap from '@/components/organisms/WorldProgressMap';
import LearningSheetContent from './components/LearningSheetContent';
import RevisionSheetContent from './components/RevisionSheetContent';

import StreakBadge from '@/components/molecules/StreakBadge';
import { ALL_COUNTRIES } from '@/data/Countries';
import { useLearningStore } from '@/store/useLearningStore';
import { useStreakStore } from '@/store/useStreakStore';
import { THEME } from '@/theme/theme';
import { AlertTriangle, CircleQuestionMark, RefreshCw, ShieldCheck } from 'lucide-react-native';

export default function HomeScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets(); // 💡 On récupère les bordures de l'écran (encoche, etc.)

    const streakCount = useStreakStore(state => state.streakCount);

    const currentZoneId = useLearningStore((state) => state.currentLearningZone);
    const setCurrentLearningZone = useLearningStore((state) => state.setCurrentLearningZone);
    const remainingCount = useLearningStore((state) => state.getRemainingCount());
    const memoryMap = useLearningStore((state) => state.memoryMap);

    const { urgentList, consolidatedList, masteredList, leftCount } = useMemo(() => {
        const now = Date.now();
        const urgents: string[] = [];
        const consols: string[] = [];
        const masters: string[] = [];
        let left = ALL_COUNTRIES.length;

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
        left = left - urgents.length - consols.length - masters.length;
        return { urgentList: urgents, consolidatedList: consols, masteredList: masters, leftCount: left };
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
            <WorldProgressMap
                urgentCountries={urgentList}
                consolidatedCountries={consolidatedList}
                masteredCountries={masteredList}
                isBackground
            />

            {/* HUD (Heads Up Display) - Couche transparente par-dessus la carte */}
            <View style={StyleSheet.absoluteFill} pointerEvents="box-none">

                {/* --- HEADER (Positionné tout en haut) --- */}
                <View style={[styles.topHeader, { top: insets.top + 10 }]} pointerEvents="box-none">
                    <StreakBadge count={streakCount} />

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setActiveSheet('revision')}
                        style={styles.legendBadge}
                    >
                        <View style={[styles.iconGroup, { backgroundColor: THEME.colors.danger + '15' }]}>
                            <AlertTriangle size={16} color={THEME.colors.danger} />
                            <CyberText variant="caps" style={[styles.legendText, { color: THEME.colors.danger }]}>{urgentCount}</CyberText>
                        </View>

                        <View style={[styles.iconGroup, { backgroundColor: THEME.colors.inProgress + '15' }]}>
                            <RefreshCw size={16} color={THEME.colors.inProgress} />
                            <CyberText variant="caps" style={[styles.legendText, { color: THEME.colors.inProgress }]}>{consolidatedList.length}</CyberText>
                        </View>

                        <View style={[styles.iconGroup, { backgroundColor: THEME.colors.success + '15' }]}>
                            <ShieldCheck size={16} color={THEME.colors.success} />
                            <CyberText variant="caps" style={[styles.legendText, { color: THEME.colors.success }]}>{masteredList.length}</CyberText>
                        </View>

                        <View style={[styles.iconGroup, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                            <CircleQuestionMark size={16} color={THEME.colors.text.disabled} />
                            <CyberText variant="caps" style={[styles.legendText, { color: THEME.colors.text.disabled }]}>{leftCount}</CyberText>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* --- ACTIONS MINIMALISTES (Positionnées tout en bas) --- */}
                <View style={styles.bottomActions} pointerEvents="box-none">
                    <MyButton
                        title="APPRENTISSAGE"
                        subtitle={`Zone actuelle : ${currentZoneId}`}
                        iconLeft="compass"
                        iconRight="chevron-forward"
                        onPress={() => setActiveSheet('learning')}
                    />

                    {urgentCount > 0 && (
                        <MyButton
                            title="RÉVISIONS"
                            subtitle={`${urgentCount} données critiques`}
                            variant="danger"
                            iconRight="chevron-forward"
                            iconLeft="warning"
                            onPress={() => setActiveSheet('revision')}
                        />
                    )}
                </View>
            </View>

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
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background
    },

    // HEADER
    topHeader: {
        position: 'absolute', // 💡 Sort du flux Flex, flotte en haut
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    legendBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6, // Espace propre entre les groupes d'icônes
        backgroundColor: 'rgba(15, 15, 17, 0.95)',
        padding: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    iconGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 14, // Capsules bien arrondies à l'intérieur
    },
    legendText: {
        fontSize: 13,
        marginTop: -1,
    },

    // BOTTOM ACTIONS
    bottomActions: {
        position: 'absolute', // 💡 Flotte en bas, ne sera plus jamais écrasé !
        bottom: 100,
        left: 20,
        right: 20,
        gap: 16,
    },
});