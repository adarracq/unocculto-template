// src/screens/arena/components/RegionBadge.tsx
import { MyText } from '@/components/atoms/MyText';
import { THEME } from '@/theme/theme';
import { feedbackService } from '@/utils/feedbackService';
import { functions } from '@/utils/Functions';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef } from 'react';
import { Animated, Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

const { width } = Dimensions.get('window');
const SPACING = THEME.metrics.spacing.md;
const HORIZONTAL_PADDING = THEME.paddings.horizontal;
const CARD_WIDTH = (width - (HORIZONTAL_PADDING * 2) - SPACING) / 2;

interface Props {
    name: string;
    code: string;
    completedLevels: number;
    totalLevels: number;
    themeColor?: string;
    onPress: () => void;
    isLarge?: boolean;
    isLocked?: boolean;
}

// 💡 Helper pour générer des opacités Hexadécimales dynamiques (ex: 0.5 -> "80")
const getAlphaHex = (opacity: number) => {
    const alpha = Math.round(opacity * 255);
    return alpha.toString(16).padStart(2, '0').toUpperCase();
};

export default function RegionBadge({ name, code, completedLevels, totalLevels, themeColor = THEME.colors.primary, onPress, isLarge = false, isLocked = false }: Props) {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleValue, { toValue: 0.94, useNativeDriver: true, speed: 20 }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true, speed: 20 }).start();
    };

    const handleOnPress = () => {
        if (!isLocked) {
            feedbackService.medium();
            onPress();
        } else {
            feedbackService.error();
            showMessage({
                message: "Région verrouillée",
                description: "Complétez les niveaux précédents pour déverrouiller cette région.",
                type: "warning",
                icon: 'warning',
                backgroundColor: THEME.colors.backgroundLight,
                color: THEME.colors.text.primary,
            });
        }
    }

    const isFullyCompleted = completedLevels === totalLevels;
    const isStarted = completedLevels > 0;

    // 💡 Ratio de progression (De 0.0 à 1.0)
    const progressRatio = completedLevels / totalLevels;

    // --- Configuration Visuelle INTENSE ---
    const getThemeConfig = () => {
        if (isLocked) {
            return {
                border: THEME.colors.glass.background,
                gradient: [THEME.colors.glass.background, 'rgba(0, 0, 0, 0.8)'],
                titleColor: THEME.colors.text.disabled,
                tagBg: THEME.colors.glass.background,
                tagText: THEME.colors.text.disabled,
                bgIconOpacity: 0.03,
                glow: null,
            };
        }

        if (!isStarted) {
            // Niveau 0 : Neutre, Gris/Verre pur
            return {
                border: THEME.colors.glass.borderHighlight,
                gradient: [THEME.colors.glass.border, 'transparent'],
                titleColor: THEME.colors.text.primary,
                tagBg: THEME.colors.glass.background,
                tagText: THEME.colors.text.primary,
                bgIconOpacity: 0.05,
                glow: null,
            };
        }

        if (isFullyCompleted) {
            // Maîtrise Totale : 100% Puissance, Énorme Néon
            return {
                border: themeColor,
                gradient: [`${themeColor}45`, 'transparent'],
                titleColor: THEME.colors.text.primary,
                tagBg: `${themeColor}35`,
                tagText: themeColor,
                bgIconOpacity: 0.15,
                glow: {
                    shadowColor: themeColor,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.7,
                    shadowRadius: 16,
                    elevation: 10,
                }
            };
        }

        // 💡 PROGRESSION DYNAMIQUE (De 1/5 à 4/5)
        // Plus le joueur avance, plus l'opacité des bordures, du fond et du néon augmente !
        const dynamicBorderOpacity = 0.3 + (0.5 * progressRatio); // De 40% (1/5) à 70% (4/5)
        const dynamicBgOpacity = 0.05 + (0.25 * progressRatio);   // De 10% (1/5) à 25% (4/5)
        const dynamicTagOpacity = 0.15 + (0.15 * progressRatio);  // De 18% (1/5) à 27% (4/5)
        const dynamicIconOpacity = 0.05 + (0.05 * progressRatio); // L'icône de fond ressort peu à peu

        return {
            border: `${themeColor}${getAlphaHex(dynamicBorderOpacity)}`,
            gradient: [`${themeColor}${getAlphaHex(dynamicBgOpacity)}`, 'transparent'],
            titleColor: THEME.colors.text.primary,
            tagBg: `${themeColor}${getAlphaHex(dynamicTagOpacity)}`,
            tagText: themeColor,
            bgIconOpacity: dynamicIconOpacity,
            glow: {
                // Le néon commence à apparaître timidement sur la fin
                shadowColor: themeColor,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.25 * progressRatio, // Très faible au début, visible à 4/5
                shadowRadius: 10 * progressRatio,
                elevation: 4 * progressRatio,
            },
        };
    };

    const config = getThemeConfig();

    return (
        <Animated.View
            style={[
                styles.wrapper,
                {
                    width: isLarge ? '100%' : CARD_WIDTH,
                    transform: [{ scale: scaleValue }],
                    opacity: isLocked ? 0.6 : 1,
                },
                config.glow
            ]}
        >
            <Pressable
                onPress={handleOnPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={{ flex: 1 }}
            >
                <LinearGradient
                    colors={config.gradient as any}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.container, { borderColor: config.border, backgroundColor: 'rgba(0,0,0,0.4)' }]}
                >
                    <View style={styles.bgIconContainer}>
                        <Image
                            source={functions.getImageSource(code)}
                            style={[
                                styles.bgIcon,
                                {
                                    tintColor: THEME.colors.text.primary,
                                    opacity: config.bgIconOpacity // 💡 Opacité dynamique
                                }
                            ]}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.content}>
                        <View style={styles.header}>
                            <View style={[styles.codeTag, { backgroundColor: config.tagBg, borderColor: config.border }]}>
                                <MyText
                                    variant="caps"
                                    style={{ fontSize: 9, letterSpacing: 1, color: config.tagText }}
                                >
                                    {code}
                                </MyText>
                            </View>

                            {isLocked && (
                                <Ionicons name="lock-closed" size={14} color={THEME.colors.text.disabled} />
                            )}
                        </View>

                        <View style={styles.titleContainer}>
                            <MyText
                                variant="h2"
                                style={{
                                    color: config.titleColor,
                                    textAlign: 'left',
                                    letterSpacing: 0.5
                                }}
                            >
                                {name.toUpperCase()}
                            </MyText>
                        </View>

                        <View style={styles.footer}>
                            {isLocked ? (
                                <MyText variant="caps" style={{ fontSize: 9, color: THEME.colors.text.disabled, letterSpacing: 2 }}>
                                    ACCÈS RESTREINT
                                </MyText>
                            ) : (
                                <View style={styles.progressRow}>
                                    {Array.from({ length: totalLevels }).map((_, index) => (
                                        <EnergyCell
                                            key={index}
                                            active={index < completedLevels}
                                            color={themeColor}
                                            isStarted={isStarted}
                                            isFullyCompleted={isFullyCompleted}
                                        />
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>
                </LinearGradient>
            </Pressable>
        </Animated.View>
    );
}

// --- SOUS COMPOSANT ENERGY CELL ---
const EnergyCell = ({ active, color, isStarted, isFullyCompleted }: { active: boolean, color: string, isStarted: boolean, isFullyCompleted: boolean }) => {
    const cellBorder = active ? color : (isStarted ? `${color}30` : THEME.colors.glass.borderHighlight);

    const cellBg = active ? color : THEME.colors.glass.background;
    const glowOpacity = active ? (isFullyCompleted ? 1 : 0.6) : 0;
    const glowRadius = isFullyCompleted ? 8 : 4;

    return (
        <View style={styles.energyCellWrapper}>
            <View style={[
                styles.energyCell,
                {
                    backgroundColor: cellBg,
                    shadowColor: active ? color : 'transparent',
                    shadowOpacity: glowOpacity,
                    shadowRadius: glowRadius,
                    borderColor: cellBorder,
                    borderWidth: 1,
                }
            ]} />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 130,
        marginBottom: SPACING,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
    },
    container: {
        flex: 1,
        borderRadius: THEME.metrics.radius.md,
        borderWidth: 1,
        overflow: 'hidden',
        padding: THEME.metrics.spacing.md,
    },
    bgIconContainer: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'flex-end',
        overflow: 'hidden',
    },
    bgIcon: {
        width: '100%',
        height: '100%',
        right: -30,
        top: -10
    },
    content: {
        flex: 1,
        justifyContent: 'space-between'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    codeTag: {
        paddingHorizontal: THEME.metrics.spacing.sm,
        paddingVertical: THEME.metrics.spacing.xs,
        borderRadius: 6,
        borderWidth: 1,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        minHeight: 12,
    },
    progressRow: {
        flexDirection: 'row',
        gap: THEME.metrics.spacing.sm,
        width: '100%'
    },
    energyCellWrapper: {
        flex: 1,
        height: 5
    },
    energyCell: {
        flex: 1,
        borderRadius: THEME.metrics.radius.round
    }
});