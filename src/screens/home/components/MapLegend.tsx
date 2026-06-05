import { MyText } from '@/components/atoms/MyText';
import { THEME } from '@/theme/theme';
import { StyleSheet, View } from 'react-native';

interface Props {
    mastered: number;
    inProgress: number;
    urgent: number;
    left: number;
}

export default function MapLegend({ mastered, inProgress, urgent, left }: Props) {
    return (
        <View style={styles.container}>
            {/* BLOC 1 : ACQUIS */}
            <View style={styles.statBox}>
                <MyText variant="h1" style={[styles.value, { color: THEME.colors.success }]}>
                    {mastered}
                </MyText>
                <MyText variant="caps" style={[styles.label, { color: THEME.colors.success }]}>
                    ACQUIS
                </MyText>
            </View>

            <View style={styles.verticalDivider} />

            {/* BLOC 2 : EN COURS */}
            <View style={styles.statBox}>
                <MyText variant="h1" style={[styles.value, { color: THEME.colors.inProgress }]}>
                    {inProgress}
                </MyText>
                <MyText variant="caps" style={[styles.label, { color: THEME.colors.inProgress }]}>
                    EN COURS
                </MyText>
            </View>

            <View style={styles.verticalDivider} />

            {/* BLOC 3 : URGENTS */}
            <View style={styles.statBox}>
                <MyText variant="h1" style={[styles.value, { color: THEME.colors.danger }]}>
                    {urgent}
                </MyText>
                <MyText variant="caps" style={[styles.label, { color: THEME.colors.danger }]}>
                    URGENTS
                </MyText>
            </View>

            <View style={styles.verticalDivider} />

            {/* BLOC 4 : RESTANTS */}
            <View style={styles.statBox}>
                <MyText variant="h1" style={[styles.value, { color: THEME.colors.text.disabled }]}>
                    {left}
                </MyText>
                <MyText variant="caps" style={[styles.label, { color: THEME.colors.text.disabled }]}>
                    RESTANTS
                </MyText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'rgba(15, 15, 17, 0.95)',
        borderRadius: THEME.metrics.radius.md,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 12, // Crée l'espace nécessaire au-dessus des boutons
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    statBox: {
        alignItems: 'center',
        flex: 1,
        gap: 2
    },
    value: {
        fontSize: 18,
    },
    label: {
        fontSize: 9,
        letterSpacing: 0.5
    },
    verticalDivider: {
        width: 1,
        height: '60%',
        backgroundColor: 'rgba(255,255,255,0.1)'
    },
});