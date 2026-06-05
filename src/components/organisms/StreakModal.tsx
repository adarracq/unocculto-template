import MyButton from '@/components/atoms/MyButton';
import { MyText } from '@/components/atoms/MyText';
import { BaseBottomSheet } from '@/components/molecules/BaseBottomSheet';
import { useStreakStore } from '@/store/useStreakStore';
import { useUserStore } from '@/store/useUserStore';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { TestIds, useRewardedAd } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxxxxxxxxx/yyyyyyyyyy';

export const StreakModal = () => {
    const {
        isModalVisible,
        status,
        streakCount,
        previousStreak,
        closeModal,
        restoreStreak
    } = useStreakStore();

    const isPremium = useUserStore(state => state.isPremium);

    // --- ADMOB INFRASTRUCTURE ---
    const { isLoaded, isClosed, load, show, isEarnedReward, error } = useRewardedAd(adUnitId);
    const [rewardGiven, setRewardGiven] = useState(false);

    // --- ANIMATIONS ---
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const lottieRef = useRef<LottieView>(null);
    const [displayStreak, setDisplayStreak] = useState(0);

    // 1. Fermeture silencieuse pour le Jour 1
    useEffect(() => {
        if (isModalVisible && status === 'INCREASED' && streakCount <= 1) {
            closeModal();
        }
    }, [isModalVisible, status, streakCount]);

    // 2. Gestion du chargement de la publicité
    useEffect(() => {
        if (isModalVisible) {
            setRewardGiven(false);
            // On charge la pub uniquement si la série est perdue, que le joueur n'est pas Premium, et qu'elle n'est pas déjà prête
            if (status === 'LOST' && !isPremium && (!isLoaded || isClosed) && !error) {
                load();
            }
        }
    }, [isModalVisible, status, isPremium, isLoaded, isClosed, error, load]);

    // 3. Attribution de la récompense
    useEffect(() => {
        if (isEarnedReward && !rewardGiven) {
            setRewardGiven(true);
            restoreStreak();
        }
    }, [isEarnedReward, rewardGiven]);

    // 4. Gestion des animations d'apparition
    useEffect(() => {
        if (isModalVisible && status === 'INCREASED' && streakCount > 1) {
            const startValue = streakCount > 1 ? streakCount - 1 : 1;
            setDisplayStreak(startValue);
            scaleAnim.setValue(0);

            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                tension: 40,
                useNativeDriver: true
            }).start();

            setTimeout(() => {
                lottieRef.current?.play();
            }, 100);

            const timer = setTimeout(() => {
                const interval = setInterval(() => {
                    setDisplayStreak((prev) => {
                        if (prev < streakCount) {
                            return prev + 1;
                        } else {
                            clearInterval(interval);
                            return prev;
                        }
                    });
                }, 50);
                return () => clearInterval(interval);
            }, 800);

            return () => clearTimeout(timer);

        } else if (isModalVisible && status === 'LOST') {
            scaleAnim.setValue(0);
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                tension: 40,
                useNativeDriver: true
            }).start();
        }
    }, [isModalVisible, status, streakCount]);

    // Masquer le composant si non visible, déjà loggé, ou si on est au jour 1 (géré plus haut)
    if (!isModalVisible || !status || status === 'ALREADY_LOGGED' || (status === 'INCREASED' && streakCount <= 1)) {
        return null;
    }

    const ticketColor = THEME.colors.text.secondary;

    return (
        <BaseBottomSheet
            isVisible={true}
            onClose={closeModal}
            title=""
        >
            <View style={styles.container}>

                {/* --- ZONE HERO ANIMÉE --- */}
                <Animated.View style={[styles.heroSection, { transform: [{ scale: scaleAnim }] }]}>

                    {status === 'INCREASED' ? (
                        <>
                            <MyText variant="caps" style={{ color: THEME.colors.primary, letterSpacing: 2 }}>
                                SÉRIE MAINTENUE
                            </MyText>

                            <View style={styles.numberWrapper}>
                                <View style={styles.lottie}>
                                    <LottieView
                                        ref={lottieRef}
                                        source={require('@/assets/lotties/fire.json')}
                                        style={{ width: 160, height: 160 }}
                                        autoPlay={false}
                                        loop={true}
                                    />
                                </View>

                                <MyText variant="h1" align="center" style={styles.glowingNumber}>
                                    {displayStreak}
                                </MyText>
                                <MyText variant="h2" style={{ color: THEME.colors.text.primary, marginTop: 5 }}>
                                    JOURS
                                </MyText>
                            </View>
                        </>
                    ) : (
                        <View style={styles.lostWrapper}>
                            <View style={styles.iconCircle}>
                                <Ionicons name="reload" size={48} color={THEME.colors.danger} />
                            </View>
                            <MyText variant="caps" style={{ color: THEME.colors.danger, letterSpacing: 2 }}>
                                ATTENTION
                            </MyText>
                            <MyText variant="h1" align="center" style={{ fontSize: 32 }}>
                                Série Brisée
                            </MyText>
                        </View>
                    )}

                </Animated.View>

                {/* --- SOUS-TITRE --- */}
                <MyText variant="body" colorType="secondary" align="center" style={styles.subtitleText}>
                    {status === 'INCREASED'
                        ? "Votre discipline forge votre réussite. L'exploration d'aujourd'hui vous attend."
                        : `Vous avez perdu votre série de ${previousStreak} jours. Restaurez-la avant qu'il ne soit trop tard.`
                    }
                </MyText>

                {/* --- BANDEAU TICKETS --- */}
                {status === 'INCREASED' && !isPremium && (
                    <View style={styles.ticketBanner}>
                        <View style={styles.ticketIconBox}>
                            <Ionicons name="ticket" size={16} color={ticketColor} style={{ transform: [{ rotate: '-45deg' }] }} />
                        </View>
                        <MyText variant="caps" style={{ color: ticketColor, fontSize: 11, letterSpacing: 1 }}>
                            5 TICKETS RECHARGÉS
                        </MyText>
                    </View>
                )}

                {/* --- BOUTONS --- */}
                <View style={styles.actionContainer}>
                    {status === 'LOST' ? (
                        <>
                            {error ? (
                                <MyButton
                                    title="Réseau surchargé"
                                    subtitle="Réessayer de charger une vidéo"
                                    iconLeft="refresh"
                                    variant="danger"
                                    onPress={() => load()}
                                />
                            ) : isPremium ? (
                                <MyButton
                                    title="RESTAURER MA SÉRIE"
                                    subtitle="Avantage Premium"
                                    iconLeft="shield-checkmark-outline"
                                    iconRight="chevron-forward"
                                    onPress={() => restoreStreak()}
                                    variant="outline"
                                />
                            ) : (
                                <MyButton
                                    title="RESTAURER MA SÉRIE"
                                    subtitle={isLoaded ? "Regarder une vidéo pour sauver la flamme" : "Chargement de la publicité..."}
                                    iconLeft="play-circle-outline"
                                    iconRight="chevron-forward"
                                    onPress={() => show()}
                                    variant="outline"
                                    disabled={!isLoaded}
                                />
                            )}

                            <MyButton
                                title="Accepter la perte"
                                onPress={closeModal}
                                variant="danger"
                                iconLeft="close-circle-outline"
                                iconRight="chevron-forward"
                            />
                        </>
                    ) : (
                        <MyButton
                            title="CONTINUER"
                            onPress={closeModal}
                            iconRight="chevron-forward"
                            iconLeft="home"
                        />
                    )}
                </View>
            </View>
        </BaseBottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },

    // --- HERO SECTION ---
    heroSection: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    numberWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 140,
        width: '100%',
    },
    lottie: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -20
    },
    glowingNumber: {
        fontSize: 72,
        lineHeight: 80,
        color: THEME.colors.primary,
        textShadowColor: THEME.colors.primary,
        textShadowRadius: 10,
        textShadowOffset: { width: 0, height: 0 },
    },

    // --- ZONE LOST ---
    lostWrapper: {
        alignItems: 'center',
        gap: 12,
        paddingVertical: 10,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: THEME.colors.danger + '15',
        borderWidth: 1,
        borderColor: THEME.colors.danger + '40',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },

    // --- TEXTES & BANNIÈRE ---
    subtitleText: {
        marginBottom: 24,
        paddingHorizontal: 10,
        lineHeight: 22,
    },
    ticketBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.colors.glass.background,
        paddingRight: 16,
        paddingLeft: 4,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
        marginBottom: 24,
        gap: 10,
    },
    ticketIconBox: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // --- ACTIONS ---
    actionContainer: {
        width: '100%',
        gap: 12
    }
});