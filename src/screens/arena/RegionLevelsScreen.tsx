import { MyText } from '@/components/atoms/MyText';
import { GAME_CONFIG, GameMode, LevelConfig } from '@/constants/GameConfig';
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
import OutOfTicketsModal from '@/components/organisms/OutOfTicketsModal';
import { feedbackService } from '@/utils/feedbackService';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LeaderboardCard, { LeaderboardEntry } from './components/LeaderboardCard';
import LevelBriefingModal from './components/LevelBriefingModal'; // 💡 Import du nouveau Modal
import LevelCard from './components/LevelCard';

const CONTINENTS = ['EUR', 'ASI', 'AFR', 'AME', 'OCE'];

export default function RegionLevelsScreen() {
    const router = useRouter();
    const { regionId, mode } = useLocalSearchParams<{ regionId: string; mode: GameMode }>();

    const regionCode = regionId || 'EUR';
    const currentMode = mode || 'country';
    const modeConfig = GAME_CONFIG[currentMode];

    const { consumeTicket } = useUserStore();
    const { progression, records } = useArenaStore();

    // --- ÉTATS ---
    const [leaderboardLevel, setLeaderboardLevel] = useState<number>(1);
    const [showPremiumModal, setShowPremiumModal] = useState(false);
    const [pendingLevelId, setPendingLevelId] = useState<number | null>(null);

    // 💡 Nouvel état pour gérer le niveau sélectionné pour le briefing
    const [selectedLevelBriefing, setSelectedLevelBriefing] = useState<LevelConfig | null>(null);

    const regionProgress = progression[regionCode]?.[currentMode]?.levels || {};

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

    // 💡 Cette fonction est maintenant appelée par le bouton DÉMARRER du Modal
    const handleAttemptStartGame = (levelId: number) => {
        const canPlay = consumeTicket();

        if (canPlay) {
            feedbackService.medium();
            // On ferme le modal juste avant de lancer la page
            setSelectedLevelBriefing(null);
            router.push({
                pathname: '/arena/game',
                params: { regionId: regionCode, mode: currentMode, level: levelId }
            });
        } else {
            feedbackService.error();
            // On ferme le briefing pour afficher le modal Premium à la place
            setSelectedLevelBriefing(null);
            setPendingLevelId(levelId);
            setShowPremiumModal(true);
        }
    };

    const insets = useSafeAreaInsets();

    return (
        <LinearGradient
            colors={[THEME.colors.backgroundVeryLight, THEME.colors.background]}
            style={[styles.container, { paddingTop: THEME.paddings.top + insets.top }]}
        >
            <View style={{ flex: 1 }}>

                {/* 💡 EN-TÊTE ÉPURÉ (Sans TicketBadge) */}
                <View style={styles.topBar}>

                    <TouchableOpacity
                        onPress={() => { feedbackService.light(); router.back(); }}
                        style={styles.backButton}
                    >
                        <View style={styles.backButtonIcon}>
                            <Ionicons name="arrow-back" size={20} color={THEME.colors.text.primary} />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.headerRight}>
                        <MyText variant="caps" style={[styles.cyberSubtitle, { color: modeConfig.color }]}>
                            /// SECTEUR {regionCode}
                        </MyText>
                        <MyText variant="h1" style={styles.heroTitle}>
                            {modeConfig.label}
                        </MyText>
                    </View>

                </View>

                {/* --- LISTE DES NIVEAUX --- */}
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
                                isLocked={isLocked}
                                isCompleted={!!data?.completed}
                                themeColor={modeConfig.color}
                                bestTime={data?.completed ? functions.formatTime(data.bestTime) : undefined}
                                bestAccuracy={data?.completed ? data.bestAccuracy : undefined}
                                // 💡 Au clic, on ouvre le modal de Briefing au lieu de lancer le jeu
                                onPress={() => {
                                    feedbackService.light();
                                    setSelectedLevelBriefing(level);
                                }}
                            />
                        );
                    })}
                </View>

                {/* --- LEADERBOARD --- */}
                <View style={{ marginTop: THEME.metrics.spacing.md }}>
                    <LeaderboardCard
                        title="RECORDS"
                        data={leaderboardData}
                        limit={10}
                        headerRightComponent={
                            <View style={styles.tabsContainer}>
                                {modeConfig.levels.map((lvl) => {
                                    const isActive = leaderboardLevel === lvl.id;
                                    const roman = ['I', 'II', 'III', 'IV', 'V'][lvl.id - 1];

                                    return (
                                        <TouchableOpacity
                                            key={lvl.id}
                                            onPress={() => { feedbackService.light(); setLeaderboardLevel(lvl.id) }}
                                            style={[
                                                styles.tab,
                                                isActive && { borderColor: modeConfig.color, backgroundColor: `${modeConfig.color}20` }
                                            ]}
                                        >
                                            <MyText variant="caps" style={{ fontSize: 10, color: isActive ? modeConfig.color : THEME.colors.text.disabled }}>
                                                {roman}
                                            </MyText>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        }
                    />
                </View>
            </View>

            <LevelBriefingModal
                visible={!!selectedLevelBriefing}
                onClose={() => setSelectedLevelBriefing(null)}
                level={selectedLevelBriefing}
                mode={modeConfig}
                regionId={regionCode}
                onPlay={handleAttemptStartGame}
            />

            <OutOfTicketsModal
                visible={showPremiumModal}
                onClose={() => setShowPremiumModal(false)}
                onSuccess={() => {
                    setShowPremiumModal(false);
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
    container: {
        flex: 1,
        paddingHorizontal: THEME.paddings.horizontal,
        paddingBottom: THEME.paddings.bottom,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: THEME.metrics.spacing.md,
    },
    backButton: {},
    backButtonIcon: {
        width: 38,
        height: 38,
        borderRadius: THEME.metrics.radius.sm,
        backgroundColor: THEME.colors.glass.background,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRight: {
        alignItems: 'flex-end',
        flex: 1,
        paddingLeft: THEME.paddings.horizontal,
    },
    cyberSubtitle: {
        fontSize: 11,
        letterSpacing: 2,
        marginBottom: 2,
    },
    heroTitle: {
        color: THEME.colors.text.primary,
        fontSize: 32,
        lineHeight: 36,
    },
    tabsContainer: {
        flexDirection: 'row',
        gap: 8
    },
    tab: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: THEME.metrics.radius.sm,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
        backgroundColor: THEME.colors.glass.background
    },
});