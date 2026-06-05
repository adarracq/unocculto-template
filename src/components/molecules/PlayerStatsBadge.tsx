import { MyText } from '@/components/atoms/MyText';
import { useStreakStore } from '@/store/useStreakStore';
import { useUserStore } from '@/store/useUserStore';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

export default function PlayerStatsBadge() {
    // Récupération globale des états
    const streakCount = useStreakStore(state => state.streakCount);
    const tickets = useUserStore(state => state.tickets);
    const isPremium = useUserStore(state => state.isPremium);

    const flameColor = THEME.colors.primary;
    const ticketColor = isPremium ? THEME.colors.primary : tickets > 0 ? THEME.colors.text.secondary : THEME.colors.danger;

    return (
        <View style={styles.container}>
            {/* ZONE SÉRIE (FLAMME) */}
            {streakCount > 0 && (
                <>
                    <View style={styles.statGroup}>
                        <View style={[styles.iconWrapper, { backgroundColor: flameColor + '15' }]}>
                            <Ionicons name="flame" size={14} color={flameColor} />
                        </View>
                        <MyText variant="caps" style={{ color: flameColor, fontSize: 14, marginTop: -2 }}>
                            {streakCount}
                        </MyText>
                    </View>
                    <View style={styles.divider} />
                </>
            )}

            {/* ZONE TICKETS */}
            <View style={styles.statGroup}>
                <View style={[styles.iconWrapper, { backgroundColor: ticketColor + '15' }]}>
                    <Ionicons name="ticket" size={14} color={ticketColor} />
                </View>
                {isPremium ? (
                    <Ionicons name="infinite" size={18} color={ticketColor} />
                ) : (
                    <MyText variant="caps" style={{ color: ticketColor, fontSize: 14, marginTop: -2 }}>
                        {tickets}
                    </MyText>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(15, 15, 17, 0.90)',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: THEME.metrics.radius.md,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    statGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 4,
    },
    iconWrapper: {
        width: 24,
        height: 24,
        borderRadius: THEME.metrics.radius.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        width: 1,
        height: 16,
        backgroundColor: 'rgba(255,255,255,0.15)',
        marginHorizontal: 4,
    }
});