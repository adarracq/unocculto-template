// src/components/atoms/ProgressBar.tsx
import { THEME } from '@/theme/theme';
import { StyleSheet, View, type ViewStyle } from 'react-native';

interface ProgressBarProps {
    progress: number; // Valeur flottante entre 0 et 1 (ex: 0.5 = 50%)
    color?: string;
    style?: ViewStyle;
}

export function ProgressBar({ progress, color = THEME.colors.primary, style }: ProgressBarProps) {
    const clampedProgress = Math.max(0, Math.min(1, progress));

    return (
        <View style={[styles.track, style]}>
            <View
                style={[
                    styles.filled,
                    {
                        width: `${clampedProgress * 100}%`,
                        backgroundColor: color,
                        shadowColor: color,
                    }
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    track: {
        height: 6,
        width: '100%',
        backgroundColor: THEME.colors.glass.border,
        borderRadius: 3,
        overflow: 'hidden',
    },
    filled: {
        height: '100%',
        borderRadius: 3,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 2,
    },
});