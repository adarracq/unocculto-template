import { MyText } from '@/components/atoms/MyText';
import { THEME } from '@/theme/theme';
import { feedbackService } from '@/utils/feedbackService';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef } from 'react';
import { ActivityIndicator, Animated, Pressable, StyleSheet, View } from 'react-native';

interface MyButtonProps {
    title: string;
    subtitle?: string;
    onPress: () => void;
    variant?: 'default' | 'danger' | 'outline' | 'gradient';
    iconRight?: keyof typeof Ionicons.glyphMap;
    iconLeft?: keyof typeof Ionicons.glyphMap;
    disabled?: boolean;
    loading?: boolean;
    style?: any;
}

export default function MyButton({
    title,
    subtitle,
    onPress,
    variant = 'default',
    iconRight,
    iconLeft,
    disabled = false,
    loading = false,
    style
}: MyButtonProps) {

    // --- ANIMATION ---
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        if (disabled || loading) {
            feedbackService.error();
            return;
        }
        feedbackService.medium();
        Animated.spring(scaleValue, { toValue: 0.96, useNativeDriver: true, speed: 20 }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true, speed: 20 }).start();
    };

    const handlePress = () => {
        if (!disabled && !loading) {
            onPress();
        }
    };
    // -----------------

    const isDanger = variant === 'danger';
    const isGradient = variant === 'gradient';
    const isOutline = variant === 'outline';

    // 1. Couleurs (Texte & Icônes)
    let mainColor: string = THEME.colors.text.primary;
    if (disabled) mainColor = THEME.colors.text.disabled;
    else if (isGradient) mainColor = '#1A1A1A';
    else if (isOutline) mainColor = THEME.colors.primary;
    else if (isDanger) mainColor = THEME.colors.danger;

    const subtitleColor = isGradient ? 'rgba(0,0,0,0.5)' : THEME.colors.text.secondary;

    // 2. Bordures
    const getBorderColor = () => {
        if (disabled) return 'rgba(255, 255, 255, 0.03)';
        if (isGradient) return 'rgba(255, 255, 255, 0.4)';
        if (isOutline) return `${THEME.colors.primary}50`;
        if (isDanger) return `${THEME.colors.danger}40`;
        return 'rgba(255, 255, 255, 0.1)';
    };

    // 3. Fond (Couleur superposée au BlurView)
    const getOverlayBackgroundColor = () => {
        if (disabled) return 'rgba(15, 15, 15, 0.4)';
        if (isOutline) return THEME.colors.glass.background;
        if (isDanger) return `${THEME.colors.danger}10`;
        return 'rgba(255, 255, 255, 0.05)';
    };

    return (
        <Animated.View style={[{ transform: [{ scale: scaleValue }], width: '100%' }, style]}>
            <Pressable
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[
                    styles.container,
                    {
                        borderColor: getBorderColor(),
                        // 💡 ASTUCE : Pour le bouton Gradient, on donne une couleur de fond pleine au parent
                        // Cela permet à Android de calculer l'ombre (glow) sans faire de bloc gris !
                        backgroundColor: isGradient && !disabled ? THEME.colors.primary : 'transparent'
                    },
                    isGradient && !disabled && styles.glowPrimary
                ]}
            >
                {/* Calque de fond avec overflow hidden pour respecter les coins */}
                <View style={styles.backgroundLayer}>
                    {isGradient && !disabled ? (
                        <LinearGradient
                            colors={[THEME.colors.primary, '#D4AF37']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={StyleSheet.absoluteFill}
                        />
                    ) : (
                        <BlurView
                            intensity={disabled ? 10 : 25}
                            tint="dark"
                            style={StyleSheet.absoluteFill}
                        />
                    )}

                    {!isGradient && (
                        <View style={[StyleSheet.absoluteFill, { backgroundColor: getOverlayBackgroundColor() }]} />
                    )}
                </View>

                {/* Contenu du bouton */}
                <View style={styles.contentContainer}>
                    {loading ? (
                        <ActivityIndicator color={mainColor} size="small" />
                    ) : (
                        <>
                            <View style={styles.leftGroup}>
                                {iconLeft && (
                                    <View style={[styles.iconWrapper, { backgroundColor: isGradient ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)' }]}>
                                        <Ionicons name={iconLeft} size={18} color={mainColor} />
                                    </View>
                                )}
                                <View style={styles.textWrapper}>
                                    <MyText variant="caps" style={{ color: mainColor, fontSize: 13, letterSpacing: 1.2, fontWeight: '600' }}>
                                        {title}
                                    </MyText>
                                    {subtitle && (
                                        <MyText variant="bodySmall" style={{ color: subtitleColor, marginTop: 4, fontSize: 11 }}>
                                            {subtitle}
                                        </MyText>
                                    )}
                                </View>
                            </View>

                            {iconRight && (
                                <Ionicons name={iconRight} size={20} color={mainColor} style={{ opacity: 0.8 }} />
                            )}
                        </>
                    )}
                </View>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 60,
        borderRadius: THEME.metrics.radius.md,
        borderWidth: 1,
    },
    backgroundLayer: {
        ...StyleSheet.absoluteFill,
        borderRadius: THEME.metrics.radius.md,
        overflow: 'hidden',
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    leftGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconWrapper: {
        width: 36,
        height: 36,
        borderRadius: THEME.metrics.radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    textWrapper: {
        justifyContent: 'center',
        flex: 1,
    },
    // Ombre réservée EXCLUSIVEMENT au bouton gradient (car il est opaque)
    glowPrimary: {
        shadowColor: THEME.colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    }
});