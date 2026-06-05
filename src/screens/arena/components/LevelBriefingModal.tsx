// src/screens/arena/components/LevelBriefingModal.tsx
import MyButton from '@/components/atoms/MyButton';
import { MyText } from '@/components/atoms/MyText';
import { BaseBottomSheet } from '@/components/molecules/BaseBottomSheet';
import { LevelConfig, ModeConfig } from '@/constants/GameConfig';
import { useArenaStore } from '@/store/useArenaStore';
import { useUserStore } from '@/store/useUserStore'; // 💡 Import du store utilisateur
import { THEME } from '@/theme/theme';
import { functions } from '@/utils/Functions';
import { Ionicons } from '@expo/vector-icons';
import { Crosshair } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

interface Props {
    visible: boolean;
    onClose: () => void;
    level: LevelConfig | null;
    mode: ModeConfig;
    regionId: string;
    onPlay: (levelId: number) => void;
}

export default function LevelBriefingModal({ visible, onClose, level, mode, regionId, onPlay }: Props) {
    // Récupération des données d'arène
    const records = useArenaStore(state => state.records);
    const progression = useArenaStore(state => state.progression);

    // 💡 Récupération des données utilisateur (Tickets & Premium)
    const tickets = useUserStore(state => state.tickets);
    const isPremium = useUserStore(state => state.isPremium);

    if (!level) return null;

    // Progression personnelle
    const personalBest = progression[regionId]?.[mode.id]?.levels[level.id];

    // Top 3 des records locaux pour CE niveau précis
    const topRecords = records
        .filter(r => r.regionId === regionId && r.modeId === mode.id && r.levelId === level.id)
        .sort((a, b) => b.accuracy - a.accuracy || a.timeTaken - b.timeTaken)
        .slice(0, 3);

    return (
        <BaseBottomSheet
            isVisible={visible}
            onClose={onClose}
            title={`NIVEAU ${level.id} - ${mode.label}`}
        >

            {/* --- BLOC OBJECTIF --- */}
            <View style={styles.objectiveCard}>
                <View style={[styles.iconBox, { backgroundColor: `${mode.color}15`, borderColor: `${mode.color}30` }]}>
                    <Crosshair size={24} color={mode.color} />
                </View>
                <View style={styles.objectiveText}>
                    <MyText variant="caps" style={{ color: mode.color, fontSize: 11, letterSpacing: 1 }}>
                        MISSION : {level.title}
                    </MyText>
                    <MyText variant="h3" style={{ color: THEME.colors.text.primary, marginVertical: 4 }}>
                        {level.subTitle}
                    </MyText>
                    <MyText variant="bodySmall" style={{ color: THEME.colors.text.secondary }}>
                        {level.description}
                    </MyText>
                </View>
            </View>

            {/* --- BLOC STATS ET RECORDS --- */}
            <View style={styles.statsSection}>
                <MyText variant="caps" style={styles.sectionTitle}>
                    DONNÉES DU RANG
                </MyText>

                {personalBest?.completed ? (
                    <View style={styles.personalBestCard}>
                        <MyText variant="bodySmall" style={{ color: THEME.colors.text.secondary }}>
                            Votre meilleur score
                        </MyText>
                        <View style={styles.scoreRow}>
                            <View style={styles.scorePill}>
                                <Ionicons name="scan-circle" size={16} color={mode.color} />
                                <MyText variant="h3" style={{ color: THEME.colors.text.primary }}>
                                    {personalBest.bestAccuracy}%
                                </MyText>
                            </View>
                            <View style={styles.scorePill}>
                                <Ionicons name="timer" size={16} color={mode.color} />
                                <MyText variant="h3" style={{ color: THEME.colors.text.primary }}>
                                    {functions.formatTime(personalBest.bestTime)}
                                </MyText>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={styles.emptyCard}>
                        <Ionicons name="shield-half-outline" size={20} color={THEME.colors.text.disabled} />
                        <MyText variant="bodySmall" style={{ color: THEME.colors.text.disabled, marginTop: 4 }}>
                            Niveau non complété
                        </MyText>
                    </View>
                )}
            </View>

            {/* --- ZONE D'ACTION --- */}
            <View style={styles.actionContainer}>

                {/* 💡 RAPPEL DES TICKETS (Non-Premium uniquement) */}
                {!isPremium && (
                    <View style={styles.ticketBanner}>
                        <View style={styles.ticketIconBox}>
                            <Ionicons
                                name="ticket"
                                size={14}
                                color={tickets > 0 ? THEME.colors.text.secondary : THEME.colors.danger}
                            />
                        </View>
                        <MyText
                            variant="caps"

                            style={{
                                color: tickets > 0 ? THEME.colors.text.secondary : THEME.colors.danger,
                            }}
                        >
                            TICKETS RESTANTS : {tickets}
                        </MyText>
                    </View>
                )}

                <MyButton
                    title="DÉMARRER"
                    iconLeft="earth"
                    iconRight="chevron-forward"
                    onPress={() => onPlay(level.id)}
                />
            </View>
        </BaseBottomSheet>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    objectiveCard: {
        flexDirection: 'row',
        backgroundColor: THEME.colors.glass.background,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
        borderRadius: THEME.metrics.radius.md,
        padding: THEME.metrics.spacing.md,
        marginBottom: THEME.metrics.spacing.lg,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: THEME.metrics.radius.sm,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: THEME.metrics.spacing.md,
    },
    objectiveText: {
        flex: 1,
        justifyContent: 'center',
    },
    statsSection: {
        marginBottom: THEME.metrics.spacing.lg,
    },
    sectionTitle: {
        fontSize: 12,
        color: THEME.colors.text.disabled,
        letterSpacing: 2,
        marginBottom: THEME.metrics.spacing.md,
        marginLeft: THEME.metrics.spacing.sm,
    },
    personalBestCard: {
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        borderRadius: THEME.metrics.radius.md,
        padding: THEME.metrics.spacing.md,
        alignItems: 'center',
    },
    emptyCard: {
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        borderRadius: THEME.metrics.radius.md,
        padding: THEME.metrics.spacing.md,
        alignItems: 'center',
        borderStyle: 'dashed',
    },
    scoreRow: {
        flexDirection: 'row',
        gap: THEME.metrics.spacing.md,
        marginTop: THEME.metrics.spacing.md,
    },
    scorePill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.colors.glass.background,
        paddingHorizontal: THEME.metrics.spacing.md,
        paddingVertical: THEME.metrics.spacing.sm,
        borderRadius: THEME.metrics.radius.md,
        gap: THEME.metrics.spacing.sm,
    },
    actionContainer: {
        gap: THEME.metrics.spacing.md
    },

    ticketBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: THEME.colors.glass.background,
        paddingRight: THEME.metrics.spacing.md,
        paddingLeft: 4,
        paddingVertical: 4,
        borderRadius: THEME.metrics.radius.md,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
        marginBottom: THEME.metrics.spacing.md,
        gap: THEME.metrics.spacing.md,
    },
    ticketIconBox: {
        width: 32,
        height: 32,
        borderRadius: THEME.metrics.radius.round,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});