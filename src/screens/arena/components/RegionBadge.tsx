// src/screens/arena/components/RegionBadge.tsx
import { CyberText } from '@/components/atoms/CyberText';
import { THEME } from '@/theme/theme';
import { functions } from '@/utils/Functions';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef } from 'react';
import { Animated, Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

const { width } = Dimensions.get('window');
const SPACING = 15;
const CARD_WIDTH = (width - 40 - SPACING) / 2;

interface Props {
    name: string;
    code: string;
    level: 0 | 1 | 2 | 3;
    onPress: () => void;
    isLarge?: boolean;
    isLocked?: boolean;
}

export default function RegionBadge({ name, code, level, onPress, isLarge = false, isLocked = false }: Props) {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleValue, { toValue: 0.96, useNativeDriver: true, speed: 20 }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true, speed: 20 }).start();
    };

    const handleOnPress = () => {
        if (!isLocked) {
            onPress();
        } else {
            showMessage({
                message: "Région verrouillée",
                description: "Complétez les niveaux précédents pour déverrouiller cette région.",
                type: "warning",
                backgroundColor: THEME.colors.background,
                color: THEME.colors.text.primary,
            });
        }
    }

    // --- Typographie des couleurs via le Thème ---
    const borderColor =
        isLocked ? THEME.colors.glass.border :
            level === 0 ? THEME.colors.levels.locked :
                level === 1 ? THEME.colors.levels.bronze :
                    level === 2 ? THEME.colors.levels.silver :
                        THEME.colors.levels.gold;

    // Remplacement du [Black, RealBlack] par notre effet Glass Premium
    const gradientColors =
        isLocked ? [THEME.colors.glass.background, 'transparent'] :
            level === 0 ? ['rgba(255,255,255,0.05)', 'transparent'] :
                level === 1 ? [THEME.colors.levels.bronze + '30', 'transparent'] :
                    level === 2 ? [THEME.colors.levels.silver + '30', 'transparent'] :
                        [THEME.colors.levels.gold + '30', 'transparent'];

    return (
        <Animated.View
            style={[
                styles.wrapper,
                {
                    width: isLarge ? '100%' : CARD_WIDTH,
                    transform: [{ scale: scaleValue }]
                }
            ]}
        >
            <Pressable
                onPress={handleOnPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={{ flex: 1 }}
            >
                {/* Le dégradé Premium qui fond dans l'arrière-plan */}
                <LinearGradient
                    colors={gradientColors as any}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.container, { borderColor, backgroundColor: 'rgba(0,0,0,0.3)' }]}
                >
                    <View style={styles.bgIconContainer}>
                        <Image
                            source={functions.getImageSource(code)}
                            style={[
                                styles.bgIcon,
                                { tintColor: isLocked ? THEME.colors.levels.locked : THEME.colors.text.primary }
                            ]}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.content}>
                        <View style={styles.header}>
                            <View style={[styles.codeTag, { backgroundColor: THEME.colors.glass.background }]}>
                                <CyberText
                                    variant="caps"
                                    style={{ fontSize: 9, fontWeight: '900', letterSpacing: 1, color: isLocked ? THEME.colors.levels.locked : borderColor }}
                                >
                                    {code}
                                </CyberText>
                            </View>

                            {isLocked && (
                                <Image source={functions.getIconSource('lock')} style={{ width: 12, height: 12, tintColor: THEME.colors.levels.locked }} />
                            )}
                        </View>

                        <View style={styles.titleContainer}>
                            <CyberText
                                variant="h2"
                                style={{
                                    color: isLocked ? THEME.colors.text.disabled : THEME.colors.text.primary,
                                    fontSize: isLarge ? 22 : 18,
                                    textAlign: 'left',
                                    letterSpacing: 0.5
                                }}
                            >
                                {name.toUpperCase()}
                            </CyberText>
                        </View>

                        <View style={styles.footer}>
                            {isLocked ? (
                                <CyberText variant="caps" style={{ fontSize: 9, color: THEME.colors.text.disabled, letterSpacing: 2 }}>
                                    ACCESS DENIED
                                </CyberText>
                            ) : (
                                <View style={styles.progressRow}>
                                    <EnergyCell active={level >= 1} color={THEME.colors.levels.bronze} />
                                    <EnergyCell active={level >= 2} color={THEME.colors.levels.silver} />
                                    <EnergyCell active={level >= 3} color={THEME.colors.levels.gold} />
                                </View>
                            )}
                        </View>
                    </View>
                </LinearGradient>
            </Pressable>
        </Animated.View>
    );
}

const EnergyCell = ({ active, color }: { active: boolean, color: string }) => (
    <View style={styles.energyCellWrapper}>
        <View style={[
            styles.energyCell,
            {
                backgroundColor: active ? color : THEME.colors.glass.background,
                shadowColor: active ? color : 'transparent',
                shadowOpacity: active ? 0.8 : 0,
                shadowRadius: 6,
                borderColor: active ? color : 'transparent',
                borderWidth: active ? 0 : 1,
            }
        ]} />
    </View>
);

const styles = StyleSheet.create({
    wrapper: {
        height: 130,
        marginBottom: SPACING,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    container: {
        flex: 1,
        borderRadius: 20,
        borderWidth: 1,
        overflow: 'hidden',
        padding: 12,
    },
    bgIconContainer: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'flex-end',
        overflow: 'hidden',
    },
    bgIcon: { width: '90%', height: '90%', opacity: 0.08, right: -20, top: -20 },
    content: { flex: 1, justifyContent: 'space-between' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    codeTag: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1, borderColor: THEME.colors.glass.border },
    titleContainer: { flex: 1, justifyContent: 'center' },
    footer: { flexDirection: 'row', alignItems: 'flex-end' },
    progressRow: { flexDirection: 'row', gap: 6, width: '100%' },
    energyCellWrapper: { flex: 1, height: 4 },
    energyCell: { flex: 1, borderRadius: 2 }
});