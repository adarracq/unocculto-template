import { MyText } from '@/components/atoms/MyText';
import { THEME } from '@/theme/theme';
import { feedbackService } from '@/utils/feedbackService';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Lock } from 'lucide-react-native';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

interface Props {
    level: number;
    title: string;
    subTitle: string;
    isLocked: boolean;
    isCompleted: boolean; // 💡 Nouveau prop
    themeColor: string;   // 💡 Nouveau prop (Couleur du mode)
    bestTime?: string;
    bestAccuracy?: number;
    onPress: () => void;
}

export default function LevelCard({ level, title, subTitle, isLocked, isCompleted, themeColor, bestTime, bestAccuracy, onPress }: Props) {
    const scaleValue = useRef(new Animated.Value(1)).current;

    // Chiffres romains (S'adapte automatiquement au nombre de niveaux)
    const roman = ['I', 'II', 'III', 'IV', 'V', 'VI'][level - 1] || `${level}`;

    const handlePressIn = () => {
        Animated.spring(scaleValue, { toValue: 0.98, useNativeDriver: true, speed: 20 }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true, speed: 20 }).start();
    };

    // Détermination de la couleur active selon le statut
    const activeColor = isLocked ? THEME.colors.text.disabled : themeColor;
    const gradientStart = isLocked ? THEME.colors.glass.background : isCompleted ? `${themeColor}25` : `${themeColor}10`;

    const onError = () => {
        feedbackService.error();
        showMessage({
            message: 'Niveau verrouillé',
            description: 'Atteignez 90% de précision au niveau précédent.',
            type: "warning",
            icon: 'warning',
            backgroundColor: THEME.colors.backgroundLight,
            color: THEME.colors.text.primary,
        });
    };


    return (
        <Animated.View style={{ transform: [{ scale: scaleValue }], width: '100%', marginBottom: 12 }}>
            <Pressable
                onPress={isLocked ? onError : onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.container}
            >
                <LinearGradient
                    colors={[gradientStart, 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                        styles.gradient,
                        {
                            borderColor: isLocked ? THEME.colors.glass.border : isCompleted ? themeColor : `${themeColor}50`,
                            backgroundColor: 'rgba(0,0,0,0.4)'
                        }
                    ]}
                >
                    {/* --- ICONE --- */}
                    <View style={[styles.iconBox, { backgroundColor: isLocked ? THEME.colors.glass.background : `${activeColor}20` }]}>
                        {isLocked ?
                            <Lock size={16} color={THEME.colors.text.disabled} />
                            :
                            <MyText variant="h2" style={{ color: activeColor }}>{roman}</MyText>
                        }
                    </View>

                    {/* --- TEXTES & STATS --- */}
                    <View style={{ flex: 1 }}>
                        <View style={styles.headerRow}>
                            <MyText
                                variant="h3"
                                style={{ color: isLocked ? THEME.colors.text.disabled : THEME.colors.text.primary }}
                            >
                                {title}
                            </MyText>
                            {!isLocked && (
                                <View style={[styles.badge, { backgroundColor: isCompleted ? activeColor : `${activeColor}40` }]}>
                                    <MyText variant="caps" style={{ fontSize: 9, color: isCompleted ? THEME.colors.background : THEME.colors.text.primary }}>
                                        {subTitle}
                                    </MyText>
                                </View>
                            )}
                        </View>

                        {/* --- LIGNE DE STATUT / RECORD --- */}
                        <View style={{ marginTop: 4 }}>
                            {isLocked ? (
                                <MyText variant="caps" style={[styles.statusText, { color: THEME.colors.text.disabled }]}>
                                    VERROUILLÉ
                                </MyText>
                            ) : !isCompleted ? (
                                <MyText variant="caps" style={[styles.statusText, { color: activeColor }]}>
                                    OBJECTIF EN COURS
                                </MyText>
                            ) : (
                                <View style={styles.statsRow}>
                                    <MyText variant="caps" style={[styles.statusText, { color: activeColor }]}>
                                        SÉCURISÉ
                                    </MyText>

                                    {bestAccuracy !== undefined && (
                                        <View style={styles.statTag}>
                                            <Ionicons name="scan-circle-outline" size={12} color={THEME.colors.text.secondary} />
                                            <MyText variant="bodySmall" style={[styles.statusText, { color: THEME.colors.text.secondary }]}>
                                                {bestAccuracy}%
                                            </MyText>
                                        </View>
                                    )}

                                    {bestTime && (
                                        <View style={styles.statTag}>
                                            <Ionicons name="timer-outline" size={12} color={THEME.colors.text.secondary} />
                                            <MyText variant="bodySmall" style={[styles.statusText, { color: THEME.colors.text.secondary }]}>
                                                {bestTime}
                                            </MyText>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    </View>

                    {/* --- FLÈCHE --- */}
                    {!isLocked && (
                        <Ionicons name="chevron-forward" size={16} color={activeColor} style={{ marginLeft: 8 }} />
                    )}

                </LinearGradient>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: { height: 72, borderRadius: THEME.metrics.radius.md, overflow: 'hidden' },
    gradient: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, borderWidth: 1, borderRadius: THEME.metrics.radius.md },
    iconBox: { width: 40, height: 40, borderRadius: THEME.metrics.radius.sm, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    headerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    statusText: { fontSize: 10, letterSpacing: 1, opacity: 0.8 },
    statsRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    statTag: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});