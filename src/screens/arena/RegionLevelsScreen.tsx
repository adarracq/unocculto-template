import { CyberText } from '@/components/atoms/CyberText';
import { GAME_CONFIG, GameMode, LevelConfig } from '@/constants/GameConfig'; // Vérifiez le chemin
import { THEME } from '@/theme/theme';
import { functions } from '@/utils/Functions';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

// --- IMPORT DES STORES ---
import { useArenaStore } from '@/store/useArenaStore';
import { useUserStore } from '@/store/useUserStore';

// import CustomModal from '@/components/molecules/CustomModal';
import LeaderboardCard, { LeaderboardEntry } from './components/LeaderboardCard';
import LevelCard from './components/LevelCard';

const CONTINENTS = ['EUR', 'ASI', 'AFR', 'AME', 'OCE'];

export const RegionLevelsScreen = () => {
    const router = useRouter();
    const { regionId, mode } = useLocalSearchParams<{ regionId: string; mode: GameMode }>();

    const regionCode = regionId || 'EUR';
    const currentMode = mode || 'country';
    const modeConfig = GAME_CONFIG[currentMode];

    // --- LECTURE DES STORES HORS-LIGNE ---
    const user = useUserStore();
    const { progression, records } = useArenaStore();

    // --- ÉTATS ---
    const [selectedLevel, setSelectedLevel] = useState<LevelConfig | null>(null);
    const [leaderboardLevel, setLeaderboardLevel] = useState<number>(1);
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    // Extraction de la progression de la zone actuelle
    const regionProgress = progression[regionCode]?.[currentMode]?.levels || {};

    // --- LEADERBOARD DYNAMIQUE ---
    // On filtre les records de l'arène pour la zone, le mode et le niveau sélectionnés dans l'onglet
    const leaderboardData: LeaderboardEntry[] = records
        .filter(r => r.regionId === regionCode && r.modeId === currentMode && r.levelId === leaderboardLevel)
        .sort((a, b) => b.accuracy - a.accuracy || a.timeTaken - b.timeTaken)
        .slice(0, 10)
        .map((r, index) => ({
            rank: index + 1,
            pseudo: r.pseudo,
            time: functions.formatTime(r.timeTaken), // Assure-toi que formatTime prend des secondes
            accuracy: r.accuracy,
            isUser: r.pseudo === user.pseudo,
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

    const handleStartGame = (levelId: number) => {
        // Optionnel : Consommer du fuel si ce n'est pas déjà fait
        // if (!user.useFuel()) return setShowPremiumModal(true);

        const alreadyDone = progression[regionCode]?.[currentMode]?.levels?.[levelId]?.completed;

        console.log(`[Arène] Lancement: ${regionCode} - Mode: ${currentMode} - Niveau: ${levelId}`);
        router.push({
            pathname: '/arena/game',
            params: { regionId: regionCode, mode: currentMode, level: levelId, alreadyDone: alreadyDone ? 'true' : 'false' }
        });
    };

    return (
        <LinearGradient colors={[THEME.colors.backgroundLight, THEME.colors.background]} style={styles.container}>

            <TouchableOpacity onPress={() => router.back()} style={styles.backArrow}>
                <Ionicons name="arrow-back" size={24} color={THEME.colors.text.primary} />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{ padding: 20, }} showsVerticalScrollIndicator={false}>

                <View style={styles.header}>
                    <CyberText variant="h1" style={{ color: THEME.colors.text.primary }}>
                        {modeConfig.label}
                    </CyberText>
                    <CyberText variant="caps" style={{ color: THEME.colors.text.secondary, letterSpacing: 2 }}>
                        SECTEUR {regionCode}
                    </CyberText>
                </View>

                <View style={styles.section}>
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
                                onPress={() => {
                                    if (user.isPremium || user.fuel > 0) {
                                        // On lance directement le jeu si le modal CustomModal est désactivé
                                        handleStartGame(level.id);
                                    } else {
                                        setShowPremiumModal(true);
                                    }
                                }}
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
                                        <CyberText variant="caps" style={{ fontSize: 10, fontWeight: 'bold', color: leaderboardLevel === lvl ? getMedalColor(lvl) : THEME.colors.text.disabled }}>
                                            {lvl === 1 ? 'I' : lvl === 2 ? 'II' : 'III'}
                                        </CyberText>
                                    </TouchableOpacity>
                                ))}
                                {modeConfig.id === 'country' && (
                                    <TouchableOpacity
                                        onPress={() => setLeaderboardLevel(4)}
                                        style={[styles.tab, leaderboardLevel === 4 && { borderColor: getMedalColor(4), backgroundColor: getMedalColor(4) + '20' }]}
                                    >
                                        <CyberText variant="caps" style={{ fontSize: 10, fontWeight: 'bold', color: leaderboardLevel === 4 ? getMedalColor(4) : THEME.colors.text.disabled }}>
                                            IV
                                        </CyberText>
                                    </TouchableOpacity>
                                )}
                            </View>
                        }
                    />
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 60 },
    backArrow: { position: 'absolute', top: 60, left: 20, zIndex: 10 },
    header: { marginBottom: 20, justifyContent: 'flex-end', alignItems: 'flex-end' },
    section: { marginBottom: 20 },
    tabsContainer: { flexDirection: 'row', gap: 8 },
    tab: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 8, borderWidth: 1, borderColor: THEME.colors.glass.border, backgroundColor: THEME.colors.glass.background },
});