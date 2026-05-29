import { CyberText } from '@/components/atoms/CyberText';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

export interface LeaderboardEntry {
    rank: number;
    pseudo: string;
    time?: string;
    accuracy?: number;
    score?: string | number;
    isUser?: boolean;
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
        <View style={[styles.container, style]}>
            <View style={styles.header}>
                <View>
                    <CyberText variant="caps" colorType="secondary">{title}</CyberText>
                    {subTitle && (
                        <CyberText variant="caps" accent="primary" style={{ fontSize: 10, marginTop: 4 }}>
                            {subTitle}
                        </CyberText>
                    )}
                </View>
                {headerRightComponent}
            </View>

            <View style={styles.box}>
                {isEmpty ? (
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <CyberText variant="bodySmall" colorType="secondary">AUCUNE DONNÉE</CyberText>
                    </View>
                ) : (
                    displayData.map((item, index) => (
                        <LeaderboardRow
                            key={index}
                            {...item}
                            isLast={index === displayData.length - 1}
                        />
                    ))
                )}
            </View>
        </View>
    );
}

const LeaderboardRow = ({ rank, pseudo, time, accuracy, score, isUser, isLast }: any) => {
    // Or, Argent, Bronze pour le top 3
    const rankColor = rank === 1 ? THEME.colors.primary : rank === 2 ? '#C0C0C0' : rank === 3 ? '#CD7F32' : THEME.colors.text.secondary;

    return (
        <View style={[styles.row, !isLast && styles.borderBottom, isUser && styles.userHighlight]}>
            {/* Rang */}
            <CyberText variant="body" style={{ width: 30, color: rankColor, fontWeight: 'bold' }}>
                #{rank}
            </CyberText>

            {/* Pseudo (ex: "Record Personnel") */}
            <CyberText variant="body" style={{ flex: 1, fontWeight: isUser ? 'bold' : 'normal', color: isUser ? THEME.colors.primary : THEME.colors.text.primary }}>
                {pseudo}
            </CyberText>

            {/* Stats (Droite) */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                {time && accuracy !== undefined ? (
                    <>
                        <View style={styles.statTag}>
                            <Ionicons name="locate" size={12} color={THEME.colors.text.secondary} />
                            <CyberText variant="bodySmall" colorType="secondary" style={styles.mono}>{accuracy}%</CyberText>
                        </View>
                        <View style={styles.statTag}>
                            <Ionicons name="time" size={12} color={isUser ? THEME.colors.primary : THEME.colors.text.primary} />
                            <CyberText variant="bodySmall" style={[styles.mono, { color: isUser ? THEME.colors.primary : THEME.colors.text.primary }]}>{time}</CyberText>
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
        borderColor: THEME.colors.glass.border
    },
    row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, height: 48 },
    borderBottom: { borderBottomWidth: 1, borderBottomColor: THEME.colors.glass.border },
    userHighlight: {
        backgroundColor: THEME.colors.primary + '15',
        marginHorizontal: -THEME.metrics.spacing.md,
        paddingHorizontal: THEME.metrics.spacing.md,
    },
    statTag: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    mono: { fontFamily: 'Courier New' },
});