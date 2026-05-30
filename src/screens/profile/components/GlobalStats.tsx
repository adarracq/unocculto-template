import { CyberText } from '@/components/atoms/CyberText';
import { THEME } from '@/theme/theme';
import { StyleSheet, View } from 'react-native';

interface Props {
    visited: number;
    total: number;
    mastered: number;
    urgent: number;
}

export default function GlobalStats({ visited, total, mastered, urgent }: Props) {
    return (
        <View style={styles.container}>
            {/* BLOC 1 : EXPLORÉS */}
            <View style={styles.statBox}>
                <CyberText variant="h1" style={{ fontSize: 20 }}>
                    {visited}/{total}
                </CyberText>
                <CyberText variant="caps" style={styles.label}>
                    PAYS DÉCOUVERTS
                </CyberText>
            </View>

            <View style={styles.verticalDivider} />

            {/* BLOC 2 : MAÎTRISÉS */}
            <View style={styles.statBox}>
                <CyberText variant="h1" style={{ fontSize: 20, color: THEME.colors.success }}>
                    {mastered}/{total}
                </CyberText>
                <CyberText variant="caps" style={[styles.label, { color: THEME.colors.success }]}>
                    100% MAÎTRISÉS
                </CyberText>
            </View>

            <View style={styles.verticalDivider} />

            {/* BLOC 3 : RÉVISIONS */}
            <View style={styles.statBox}>
                <CyberText variant="h1" style={{ fontSize: 20, color: urgent > 0 ? THEME.colors.danger : THEME.colors.text.primary }}>
                    {urgent}
                </CyberText>
                <CyberText variant="caps" style={[styles.label, urgent > 0 && { color: THEME.colors.danger }]}>
                    À RÉVISER
                </CyberText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: 16,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    statBox: {
        alignItems: 'center',
        flex: 1,
        gap: 4
    },
    label: {
        fontSize: 9,
        color: THEME.colors.text.secondary,
        letterSpacing: 0.5
    },
    verticalDivider: {
        width: 1,
        height: '60%',
        backgroundColor: 'rgba(255,255,255,0.05)'
    },
});