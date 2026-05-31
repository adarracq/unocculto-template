import { CyberText } from '@/components/atoms/CyberText';
import MyButton from '@/components/atoms/MyButton';
import { BaseBottomSheet } from '@/components/molecules/BaseBottomSheet';
import { useStreakStore } from '@/store/useStreakStore'; // 💡 Votre nouveau store
import { THEME } from '@/theme/theme';
import { Flame, RefreshCw } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const StreakModal = () => {
    // 💡 On récupère tout depuis le nouveau store
    const {
        isModalVisible,
        status,
        streakCount,
        previousStreak,
        closeModal,
        restoreStreak
    } = useStreakStore();

    const [isWatchingAd, setIsWatchingAd] = useState(false);

    // On ne rend rien si la modale ne doit pas s'afficher
    if (!isModalVisible || !status || status === 'ALREADY_LOGGED') return null;

    let content = { tag: '', title: '', subtitle: '', Icon: Flame, iconColor: THEME.colors.primary };

    if (status === 'INCREASED') {
        content = {
            tag: 'CONSTANCE',
            title: `${streakCount} JOURS`,
            subtitle: "Votre discipline forge votre réussite. Prêt pour l'exploration d'aujourd'hui ?",
            Icon: Flame,
            iconColor: THEME.colors.primary,
        };
    } else if (status === 'LOST') {
        content = {
            tag: 'DANGER',
            title: "Série Brisée",
            subtitle: `Vous avez perdu votre série de ${previousStreak} jours. Voulez-vous la restaurer avant qu'elle ne disparaisse définitivement ?`,
            Icon: RefreshCw,
            iconColor: THEME.colors.danger,
        };
    }

    const { Icon, iconColor } = content;

    const handleWatchAdToSave = async () => {
        setIsWatchingAd(true);

        try {
            // 💡 ICI : Appel SDK pub (ex: await showRewardedAd())
            // Simulation d'une pub de 2 secondes :
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Succès : on restaure la série
            restoreStreak();
        } catch (error) {
            console.log("Erreur lors de la pub", error);
            setIsWatchingAd(false);
        }
    };

    return (
        <BaseBottomSheet
            isVisible={true}
            onClose={closeModal}
            title=""
        >
            <View style={styles.container}>
                <View style={[styles.iconContainer, { shadowColor: iconColor }]}>
                    <Icon size={64} color={iconColor} strokeWidth={1.5} />
                </View>

                <CyberText variant="caps" style={{ color: iconColor, marginBottom: 8, letterSpacing: 2 }}>
                    {content.tag}
                </CyberText>

                <CyberText variant="h1" align="center" style={{ marginBottom: 12, fontSize: 32 }}>
                    {content.title}
                </CyberText>

                <CyberText variant="body" colorType="secondary" align="center" style={{ marginBottom: 32, paddingHorizontal: 10 }}>
                    {content.subtitle}
                </CyberText>

                {/* BOUTONS D'ACTION SELON LE STATUT */}
                {status === 'LOST' ? (
                    <View style={styles.actionContainer}>
                        {isWatchingAd ? (
                            <View style={styles.loadingBox}>
                                <ActivityIndicator color={THEME.colors.primary} />
                                <CyberText variant="bodySmall" colorType="secondary">Chargement de la vidéo...</CyberText>
                            </View>
                        ) : (
                            <>
                                <MyButton
                                    title="RESTAURER LA SÉRIE"
                                    iconLeft="play-circle-outline"
                                    onPress={handleWatchAdToSave}
                                    variant="outline"
                                />
                                <MyButton
                                    title="Accepter la perte"
                                    onPress={closeModal}
                                    variant="danger"
                                    iconLeft='close-circle-outline'
                                />
                            </>
                        )}
                    </View>
                ) : (
                    <View style={styles.actionContainer}>
                        <MyButton
                            title="CONTINUER"
                            onPress={closeModal}
                            variant="outline"
                            iconRight='chevron-forward'
                        />
                    </View>
                )}
            </View>
        </BaseBottomSheet>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: 'center', paddingHorizontal: 10, paddingBottom: 20 },
    iconContainer: { marginBottom: 20, alignItems: 'center', justifyContent: 'center', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 20 },
    actionContainer: { width: '100%', gap: 12 },
    loadingBox: { height: 56, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12 }
});