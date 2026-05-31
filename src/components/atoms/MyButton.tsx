import { CyberText } from '@/components/atoms/CyberText';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';

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

    const isDanger = variant === 'danger';
    const isGradient = variant === 'gradient';
    const isOutline = variant === 'outline';

    // 1. Détermination des couleurs (Texte & Icônes)
    let mainColor: string = THEME.colors.text.primary;
    if (disabled) mainColor = THEME.colors.text.disabled;
    else if (isGradient) mainColor = '#1A1A1A'; // Texte sombre sur fond lumineux pour un look premium
    else if (isOutline) mainColor = THEME.colors.primary;
    else if (isDanger) mainColor = THEME.colors.danger;

    const subtitleColor = isGradient ? 'rgba(0,0,0,0.5)' : THEME.colors.text.secondary;

    // 2. Styles dynamiques pour les bordures
    const getBorderColor = () => {
        if (disabled) return 'rgba(255, 255, 255, 0.03)';
        if (isGradient) return 'rgba(255, 255, 255, 0.4)'; // Bordure claire subtile sur le gradient
        if (isOutline) return `${THEME.colors.primary}50`;
        if (isDanger) return `${THEME.colors.danger}40`;
        return 'rgba(255, 255, 255, 0.1)'; // Bordure "verre" classique
    };

    // 3. Choix du fond (Couleur superposée au BlurView)
    const getOverlayBackgroundColor = () => {
        if (disabled) return 'rgba(15, 15, 15, 0.4)';
        if (isOutline) return THEME.colors.glass.background;
        if (isDanger) return `${THEME.colors.danger}10`;
        return 'rgba(255, 255, 255, 0.05)'; // Léger voile blanc pour le glassmorphism
    };

    return (
        <TouchableOpacity
            activeOpacity={disabled || loading ? 1 : 0.75}
            onPress={disabled || loading ? undefined : onPress}
            style={[
                styles.container,
                { borderColor: getBorderColor() },
                isGradient && !disabled && styles.glowPrimary,
                style
            ]}
        >
            {/* Arrière-plan : Gradient OU Effet Verre (Blur) */}
            {isGradient && !disabled ? (
                <LinearGradient
                    colors={[THEME.colors.primary, '#D4AF37']} // Couleurs or/premium plus douces
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />
            ) : (
                <BlurView
                    intensity={disabled ? 10 : 25} // Flou plus léger si désactivé
                    tint="dark"
                    style={StyleSheet.absoluteFill}
                />
            )}

            {/* Couche de superposition pour ajuster la teinte du verre */}
            {!isGradient && (
                <View style={[StyleSheet.absoluteFill, { backgroundColor: getOverlayBackgroundColor() }]} />
            )}

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
                                <CyberText variant="caps" style={{ color: mainColor, fontSize: 13, letterSpacing: 1.2, fontWeight: '600' }}>
                                    {title}
                                </CyberText>
                                {subtitle && (
                                    <CyberText variant="bodySmall" style={{ color: subtitleColor, marginTop: 4, fontSize: 11 }}>
                                        {subtitle}
                                    </CyberText>
                                )}
                            </View>
                        </View>

                        {iconRight && (
                            <Ionicons name={iconRight} size={20} color={mainColor} style={{ opacity: 0.8 }} />
                        )}
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 60,
        borderRadius: 20, // Courbure plus douce (style iOS)
        borderWidth: 1,
        overflow: 'hidden', // Empêche le Blur/Gradient de déborder des coins arrondis

        // Base d'ombre subtile pour détacher le bouton du fond
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
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
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
        // Petite bordure interne pour l'icône (détail premium)
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    textWrapper: {
        justifyContent: 'center',
        flex: 1,
    },
    glowPrimary: {
        shadowColor: THEME.colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    }
});