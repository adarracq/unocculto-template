import { MyText } from '@/components/atoms/MyText';
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
        <ScrollView style={[styles.container, style]} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <View>
                    <MyText variant="caps" colorType="secondary">{title}</MyText>
                    {subTitle && (
                        <MyText variant="caps" style={{ fontSize: 10, marginTop: 4 }}>
                            {subTitle}
                        </MyText>
                    )}
                </View>
                {headerRightComponent}
            </View>

            <View style={styles.box}>
                {isEmpty ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="analytics-outline" size={24} color={THEME.colors.text.disabled} style={{ marginBottom: 8 }} />
                        <MyText variant="bodySmall" colorType="disabled">AUCUNE DONNÉE ENREGISTRÉE</MyText>
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
    const isPodium = isFirst || isSecond || isThird;

    // Couleurs du podium
    const goldColor = THEME.colors.levels?.gold || '#FFD700';
    const silverColor = THEME.colors.levels?.silver || '#C0C0C0';
    const bronzeColor = THEME.colors.levels?.bronze || '#CD7F32';

    let rankColor: string = THEME.colors.text.disabled;
    let rankIcon = null;
    let highlightStyle = {};

    if (isFirst) {
        rankColor = goldColor;
        rankIcon = "trophy";
        highlightStyle = { backgroundColor: `${goldColor}15` }; // 15 = Opacité Hexa
    } else if (isSecond) {
        rankColor = silverColor;
        rankIcon = "medal";
        highlightStyle = { backgroundColor: `${silverColor}10` };
    } else if (isThird) {
        rankColor = bronzeColor;
        rankIcon = "medal";
        highlightStyle = { backgroundColor: `${bronzeColor}10` };
    }

    return (
        <View style={[
            styles.row,
            !isLast && styles.borderBottom,
            highlightStyle // 💡 Le background s'applique proprement sur toute la ligne
        ]}>

            {/* Rang (Médaille ou Numéro) */}
            <View style={styles.rankContainer}>
                {rankIcon ? (
                    <Ionicons name={rankIcon as any} size={18} color={rankColor} />
                ) : (
                    <MyText variant="caps" style={{ color: rankColor, fontSize: 14 }}>
                        #{rank}
                    </MyText>
                )}
            </View>

            {/* Label / Date */}
            <View style={styles.labelContainer}>
                <MyText variant="bodySmall" style={{ color: isFirst ? goldColor : THEME.colors.text.secondary }}>
                    {date ? date : (isFirst ? "Record Absolu" : "Performance")}
                </MyText>
            </View>

            {/* Stats (Précision & Temps / Score) */}
            <View style={styles.statsContainer}>
                {time && accuracy !== undefined ? (
                    <>
                        <View style={styles.statTag}>
                            <Ionicons name="scan-circle-outline" size={14} color={isFirst ? goldColor : THEME.colors.text.primary} />
                            <MyText variant="bodySmall" colorType="secondary" style={[styles.mono, { color: isFirst ? goldColor : THEME.colors.text.primary }]}>
                                {accuracy}%
                            </MyText>
                        </View>
                        <View style={styles.statTag}>
                            <Ionicons name="timer-outline" size={14} color={isFirst ? goldColor : THEME.colors.text.primary} />
                            <MyText variant="bodySmall" style={[styles.mono, { color: isFirst ? goldColor : THEME.colors.text.primary }]}>
                                {time}
                            </MyText>
                        </View>
                    </>
                ) : (
                    <MyText variant="bodySmall" colorType="secondary" style={[styles.mono, { color: isFirst ? goldColor : THEME.colors.text.primary }]}>
                        {score}
                    </MyText>
                )}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: THEME.metrics.spacing.xl
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: THEME.metrics.spacing.md
    },
    box: {
        backgroundColor: THEME.colors.glass.background,
        borderRadius: THEME.metrics.radius.md,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
        overflow: 'hidden',
    },
    emptyState: {
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16, // 💡 Le padding est maintenant sur la ligne, pas sur la boîte
        minHeight: 54
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)'
    },
    rankContainer: {
        width: 36,
        alignItems: 'center',
        marginRight: 12,
    },
    labelContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    statTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 2,
    },
    mono: {
        fontSize: 13,
        letterSpacing: 0.5,
    },
});