// src/components/molecules/ScreenHeader.tsx
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View, type ViewStyle } from 'react-native';
import { CyberText } from '../atoms/CyberText';

interface ScreenHeaderProps {
    title: string;
    subtitle?: string;
    titleColor?: string;
    align?: 'left' | 'right' | 'center';
    style?: ViewStyle;
}

export function ScreenHeader({ title, subtitle, titleColor, align = 'left', style }: ScreenHeaderProps) {
    const router = useRouter();

    const isCenter = align === 'center';
    const isRight = align === 'right';

    return (
        <View style={[styles.container, isRight && styles.rowReverse, style]}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={THEME.colors.text.primary} />
            </TouchableOpacity>

            <View style={[
                styles.textContainer,
                isCenter && styles.centerAlign,
                isRight && styles.rightAlign
            ]}>
                {subtitle && (
                    <CyberText variant="caps" colorType="secondary" style={styles.subtitle}>
                        {subtitle}
                    </CyberText>
                )}
                <CyberText variant="h1" style={{ color: titleColor || THEME.colors.text.primary }}>
                    {title}
                </CyberText>
            </View>

            {isCenter && <View style={styles.backButtonPlaceholder} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: THEME.metrics.spacing.lg,
        paddingTop: 60,
        paddingBottom: THEME.metrics.spacing.md,
        width: '100%',
    },
    rowReverse: { flexDirection: 'row-reverse' },
    backButton: { width: 40, height: 40, justifyContent: 'center' },
    backButtonPlaceholder: { width: 40 },
    textContainer: { flex: 1 },
    centerAlign: { alignItems: 'center' },
    rightAlign: { alignItems: 'flex-end' },
    subtitle: { fontSize: 10, marginBottom: 2, letterSpacing: 2 },
});