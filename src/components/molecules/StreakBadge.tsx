import { CyberText } from '@/components/atoms/CyberText';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

interface Props {
    count: number;
}

export default function StreakBadge({ count }: Props) {
    // Si le streak est à 0 (ou bug), on n'affiche rien ou un état grisé
    if (count === 0) return null;

    const activeColor = THEME.colors.primary;

    return (
        <View style={styles.container}>
            <View style={[styles.iconWrapper, { backgroundColor: activeColor + '15' }]}>
                <Ionicons name="flame" size={16} color={activeColor} />
            </View>
            <CyberText variant="caps" style={{ color: activeColor, fontSize: 16, marginTop: -3 }}>
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
        // Légère ombre pour détacher le badge du fond
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