// src/screens/learn/components/DiscoveryHeader.tsx
import { CyberText } from '@/components/atoms/CyberText';
import { ProgressBar } from '@/components/atoms/ProgressBar';
import { THEME } from '@/theme/theme';
import { StyleSheet, View } from 'react-native';

interface Props {
    phase: 1 | 2;
    progress: number;
    remaining: number;
}

export default function DiscoveryHeader({ phase, progress, remaining }: Props) {
    const phaseTitle = phase === 1 ? "ÉTAPE 1 : IDENTIFICATION" : "ÉTAPE 2 : LOCALISATION";

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <CyberText variant="caps" colorType="secondary" style={{ letterSpacing: 2 }}>
                    {phaseTitle}
                </CyberText>
                <CyberText variant="caps" style={{ color: THEME.colors.primary, fontSize: 10 }}>
                    {remaining} RESTANTS
                </CyberText>
            </View>
            <ProgressBar progress={progress} color={THEME.colors.primary} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.metrics.spacing.lg,
        paddingTop: 60, // Safe Area
        paddingBottom: THEME.metrics.spacing.md,
        backgroundColor: 'rgba(5,5,7,0.9)',
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.glass.border,
        zIndex: 10,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    }
});