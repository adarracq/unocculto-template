import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MyButton from '@/components/atoms/MyButton';
import { BaseBottomSheet } from '@/components/molecules/BaseBottomSheet';
import WorldProgressMap from '@/components/organisms/WorldProgressMap';
import LearningSheetContent from './components/LearningSheetContent';
import RevisionSheetContent from './components/RevisionSheetContent';

import PlayerStatsBadge from '@/components/molecules/PlayerStatsBadge';
import OutOfTicketsModal from '@/components/organisms/OutOfTicketsModal';
import { GameMode } from '@/constants/GameConfig'; // 💡 Import du type GameMode
import { ALL_COUNTRIES } from '@/data/Countries';
import { useLearningStore } from '@/store/useLearningStore';
import { useUserStore } from '@/store/useUserStore';
import { THEME } from '@/theme/theme';
import CountryDetailModal from '../profile/components/CountryDetailModal';
import MapLegend from './components/MapLegend';

export default function HomeScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);
    const [activeSheet, setActiveSheet] = useState<'learning' | 'revision' | null>(null);

    const consumeTicket = useUserStore(state => state.consumeTicket);
    const [showTicketModal, setShowTicketModal] = useState(false);

    // 💡 Mise à jour : on gère deux types d'actions en attente (learning ou training)
    const [pendingAction, setPendingAction] = useState<'learning' | 'training' | null>(null);
    const [pendingTrainingParams, setPendingTrainingParams] = useState<{ mode: GameMode, level: number } | null>(null);

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
    const totalKnownCount = urgentList.length + consolidatedList.length + masteredList.length;

    // --- LOGIQUE DES ACTIONS ---

    const handleStartLearning = () => {
        if (!consumeTicket()) {
            setPendingAction('learning');
            setShowTicketModal(true);
            return;
        }

        const nextBatch = useLearningStore.getState().getNewCountriesBatch(4);
        if (nextBatch.length > 0) {
            setActiveSheet(null);
            router.push({ pathname: '/learn/discovery', params: { batch: nextBatch.join(',') } });
        }
    };

    const handleStartRevision = () => {
        // La révision Leitner reste 100% gratuite (pas de consumeTicket)
        setActiveSheet(null);
        router.push('/learn/revision');
    };

    // 💡 Nouvelle logique pour l'entraînement libre avec ticket
    const handleStartTraining = (mode: GameMode, level: number) => {
        if (!consumeTicket()) {
            setPendingAction('training');
            setPendingTrainingParams({ mode, level });
            setShowTicketModal(true);
            return;
        }

        executeStartTraining(mode, level);
    };

    const executeStartTraining = (mode: GameMode, level: number) => {
        setActiveSheet(null);
        const knownCountryCodes = [...urgentList, ...consolidatedList, ...masteredList];
        const batch = knownCountryCodes.join(',');

        router.push({
            pathname: '/arena/game',
            params: {
                mode,
                level,
                batch
            }
        });
    };

    const handleTicketSuccess = () => {
        setShowTicketModal(false);

        // On reprend l'action qui était en attente
        if (pendingAction === 'learning') {
            handleStartLearning();
        } else if (pendingAction === 'training' && pendingTrainingParams) {
            handleStartTraining(pendingTrainingParams.mode, pendingTrainingParams.level);
        }

        setPendingAction(null);
        setPendingTrainingParams(null);
    };

    return (
        <View style={styles.container}>
            <WorldProgressMap
                urgentCountries={urgentList}
                consolidatedCountries={consolidatedList}
                masteredCountries={masteredList}
                onCountryPress={setSelectedCountryCode}
                isBackground
            />

            <View style={StyleSheet.absoluteFill} pointerEvents="box-none">

                <View style={[styles.topHeader, { top: THEME.paddings.top + useSafeAreaInsets().top }]} pointerEvents="box-none">
                    <PlayerStatsBadge />
                </View>

                <View style={styles.bottomActions} pointerEvents="box-none">
                    <MapLegend
                        mastered={masteredList.length}
                        inProgress={consolidatedList.length}
                        urgent={urgentCount}
                        left={leftCount}
                    />
                    <MyButton
                        title="APPRENTISSAGE"
                        subtitle={`Zone actuelle : ${currentZoneId}`}
                        iconLeft="ticket"
                        iconRight="chevron-forward"
                        onPress={() => setActiveSheet('learning')}
                        variant='outline'
                    />

                    <MyButton
                        title="RÉVISION"
                        subtitle={urgentCount > 0 ? `${urgentCount} données critiques` : `${totalKnownCount} pays acquis`}
                        variant={urgentCount > 0 ? "danger" : "default"}
                        iconRight="chevron-forward"
                        iconLeft="warning"
                        onPress={() => setActiveSheet('revision')}
                        disabled={totalKnownCount === 0 && urgentCount === 0}
                    />

                </View>
            </View>

            <BaseBottomSheet isVisible={activeSheet === 'learning'} onClose={() => setActiveSheet(null)} title="PROGRAMME D'APPRENTISSAGE">
                <LearningSheetContent
                    currentZoneId={currentZoneId}
                    onSelectZone={setCurrentLearningZone}
                    remainingCount={remainingCount}
                    memoryMap={memoryMap}
                    onStartLearning={handleStartLearning}
                />
            </BaseBottomSheet>

            <BaseBottomSheet isVisible={activeSheet === 'revision'} onClose={() => setActiveSheet(null)} title="MÉMOIRE GLOBALE">
                <RevisionSheetContent
                    urgentCount={urgentCount}
                    consolidationCount={consolidatedList.length}
                    masteredCount={masteredList.length}
                    onStartRevision={handleStartRevision}
                    onStartTraining={handleStartTraining}
                />
            </BaseBottomSheet>

            <CountryDetailModal
                countryCode={selectedCountryCode}
                visible={!!selectedCountryCode}
                onClose={() => setSelectedCountryCode(null)}
            />

            <OutOfTicketsModal
                visible={showTicketModal}
                onClose={() => {
                    setShowTicketModal(false);
                    setPendingAction(null);
                    setPendingTrainingParams(null);
                }}
                onSuccess={handleTicketSuccess}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background
    },
    topHeader: {
        position: 'absolute',
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    bottomActions: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        gap: 16,
    },
});