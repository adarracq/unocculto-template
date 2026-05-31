import { CyberText } from '@/components/atoms/CyberText';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

export interface LeaderboardEntry {
    rank: number;
    time?: string;
    accuracy?: number;
    score?: string | number;
    date?: string;
}

interface Props {
    title: string;
    subTitle?: string;
    data: LeaderboardEntry[] | null;
    style?: ViewStyle;
    limit?: number;
    headerRightComponent?: React.ReactNode;
}

export default function LeaderboardCard({ title, subTitle, data, style, limit = 10, headerRightComponent }: Props) {
    const displayData = data && data.length > 0 ? data.slice(0, limit) : [];
    const isEmpty = !data || data.length === 0;

    return (
        <ScrollView style={[styles.container, style]}>
            <View style={styles.header}>
                <View>
                    <CyberText variant="caps" colorType="secondary">{title}</CyberText>
                    {subTitle && (
                        <CyberText variant="caps" style={{ fontSize: 10, marginTop: 4 }}>
                            {subTitle}
                        </CyberText>
                    )}
                </View>
                {headerRightComponent}
            </View>

            <View style={styles.box}>
                {isEmpty ? (
                    <View style={{ padding: 30, alignItems: 'center' }}>
                        <Ionicons name="analytics-outline" size={24} color={THEME.colors.text.disabled} style={{ marginBottom: 8 }} />
                        <CyberText variant="bodySmall" colorType="disabled">AUCUNE DONNÉE ENREGISTRÉE</CyberText>
                    </View>
                ) : (
                    displayData.map((item, index) => (
                        <RecordRow
                            key={index}
                            {...item}
                            isLast={index === displayData.length - 1}
                        />
                    ))
                )}
            </View>
        </ScrollView>
    );
}

const RecordRow = ({ rank, time, accuracy, score, date, isLast }: any) => {
    const isFirst = rank === 1;
    const isSecond = rank === 2;
    const isThird = rank === 3;

    // Couleurs des médailles pour le Top 3
    const goldColor = THEME.colors.levels?.gold || '#FFD700';
    const silverColor = THEME.colors.levels?.silver || '#C0C0C0';
    const bronzeColor = THEME.colors.levels?.bronze || '#CD7F32';
    const rankColor = isFirst ? goldColor : isSecond ? silverColor : isThird ? bronzeColor : THEME.colors.text.secondary;

    return (
        <View style={[styles.row, !isLast && styles.borderBottom, isFirst && styles.firstHighlight, isSecond && styles.secondHilight, isThird && styles.thirdHighlight]}>

            {/* Rang (Médaille) */}
            <View style={{ width: 40 }}>
                <CyberText variant="body" style={{ color: rankColor, }}>
                    #{rank}
                </CyberText>
            </View>

            {/* Espace Central (Date ou Label auto) */}
            <CyberText variant="bodySmall" style={{ flex: 1, color: isFirst ? goldColor : THEME.colors.text.secondary }}>
                {date ? date : (isFirst ? "Record Absolu" : "Performance")}
            </CyberText>

            {/* Stats (Précision & Temps) */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                {time && accuracy !== undefined ? (
                    <>
                        <View style={styles.statTag}>
                            <Ionicons name="scan-circle" size={14} color={THEME.colors.text.secondary} />
                            <CyberText variant="bodySmall" colorType="secondary" style={styles.mono}>{accuracy}%</CyberText>
                        </View>
                        <View style={styles.statTag}>
                            <Ionicons name="timer" size={14} color={isFirst ? goldColor : THEME.colors.text.primary} />
                            <CyberText variant="bodySmall" style={[styles.mono, { color: isFirst ? goldColor : THEME.colors.text.primary }]}>
                                {time}
                            </CyberText>
                        </View>
                    </>
                ) : (
                    <CyberText variant="bodySmall" colorType="secondary" style={styles.mono}>{score}</CyberText>
                )}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: THEME.metrics.spacing.xl },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: THEME.metrics.spacing.md },
    box: {
        backgroundColor: THEME.colors.glass.background,
        borderRadius: THEME.metrics.radius.md,
        paddingHorizontal: THEME.metrics.spacing.md,
        paddingVertical: THEME.metrics.spacing.sm,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)'
    },
    row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, minHeight: 48 },
    borderBottom: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
    firstHighlight: {
        backgroundColor: THEME.colors.levels?.gold + '10',
        marginHorizontal: -THEME.metrics.spacing.md,
        paddingHorizontal: THEME.metrics.spacing.md,
    },
    secondHilight: {
        backgroundColor: THEME.colors.levels?.silver + '10',
        marginHorizontal: -THEME.metrics.spacing.md,
        paddingHorizontal: THEME.metrics.spacing.md,
    },
    thirdHighlight: {
        backgroundColor: THEME.colors.levels?.bronze + '10',
        marginHorizontal: -THEME.metrics.spacing.md,
        paddingHorizontal: THEME.metrics.spacing.md,
    },
    statTag: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    mono: { fontFamily: 'Courier New', marginTop: 2 },
});