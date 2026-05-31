import { CyberText } from '@/components/atoms/CyberText';
import { GAME_CONFIG, GameMode, LevelConfig } from '@/constants/GameConfig'; // Vérifiez le chemin
import { THEME } from '@/theme/theme';
import { functions } from '@/utils/Functions';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// --- IMPORT DES STORES ---
import { useArenaStore } from '@/store/useArenaStore';
import { useUserStore } from '@/store/useUserStore';

// Components
import TicketBadge from '@/components/molecules/TicketBadge';
import OutOfTicketsModal from '@/components/organisms/OutOfTicketsModal'; // 💡 Nouvelle Modal
import LeaderboardCard, { LeaderboardEntry } from './components/LeaderboardCard';
import LevelCard from './components/LevelCard';

const CONTINENTS = ['EUR', 'ASI', 'AFR', 'AME', 'OCE'];

export default function RegionLevelsScreen() {
    const router = useRouter();
    const tickets = useUserStore(state => state.tickets);
    const { regionId, mode } = useLocalSearchParams<{ regionId: string; mode: GameMode }>();

    const regionCode = regionId || 'EUR';
    const currentMode = mode || 'country';
    const modeConfig = GAME_CONFIG[currentMode];

    // --- LECTURE DES STORES ---
    const user = useUserStore();
    const { consumeTicket } = useUserStore(); // 💡 Pour la gestion des billets
    const { progression, records } = useArenaStore();

    // --- ÉTATS ---
    const [selectedLevel, setSelectedLevel] = useState<LevelConfig | null>(null);
    const [leaderboardLevel, setLeaderboardLevel] = useState<number>(1);

    // 💡 État pour la modale Premium / Pub
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    // 💡 État pour mémoriser le niveau cliqué si le joueur doit d'abord passer par la modale
    const [pendingLevelId, setPendingLevelId] = useState<number | null>(null);

    // Extraction de la progression de la zone actuelle
    const regionProgress = progression[regionCode]?.[currentMode]?.levels || {};

    // --- LEADERBOARD DYNAMIQUE ---
    const leaderboardData: LeaderboardEntry[] = records
        .filter(r => r.regionId === regionCode && r.modeId === currentMode && r.levelId === leaderboardLevel)
        .sort((a, b) => b.accuracy - a.accuracy || a.timeTaken - b.timeTaken)
        .slice(0, 5)
        .map((r, index) => ({
            rank: index + 1,
            time: functions.formatTime(r.timeTaken),
            accuracy: r.accuracy,
            date: functions.stringDateToString(r.date),
        }));

    // --- LOGIQUE MÉTIER EXACTE ---
    const isLevelLocked = (levelId: number) => {
        if (regionCode === 'WLD') {
            if (levelId > 1) {
                const prevLevel = regionProgress[levelId - 1];
                if (!prevLevel?.completed) return true;
            }
            const allContinentsCompleted = CONTINENTS.every(cont => {
                return progression[cont]?.[currentMode]?.levels?.[levelId]?.completed;
            });
            return !allContinentsCompleted;
        }

        if (levelId === 1) return false;
        const prevLevel = regionProgress[levelId - 1];
        return !prevLevel?.completed;
    };

    const getMedalColor = (levelId: number) => {
        switch (levelId) {
            case 1: return THEME.colors.levels.bronze;
            case 2: return THEME.colors.levels.silver;
            case 3: return THEME.colors.levels.gold;
            case 4: return THEME.colors.text.disabled;
            default: return THEME.colors.text.primary;
        }
    };


    const handleAttemptStartGame = (levelId: number) => {
        // 1. Tente de consommer un ticket (renvoie true si ticket dispo ou si Premium)
        const canPlay = consumeTicket();

        if (canPlay) {
            // 2A. On a le droit de jouer !
            console.log(`[Arène] Lancement: ${regionCode} - Mode: ${currentMode} - Niveau: ${levelId}`);
            router.push({
                pathname: '/arena/game',
                params: { regionId: regionCode, mode: currentMode, level: levelId }
            });
        } else {
            // 2B. Plus de billets. On intercepte.
            setPendingLevelId(levelId); // On mémorise à quel niveau il voulait jouer
            setShowPremiumModal(true);
        }
    };

    return (
        <LinearGradient colors={[THEME.colors.backgroundLight, THEME.colors.background]} style={styles.container}>

            <TouchableOpacity onPress={() => router.back()} style={styles.backArrow}>
                <Ionicons name="arrow-back" size={24} color={THEME.colors.text.primary} />
            </TouchableOpacity>

            <View style={{ paddingHorizontal: 20 }} >

                <View style={styles.header}>
                    <CyberText variant="h1" style={{ color: THEME.colors.text.primary }}>
                        {modeConfig.label}
                    </CyberText>
                    <CyberText variant="caps" style={{ color: THEME.colors.text.secondary, letterSpacing: 2, marginBottom: 10 }}>
                        SECTEUR {regionCode}
                    </CyberText>
                    <TicketBadge count={tickets} />
                </View>

                <View>
                    {modeConfig.levels.map((level) => {
                        const isLocked = isLevelLocked(level.id);
                        const data = regionProgress[level.id];

                        return (
                            <LevelCard
                                key={level.id}
                                level={level.id}
                                title={level.title}
                                subTitle={level.subTitle}
                                color={level.color || modeConfig.color}
                                isLocked={isLocked}
                                bestTime={data?.completed ? functions.formatTime(data.bestTime) : undefined}
                                bestAccuracy={data?.completed ? data.bestAccuracy : undefined}
                                onPress={() => handleAttemptStartGame(level.id)}
                            />
                        );
                    })}
                </View>

                <View style={{ marginTop: 20 }}>
                    <LeaderboardCard
                        title="RECORDS LOCAUX"
                        data={leaderboardData}
                        limit={10}
                        headerRightComponent={
                            <View style={styles.tabsContainer}>
                                {[1, 2, 3].map((lvl) => (
                                    <TouchableOpacity
                                        key={lvl}
                                        onPress={() => setLeaderboardLevel(lvl)}
                                        style={[styles.tab, leaderboardLevel === lvl && { borderColor: getMedalColor(lvl), backgroundColor: getMedalColor(lvl) + '20' }]}
                                    >
                                        <CyberText variant="caps" style={{ fontSize: 10, color: leaderboardLevel === lvl ? getMedalColor(lvl) : THEME.colors.text.disabled }}>
                                            {lvl === 1 ? 'I' : lvl === 2 ? 'II' : 'III'}
                                        </CyberText>
                                    </TouchableOpacity>
                                ))}
                                {modeConfig.id === 'country' && (
                                    <TouchableOpacity
                                        onPress={() => setLeaderboardLevel(4)}
                                        style={[styles.tab, leaderboardLevel === 4 && { borderColor: getMedalColor(4), backgroundColor: getMedalColor(4) + '20' }]}
                                    >
                                        <CyberText variant="caps" style={{ fontSize: 10, color: leaderboardLevel === 4 ? getMedalColor(4) : THEME.colors.text.disabled }}>
                                            IV
                                        </CyberText>
                                    </TouchableOpacity>
                                )}
                            </View>
                        }
                    />
                </View>
            </View>

            {/* 💡 LA NOUVELLE MODALE D'INTERCEPTION */}
            <OutOfTicketsModal
                visible={showPremiumModal}
                onClose={() => setShowPremiumModal(false)}
                onSuccess={() => {
                    setShowPremiumModal(false);
                    // Si l'utilisateur vient de gagner un billet ou de payer Premium, on relance !
                    if (pendingLevelId) {
                        handleAttemptStartGame(pendingLevelId);
                        setPendingLevelId(null);
                    }
                }}
            />

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: THEME.paddings.top, paddingBottom: THEME.paddings.bottom },
    backArrow: { position: 'absolute', top: THEME.paddings.top, left: 20, zIndex: 10 },
    header: { marginBottom: 20, justifyContent: 'flex-end', alignItems: 'flex-end' },
    tabsContainer: { flexDirection: 'row', gap: 8 },
    tab: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 8, borderWidth: 1, borderColor: THEME.colors.glass.border, backgroundColor: THEME.colors.glass.background },
});