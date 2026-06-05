import { MyText } from '@/components/atoms/MyText';
import { useUserStore } from '@/store/useUserStore';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

export default function TicketBadge() {
    const tickets = useUserStore(state => state.tickets);
    const isPremium = useUserStore(state => state.isPremium);

    // Si le joueur est premium, on affiche un badge spécial (ex: "∞" ou une icône différente)
    const ticketColor = isPremium ? THEME.colors.primary : tickets > 0 ? THEME.colors.text.secondary : THEME.colors.danger;

    return (
        <View style={styles.container}>
            <View style={[styles.iconWrapper, { backgroundColor: ticketColor + '15' }]}>
                {/* L'icône ticket rappelle l'embarquement/voyage */}
                <Ionicons name="ticket" size={16} color={ticketColor} />
            </View>
            {isPremium ?
                <Ionicons name="infinite" size={20} color={ticketColor} /> :
                <MyText variant="caps" style={{ color: ticketColor, fontSize: 16, marginTop: -3 }}>
                    {tickets}
                </MyText>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(15, 15, 17, 0.85)',
        paddingVertical: 6,
        paddingLeft: 6,
        paddingRight: 12,
        borderRadius: THEME.metrics.radius.md,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    iconWrapper: {
        width: 24,
        height: 24,
        borderRadius: THEME.metrics.radius.sm,
        justifyContent: 'center',
        alignItems: 'center',
    }
});