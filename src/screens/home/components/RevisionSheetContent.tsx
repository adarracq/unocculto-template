import MyButton from '@/components/atoms/MyButton';
import { MyText } from '@/components/atoms/MyText';
import { GAME_CONFIG, GameMode } from '@/constants/GameConfig';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
    urgentCount: number;
    consolidationCount: number;
    masteredCount: number;
    onStartRevision: () => void;
    onStartTraining: (mode: GameMode, level: number) => void; // 💡 Modification ici
}

export default function RevisionSheetContent({
    urgentCount,
    consolidationCount,
    masteredCount,
    onStartRevision,
    onStartTraining
}: Props) {
    const totalKnown = urgentCount + consolidationCount + masteredCount;

    // États pour naviguer dans le BottomSheet
    const [view, setView] = useState<'overview' | 'setupTraining'>('overview');
    const [selectedMode, setSelectedMode] = useState<GameMode>('country');
    const [selectedLevel, setSelectedLevel] = useState<number>(1);

    // ==========================================
    // VUE 2 : SÉLECTION DU MODE ET DU NIVEAU
    // ==========================================
    if (view === 'setupTraining') {
        const currentModeConfig = GAME_CONFIG[selectedMode];

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => setView('overview')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={20} color={THEME.colors.text.secondary} />
                    <MyText variant="caps" colorType="secondary">RETOUR</MyText>
                </TouchableOpacity>

                {/* SÉLECTEUR DE MODE */}
                <View style={styles.modesRow}>
                    {(Object.keys(GAME_CONFIG) as GameMode[]).map((modeKey) => {
                        const mode = GAME_CONFIG[modeKey];
                        const isActive = selectedMode === modeKey;
                        return (
                            <TouchableOpacity
                                key={modeKey}
                                onPress={() => { setSelectedMode(modeKey); setSelectedLevel(1); }}
                                style={[
                                    styles.modeTab,
                                    isActive && { borderColor: mode.color, backgroundColor: mode.color + '15' }
                                ]}
                            >
                                <Ionicons name={mode.iconName} size={20} color={isActive ? mode.color : THEME.colors.text.disabled} />
                                <MyText variant="caps" style={{ color: isActive ? mode.color : THEME.colors.text.disabled, fontSize: 10, marginTop: 4 }}>
                                    {mode.label}
                                </MyText>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* SÉLECTEUR DE NIVEAU */}
                <View style={styles.levelsContainer}>
                    {currentModeConfig.levels.map((level) => {
                        const isActive = selectedLevel === level.id;
                        if (level.id > 3) return null;
                        return (
                            <TouchableOpacity
                                key={level.id}
                                onPress={() => setSelectedLevel(level.id)}
                                style={[
                                    styles.levelCard,
                                    isActive && { borderColor: currentModeConfig.color, backgroundColor: 'rgba(255,255,255,0.05)' }
                                ]}
                            >
                                <View style={styles.levelCardHeader}>
                                    <View style={[styles.levelBadge, isActive && { backgroundColor: currentModeConfig.color }]}>
                                        <MyText variant="caps" style={{ color: isActive ? THEME.colors.background : THEME.colors.text.secondary }}>
                                            {level.id}
                                        </MyText>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <MyText variant="h3" style={{ color: isActive ? currentModeConfig.color : THEME.colors.text.primary }}>
                                            {level.title}
                                        </MyText>
                                        <MyText variant="bodySmall" colorType="secondary">
                                            {level.description}
                                        </MyText>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <MyButton
                    title="LANCER LA PARTIE"
                    iconRight="chevron-forward"
                    iconLeft="ticket"
                    onPress={() => onStartTraining(selectedMode, selectedLevel)}
                    style={{ marginTop: 16 }}
                />
            </View>
        );
    }

    // ==========================================
    // VUE 1 : VUE D'ENSEMBLE (STATISTIQUES)
    // ==========================================
    return (
        <View style={styles.container}>
            <View style={styles.statsRow}>
                <View style={styles.statBox}>
                    <MyText variant="h2" style={{ color: THEME.colors.danger }}>{urgentCount}</MyText>
                    <MyText variant="caps" colorType="secondary" style={{ fontSize: 10, marginTop: 4 }}>URGENT</MyText>
                </View>
                <View style={styles.statBox}>
                    <MyText variant="h2" style={{ color: THEME.colors.inProgress }}>{consolidationCount}</MyText>
                    <MyText variant="caps" colorType="secondary" style={{ fontSize: 10, marginTop: 4 }}>EN COURS</MyText>
                </View>
                <View style={styles.statBox}>
                    <MyText variant="h2" style={{ color: THEME.colors.success }}>{masteredCount}</MyText>
                    <MyText variant="caps" colorType="secondary" style={{ fontSize: 10, marginTop: 4 }}>ACQUIS</MyText>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.actionsContainer}>
                <View style={styles.actionBlock}>
                    <View style={styles.actionHeader}>
                        <MyText variant="h3" style={{ color: urgentCount > 0 ? THEME.colors.text.primary : THEME.colors.text.disabled }}>
                            MAINTENANCE
                        </MyText>
                    </View>
                    <MyText variant="bodySmall" colorType="secondary" style={{ marginBottom: 12 }}>
                        Révisez les données sur le point d'être oubliées pour les ancrer définitivement (Ne nécessite pas de ticket).
                    </MyText>
                    <MyButton
                        title={urgentCount > 0 ? "DÉMARRER LES RÉVISIONS" : "MÉMOIRE À JOUR"}
                        variant={urgentCount > 0 ? "danger" : "outline"}
                        iconRight={urgentCount > 0 ? "chevron-forward" : "checkmark"}
                        iconLeft="warning"
                        onPress={onStartRevision}
                        disabled={urgentCount === 0}
                    />
                </View>

                <View style={styles.actionBlock}>
                    <View style={styles.actionHeader}>

                        <MyText variant="h3" style={{ color: totalKnown > 0 ? THEME.colors.text.primary : THEME.colors.text.disabled }}>
                            SIMULATION LIBRE
                        </MyText>
                    </View>
                    <MyText variant="bodySmall" colorType="secondary" style={{ marginBottom: 12 }}>
                        Jouez librement avec les {totalKnown} pays de votre réseau sans impacter vos statistiques d'apprentissage.
                    </MyText>
                    <MyButton
                        title={totalKnown > 0 ? "S'ENTRAÎNER" : "AUCUN PAYS ACQUIS"}
                        iconRight={totalKnown > 0 ? "chevron-forward" : "close"}
                        iconLeft="ticket"
                        onPress={() => setView('setupTraining')} // 💡 Bascule sur la vue 2
                        disabled={totalKnown === 0}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { paddingBottom: 20 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 },
    statBox: { alignItems: 'center', flex: 1 },
    divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 20 },
    actionsContainer: { gap: 16 },
    actionBlock: { backgroundColor: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: THEME.metrics.radius.md, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
    actionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },

    // --- VUE SETUP ---
    backButton: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingBottom: 16 },
    modesRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
    modeTab: { flex: 1, alignItems: 'center', paddingVertical: 12, borderWidth: 1, borderColor: THEME.colors.glass.border, borderRadius: THEME.metrics.radius.sm, backgroundColor: 'rgba(255,255,255,0.02)' },

    // 💡 MODIFICATION ICI : On enlève le maxHeight
    levelsContainer: { marginBottom: 8 },

    levelCard: { padding: 12, marginBottom: 12, borderWidth: 1, borderColor: THEME.colors.glass.border, borderRadius: THEME.metrics.radius.sm, backgroundColor: 'rgba(255,255,255,0.02)' },
    levelCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    levelBadge: { width: 30, height: 30, borderRadius: 15, backgroundColor: THEME.colors.glass.background, justifyContent: 'center', alignItems: 'center' }
});