import { CyberText } from '@/components/atoms/CyberText';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
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
    title, subtitle, onPress, variant = 'default', iconRight, iconLeft, disabled = false, loading = false, style
}: MyButtonProps) {

    const isDanger = variant === 'danger';
    const isGradient = variant === 'gradient';
    const isOutline = variant === 'outline';

    // 1. Détermination de la couleur principale (Texte & Icônes)
    let mainColor: string = THEME.colors.text.primary;
    if (disabled) mainColor = THEME.colors.text.disabled;
    else if (isGradient) mainColor = THEME.colors.background; // Texte noir/sombre sur fond or/primaire
    else if (isOutline) mainColor = THEME.colors.primary;
    else if (isDanger) mainColor = THEME.colors.danger;

    // 2. Couleurs de fond et de bordure
    const borderColor = disabled ? 'rgba(255,255,255,0.05)' :
        isGradient ? 'transparent' :
            isOutline ? THEME.colors.primary + '80' :
                isDanger ? THEME.colors.danger + '60' :
                    'rgba(255,255,255,0.15)';

    const bgColor = disabled ? 'rgba(255,255,255,0.01)' :
        isGradient ? 'transparent' : // La couleur de fond est gérée par le LinearGradient
            isOutline ? 'rgba(255,255,255,0.02)' :
                isDanger ? THEME.colors.danger + '15' :
                    'rgba(255,255,255,0.03)';

    // Couleur spécifique pour le sous-titre si fond gradient (pour rester lisible)
    const subtitleColor = isGradient ? 'rgba(0,0,0,0.6)' : THEME.colors.text.secondary;

    return (
        <TouchableOpacity
            activeOpacity={disabled || loading ? 1 : 0.7}
            onPress={disabled || loading ? undefined : onPress}
            style={[
                styles.button,
                { borderColor, backgroundColor: bgColor },
                isGradient && !disabled && styles.glowPrimary,
                style
            ]}
        >
            {/* Dégradé en arrière-plan pour la variante "gradient" */}
            {isGradient && !disabled && (
                <LinearGradient
                    colors={[THEME.colors.primary, '#A68A2C']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />
            )}

            {loading ? (
                <ActivityIndicator color={mainColor} size="small" style={{ flex: 1 }} />
            ) : (
                <>
                    <View style={styles.leftContent}>
                        {iconLeft && <Ionicons name={iconLeft} size={20} color={mainColor} style={styles.iconLeft} />}
                        <View>
                            <CyberText variant="caps" style={{ color: mainColor, fontSize: 14, letterSpacing: 1.5 }}>
                                {title}
                            </CyberText>
                            {subtitle && (
                                <CyberText variant="bodySmall" style={{ color: subtitleColor, marginTop: 2 }}>
                                    {subtitle}
                                </CyberText>
                            )}
                        </View>
                    </View>

                    {iconRight && <Ionicons name={iconRight} size={20} color={mainColor} />}
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        minHeight: 64, // Hauteur confortable
        borderRadius: 16,
        borderWidth: 1,
        width: '100%',
        overflow: 'hidden', // Crucial pour que le LinearGradient respecte les coins arrondis
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconLeft: {
        marginRight: 16,
    },
    glowPrimary: {
        shadowColor: THEME.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    }
});