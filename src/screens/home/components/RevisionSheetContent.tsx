import { CyberText } from '@/components/atoms/CyberText';
import MyButton from '@/components/atoms/MyButton';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

interface Props {
    urgentCount: number;
    consolidationCount: number;
    masteredCount: number;
    onStartRevision: () => void;
}

export default function RevisionSheetContent({ urgentCount, consolidationCount, masteredCount, onStartRevision }: Props) {
    return (
        <View style={styles.container}>

            <View style={styles.statsContainer}>
                <View style={styles.statRow}>
                    <View style={styles.iconBoxDanger}>
                        <Ionicons name="warning" size={20} color={THEME.colors.danger} />
                    </View>
                    <View style={styles.textBlock}>
                        <CyberText variant="h2" style={{ color: THEME.colors.text.primary }}>MÉMOIRE CRITIQUE</CyberText>
                        <CyberText variant="bodySmall" colorType="disabled">Risque de perte rapide.</CyberText>
                    </View>
                    <CyberText variant="h1" style={{ color: THEME.colors.danger }}>{urgentCount}</CyberText>
                </View>

                <View style={styles.divider} />

                <View style={styles.statRow}>
                    <View style={styles.iconBoxPrimary}>
                        <Ionicons name="sync" size={20} color={THEME.colors.secondary} />
                    </View>
                    <View style={styles.textBlock}>
                        <CyberText variant="h2" style={{ color: THEME.colors.text.primary }}>EN CONSOLIDATION</CyberText>
                        <CyberText variant="bodySmall" colorType="disabled">Apprentissage en cours.</CyberText>
                    </View>
                    <CyberText variant="h2" style={{ color: THEME.colors.secondary }}>{consolidationCount}</CyberText>
                </View>

                <View style={styles.divider} />

                <View style={styles.statRow}>
                    <View style={styles.iconBoxSuccess}>
                        <Ionicons name="shield-checkmark" size={20} color={THEME.colors.success} />
                    </View>
                    <View style={styles.textBlock}>
                        <CyberText variant="h2" style={{ color: THEME.colors.text.primary }}>MAÎTRISE TOTALE</CyberText>
                        <CyberText variant="bodySmall" colorType="disabled"> Mémoire solide.</CyberText>
                    </View>
                    <CyberText variant="h2" style={{ color: THEME.colors.success }}>{masteredCount}</CyberText>
                </View>
            </View>

            <View style={styles.actionContainer}>
                <MyButton
                    title={urgentCount > 0 ? "RÉVISER MAINTENANT" : "RÉVISER"}
                    variant={urgentCount > 0 ? 'danger' : 'default'}
                    iconRight={urgentCount > 0 ? 'arrow-forward' : "checkmark-done"}
                    disabled={urgentCount === 0}
                    onPress={onStartRevision}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { paddingTop: 10, paddingBottom: 10 },
    statsContainer: { backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 16, borderWidth: 1, borderColor: THEME.colors.glass.border, padding: 16, marginBottom: 24 },
    statRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    textBlock: { flex: 1 },
    divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginVertical: 16 },
    iconBoxDanger: { width: 40, height: 40, borderRadius: 12, backgroundColor: THEME.colors.danger + '15', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: THEME.colors.danger + '40' },
    iconBoxPrimary: { width: 40, height: 40, borderRadius: 12, backgroundColor: THEME.colors.secondary + '15', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: THEME.colors.secondary + '40' },
    iconBoxSuccess: { width: 40, height: 40, borderRadius: 12, backgroundColor: THEME.colors.success + '15', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: THEME.colors.success + '40' },
    actionContainer: { marginTop: 8 }
});