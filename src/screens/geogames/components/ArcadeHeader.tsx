// src/screens/arena/geogames/components/ArcadeHeader.tsx
import { CyberText } from '@/components/atoms/CyberText';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

interface Props {
    currentIndex: number;
    total: number;
    timeLeft: number | null; // null si temps infini
    accuracy: number;
    title: string;
}

export default function ArcadeHeader({ currentIndex, total, timeLeft, accuracy, title }: Props) {
    // Calcul de la progression
    const progress = (currentIndex / total) * 100;

    // Le timer devient rouge s'il reste moins de 10 secondes
    const isTimerDanger = timeLeft !== null && timeLeft <= 10;
    const timerColor = isTimerDanger ? THEME.colors.danger : THEME.colors.primary;

    return (
        <View style={styles.container}>

            {/* Ligne 1 : Titre & Stats */}
            <View style={styles.topRow}>
                <View style={styles.titleBox}>
                    <CyberText variant="caps" colorType="secondary" style={{ fontSize: 10, letterSpacing: 2 }}>
                        NIVEAU EN COURS
                    </CyberText>
                    <CyberText variant="h2" style={{ color: THEME.colors.text.primary, marginTop: 2 }}>
                        {title}
                    </CyberText>
                </View>

                <View style={styles.statsBox}>
                    <View style={styles.statItem}>
                        <Ionicons name="time-outline" size={14} color={THEME.colors.text.secondary} />
                        <CyberText variant="bodySmall" style={styles.monoText}>
                            {Math.round(accuracy)}%
                        </CyberText>
                    </View>

                    {timeLeft !== null && (
                        <View style={[styles.statItem, isTimerDanger && styles.statDanger]}>
                            <Ionicons name="time" size={14} color={timerColor} />
                            <CyberText variant="bodySmall" style={[styles.monoText, { color: timerColor }]}>
                                {timeLeft}s
                            </CyberText>
                        </View>
                    )}
                </View>
            </View>

            {/* Ligne 2 : Barre de progression du quiz */}
            <View style={styles.progressRow}>
                <CyberText variant="caps" style={{ color: THEME.colors.text.secondary, fontSize: 10, width: 40 }}>
                    {currentIndex}/{total}
                </CyberText>
                <View style={styles.progressBarBg}>
                    <View
                        style={[
                            styles.progressBarFill,
                            { width: `${progress}%` }
                        ]}
                    />
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.metrics.spacing.lg,
        paddingTop: 60, // Safe Area (à ajuster)
        paddingBottom: THEME.metrics.spacing.md,
        backgroundColor: 'rgba(5,5,7,0.8)', // OLED transparent
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.glass.border,
        zIndex: 10,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 16,
    },
    titleBox: {
        flex: 1,
    },
    statsBox: {
        flexDirection: 'row',
        gap: 12,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 6,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
    },
    statDanger: {
        borderColor: THEME.colors.danger + '40',
        backgroundColor: THEME.colors.danger + '10',
    },
    monoText: {
        fontFamily: 'Courier New', // Pour éviter que le timer saute de largeur
        fontWeight: 'bold',
        color: THEME.colors.text.primary,
    },
    progressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    progressBarBg: {
        flex: 1,
        height: 4,
        backgroundColor: THEME.colors.glass.border,
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: THEME.colors.primary,
        borderRadius: 2,
    }
});