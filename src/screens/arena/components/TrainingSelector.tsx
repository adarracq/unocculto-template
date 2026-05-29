import { CyberText } from '@/components/atoms/CyberText';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';

interface SelectorProps {
    onSelect: (mode: 'country' | 'flag' | 'capital') => void;
}

export default function TrainingSelector({ onSelect }: SelectorProps) {
    return (
        <View style={styles.container}>
            <CyberText variant="caps" colorType="secondary" style={styles.title}>
                CENTRE D'ENTRAÎNEMENT
            </CyberText>

            <View style={styles.grid}>
                <TrainingCard
                    title="PAYS"
                    subtitle="Localisation"
                    icon="earth"
                    color="#4A90E2" // Bleu
                    onPress={() => onSelect('country')}
                />
                <TrainingCard
                    title="DRAPEAUX"
                    subtitle="Identification"
                    icon="flag"
                    color="#E24A4A" // Rouge
                    onPress={() => onSelect('flag')}
                />
                <TrainingCard
                    title="CAPITALES"
                    subtitle="Connaissances"
                    icon="business"
                    color="#4AE290" // Vert
                    onPress={() => onSelect('capital')}
                />
            </View>
        </View>
    );
}

const TrainingCard = ({ title, subtitle, icon, color, onPress }: any) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleValue, { toValue: 0.96, useNativeDriver: true, speed: 20 }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true, speed: 20 }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleValue }], width: '100%' }}>
            <Pressable
                style={styles.card}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                {/* Fond type Glass */}
                <View style={[styles.glassBg, { borderColor: color + '40' }]} />

                <View style={[styles.iconBox, { backgroundColor: color + '20' }]}>
                    <Ionicons name={icon} size={20} color={color} />
                </View>

                <View style={styles.textGroup}>
                    <CyberText variant="body" style={{ fontWeight: 'bold' }}>{title}</CyberText>
                    <CyberText variant="bodySmall" colorType="secondary">{subtitle}</CyberText>
                </View>

                <Ionicons name="chevron-forward" size={16} color={color} />
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: THEME.metrics.spacing.xl },
    title: { marginBottom: THEME.metrics.spacing.md, marginLeft: 4 },
    grid: { gap: 12 },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        paddingHorizontal: THEME.metrics.spacing.md,
        borderRadius: THEME.metrics.radius.md,
        overflow: 'hidden',
    },
    glassBg: {
        ...StyleSheet.absoluteFill,
        backgroundColor: THEME.colors.glass.background,
        borderWidth: 1,
        borderRadius: THEME.metrics.radius.md,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: THEME.metrics.spacing.md,
    },
    textGroup: { flex: 1, gap: 2 }
});