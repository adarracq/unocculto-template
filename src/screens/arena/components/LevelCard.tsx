import { CyberText } from '@/components/atoms/CyberText';
import { THEME } from '@/theme/theme';
import { functions } from '@/utils/Functions';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, View } from 'react-native';

interface Props {
    level: number;
    title: string;
    subTitle: string;
    color: string;
    isLocked: boolean;
    bestTime?: string;     // Ex: "00:15"
    bestAccuracy?: number; // Ex: 100
    onPress: () => void;
}

export default function LevelCard({ level, title, subTitle, color, isLocked, bestTime, bestAccuracy, onPress }: Props) {
    const scaleValue = useRef(new Animated.Value(1)).current;

    // Récupération des couleurs depuis le THEME global
    const getActiveColor = () => {
        switch (level) {
            case 1: return THEME.colors.levels.bronze;
            case 2: return THEME.colors.levels.silver;
            case 3: return THEME.colors.levels.gold;
            default: return color || THEME.colors.primary;
        }
    };

    const activeColor = getActiveColor();
    const roman = ['I', 'II', 'III', 'IV', 'V'][level - 1] || `${level}`;

    const handlePressIn = () => {
        // functions.vibrate(isLocked ? 'small-error' : 'small-success');
        Animated.spring(scaleValue, { toValue: 0.98, useNativeDriver: true, speed: 20 }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true, speed: 20 }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleValue }], width: '100%', marginBottom: 12 }}>
            <Pressable
                onPress={isLocked ? undefined : onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={isLocked}
                style={styles.container}
            >
                <LinearGradient
                    colors={isLocked
                        ? [THEME.colors.glass.background, 'transparent']
                        : [activeColor + '30', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                        styles.gradient,
                        {
                            borderColor: isLocked ? THEME.colors.glass.border : activeColor,
                            backgroundColor: 'rgba(0,0,0,0.3)' // Assure un fond sombre et OLED-friendly
                        }
                    ]}
                >
                    {/* --- ICONE (Numéro ou Cadenas) --- */}
                    <View style={[styles.iconBox, { backgroundColor: isLocked ? THEME.colors.glass.background : activeColor + '20' }]}>
                        {isLocked ? (
                            <Image
                                source={functions.getIconSource('lock')}
                                style={{ width: 16, height: 16, tintColor: THEME.colors.levels.locked }}
                            />
                        ) : (
                            <CyberText variant="h2" style={{ color: activeColor }}>{roman}</CyberText>
                        )}
                    </View>

                    {/* --- TEXTES & STATS --- */}
                    <View style={{ flex: 1 }}>
                        <View style={styles.headerRow}>
                            <CyberText
                                variant="h2"
                                style={{ color: isLocked ? THEME.colors.text.disabled : THEME.colors.text.primary, fontSize: 18 }}
                            >
                                {title}
                            </CyberText>
                            {!isLocked && (
                                <View style={[styles.badge, { backgroundColor: activeColor }]}>
                                    <CyberText
                                        variant="caps"
                                        style={{ fontSize: 9, color: THEME.colors.background, fontWeight: '900' }}
                                    >
                                        {subTitle}
                                    </CyberText>
                                </View>
                            )}
                        </View>

                        {/* --- LIGNE DE STATUT / RECORD --- */}
                        <View style={{ marginTop: 4 }}>
                            {isLocked ? (
                                <CyberText variant="caps" style={[styles.statusText, { color: THEME.colors.text.disabled }]}>
                                    VERROUILLÉ
                                </CyberText>
                            ) : !bestTime ? (
                                <CyberText variant="caps" style={[styles.statusText, { color: THEME.colors.text.secondary }]}>
                                    NON COMPLÉTÉ
                                </CyberText>
                            ) : (
                                // AFFICHE LES STATS AVEC ICONES
                                <View style={styles.statsRow}>
                                    <CyberText variant="caps" style={[styles.statText, { color: THEME.colors.text.secondary }]}>
                                        RECORD
                                    </CyberText>

                                    {/* Précision (Target) */}
                                    {bestAccuracy !== undefined && (
                                        <View style={styles.statTag}>
                                            <Image
                                                source={functions.getIconSource('target')}
                                                style={[styles.statIcon, { tintColor: THEME.colors.text.secondary }]}
                                            />
                                            <CyberText variant="bodySmall" style={[styles.statText, { color: THEME.colors.text.secondary }]}>
                                                {bestAccuracy}%
                                            </CyberText>
                                        </View>
                                    )}

                                    {/* Temps (Clock) */}
                                    <View style={styles.statTag}>
                                        <Image
                                            source={functions.getIconSource('clock')}
                                            style={[styles.statIcon, { tintColor: THEME.colors.text.secondary }]}
                                        />
                                        <CyberText variant="bodySmall" style={[styles.statText, { color: THEME.colors.text.secondary }]}>
                                            {bestTime}
                                        </CyberText>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* --- FLÈCHE --- */}
                    {!isLocked && (
                        <Image
                            source={functions.getIconSource('arrow-right')}
                            style={{ width: 14, height: 14, tintColor: activeColor }}
                        />
                    )}

                </LinearGradient>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 72,
        borderRadius: 16,
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 16,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    badge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    statusText: {
        fontSize: 10,
        letterSpacing: 1,
        opacity: 0.7
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    statTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    statIcon: {
        width: 12,
        height: 12,
        opacity: 0.8
    },
    statText: {
        fontSize: 12,
        fontFamily: 'monospace' // Maintient l'alignement parfait des chiffres de record
    }
});