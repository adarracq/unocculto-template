import { CyberText } from '@/components/atoms/CyberText';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

interface Props {
    count: number;
}

export default function TicketBadge({ count }: Props) {
    // Une couleur différente (ex: bleu clair, blanc ou la couleur secondaire) pour contraster avec la flamme
    const ticketColor = count > 0 ? THEME.colors.text.secondary : THEME.colors.danger;

    return (
        <View style={styles.container}>
            <View style={[styles.iconWrapper, { backgroundColor: ticketColor + '15' }]}>
                {/* L'icône ticket rappelle l'embarquement/voyage */}
                <Ionicons name="ticket" size={16} color={ticketColor} />
            </View>
            <CyberText variant="caps" style={{ color: ticketColor, fontSize: 16, marginTop: -3 }}>
                {count}
            </CyberText>
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
        borderRadius: 20,
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
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    }
});