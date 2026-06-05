import { MyText } from '@/components/atoms/MyText';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
    currentIndex: number;
    total: number;
    timeLeft: number | null;
    accuracy: number;
    title: string;
    subtitle?: string; // 💡 Ajout d'un sous-titre dynamique
}

export default function ArcadeHeader({ currentIndex, total, timeLeft, accuracy, title, subtitle }: Props) {
    const progress = (currentIndex / total) * 100;
    const isTimerDanger = timeLeft !== null && timeLeft <= 10;
    const timerColor = isTimerDanger ? THEME.colors.danger : THEME.colors.primary;

    return (
        <View style={[styles.container, { paddingTop: THEME.paddings.top + useSafeAreaInsets().top }]}>
            <View style={styles.topRow}>
                <View style={styles.titleBox}>
                    <MyText variant="caps" colorType="secondary" style={{ fontSize: 10, letterSpacing: 2 }}>
                        {subtitle || 'NIVEAU EN COURS'}
                    </MyText>
                    <MyText variant="h2" style={{ color: THEME.colors.text.primary, marginTop: 2 }}>
                        {title}
                    </MyText>
                </View>

                <View style={styles.statsBox}>
                    <View style={styles.statItem}>
                        <Ionicons name="time-outline" size={14} color={THEME.colors.text.secondary} />
                        <MyText variant="bodySmall" style={styles.monoText}>
                            {Math.round(accuracy)}%
                        </MyText>
                    </View>

                    {timeLeft !== null && (
                        <View style={[styles.statItem, isTimerDanger && styles.statDanger]}>
                            <Ionicons name="time" size={14} color={timerColor} />
                            <MyText variant="bodySmall" style={[styles.monoText, { color: timerColor }]}>
                                {timeLeft}s
                            </MyText>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.progressRow}>
                <MyText variant="caps" style={{ color: THEME.colors.text.secondary, fontSize: 10, width: 40 }}>
                    {currentIndex}/{total}
                </MyText>
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.metrics.spacing.lg,
        paddingBottom: THEME.metrics.spacing.md,
        backgroundColor: 'rgba(5,5,7,0.8)',
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.glass.border,
        zIndex: 10,
    },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
    titleBox: { flex: 1 },
    statsBox: { flexDirection: 'row', gap: 12 },
    statItem: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 8, paddingVertical: 4, borderRadius: THEME.metrics.radius.sm,
        gap: 6, borderWidth: 1, borderColor: THEME.colors.glass.border,
    },
    statDanger: { borderColor: THEME.colors.danger + '40', backgroundColor: THEME.colors.danger + '10' },
    monoText: { fontFamily: 'Courier New', fontWeight: 'bold', color: THEME.colors.text.primary },
    progressRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    progressBarBg: { flex: 1, height: 4, backgroundColor: THEME.colors.glass.border, borderRadius: 2, overflow: 'hidden' },
    progressBarFill: { height: '100%', backgroundColor: THEME.colors.primary, borderRadius: 2 }
});