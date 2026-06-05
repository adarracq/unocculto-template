import { MyText } from '@/components/atoms/MyText';
import { THEME } from '@/theme/theme';
import { feedbackService } from '@/utils/feedbackService';
import { ChevronRight, Crosshair, Flag, Globe, Lock, MapPin, Waves } from 'lucide-react-native';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';

interface SelectorProps {
    onSelect: (mode: 'country' | 'flag' | 'capital') => void;
}

export default function TrainingSelector({ onSelect }: SelectorProps) {
    return (
        <View style={styles.container}>
            <MyText variant="caps" colorType="secondary" style={styles.title}>
                CENTRE D'ENTRAÎNEMENT
            </MyText>

            <View style={styles.grid}>
                <TrainingCard
                    title="PAYS"
                    subtitle="Localisation"
                    Icon={Globe}
                    themeColor={THEME.colors.modes.country}
                    onPress={() => onSelect('country')}
                />
                <TrainingCard
                    title="DRAPEAUX"
                    subtitle="Identification"
                    Icon={Flag}
                    themeColor={THEME.colors.modes.flag}
                    onPress={() => onSelect('flag')}
                />
                <TrainingCard
                    title="CAPITALES"
                    subtitle="Connaissances"
                    Icon={MapPin}
                    themeColor={THEME.colors.modes.capital}
                    onPress={() => onSelect('capital')}
                />
                <TrainingCard
                    title="VILLES"
                    subtitle="Placer"
                    Icon={Crosshair}
                    themeColor={THEME.colors.levels.bronze} // Orange
                    onPress={() => { }}
                    isLocked={true}
                />
                <TrainingCard
                    title="EAUX"
                    subtitle="Retrouver"
                    Icon={Waves}
                    themeColor={THEME.colors.inProgress} // Bleu ciel
                    onPress={() => { }}
                    isLocked={true}
                />
            </View>
        </View>
    );
}

const TrainingCard = ({ title, subtitle, Icon, themeColor, onPress, isLocked }: any) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    // 💡 Couleur dynamique : Gris si verrouillé, Couleur du mode si actif
    const activeColor = isLocked ? THEME.colors.text.disabled : themeColor;

    const handlePressIn = () => {
        if (!isLocked) feedbackService.medium();
        else feedbackService.error();

        Animated.spring(scaleValue, { toValue: 0.96, useNativeDriver: true, speed: 20 }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true, speed: 20 }).start();
    };

    const handlePress = () => {
        if (!isLocked && onPress) onPress();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleValue }], width: '100%' }}>
            <Pressable
                style={[styles.card, isLocked && { opacity: 0.6 }]} // Légèrement moins transparent pour lire "Verrouillé"
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                {/* 1. Fond type Glass neutre (On garde l'élégance monochrome ici) */}
                <View style={styles.glassBg} />

                {/* 2. Bloc Icône coloré façon HUD */}
                <View style={[
                    styles.iconBox,
                    {
                        backgroundColor: isLocked ? 'transparent' : `${themeColor}15`,
                        borderColor: isLocked ? 'transparent' : `${themeColor}30`
                    }
                ]}>
                    <Icon size={20} color={activeColor} strokeWidth={2} />
                </View>

                {/* 3. Textes */}
                <View style={styles.textGroup}>
                    <MyText
                        variant="h3"
                        style={{ color: isLocked ? THEME.colors.text.disabled : THEME.colors.text.primary, letterSpacing: 0.5 }}
                    >
                        {title}
                    </MyText>
                    <MyText variant="bodySmall" colorType="secondary">
                        {subtitle}
                    </MyText>
                </View>

                {/* 4. Icône d'action */}
                {isLocked ? (
                    <Lock size={18} color={THEME.colors.text.disabled} strokeWidth={2} />
                ) : (
                    <ChevronRight size={20} color={THEME.colors.text.primary} strokeWidth={2} style={{ opacity: 0.8 }} />
                )}
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    title: {
        marginBottom: THEME.metrics.spacing.md,
        marginLeft: THEME.metrics.spacing.sm,
        letterSpacing: 1,
    },
    grid: {
        gap: THEME.metrics.spacing.sm
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 74,
        paddingHorizontal: THEME.metrics.spacing.md,
        borderRadius: THEME.metrics.radius.md,
        overflow: 'hidden',
    },
    glassBg: {
        ...StyleSheet.absoluteFill,
        backgroundColor: THEME.colors.glass.background,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
        borderRadius: THEME.metrics.radius.md,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: THEME.metrics.radius.sm,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: THEME.metrics.spacing.md,
    },
    textGroup: {
        flex: 1,
        justifyContent: 'center',
        gap: 2
    }
});