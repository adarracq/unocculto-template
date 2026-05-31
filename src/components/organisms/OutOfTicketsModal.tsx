import { CyberText } from '@/components/atoms/CyberText';
import MyButton from '@/components/atoms/MyButton';
import { BaseBottomSheet } from '@/components/molecules/BaseBottomSheet';
import { useUserStore } from '@/store/useUserStore';
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface Props {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function OutOfTicketsModal({ visible, onClose, onSuccess }: Props) {
    const [isWatchingAd, setIsWatchingAd] = useState(false);

    const addTicket = useUserStore(state => state.addTicket);
    const unlockPremium = useUserStore(state => state.unlockPremium);

    const handleWatchAd = async () => {
        setIsWatchingAd(true);
        try {
            // 💡 ICI : Logique d'appel SDK Publicité (ex: AdMob Rewarded)
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulation pub

            addTicket(1); // On donne 1 billet
            onSuccess();  // On lance le jeu
        } catch (error) {
            console.log("Erreur pub", error);
        } finally {
            setIsWatchingAd(false);
        }
    };

    const handlePurchasePremium = () => {
        // 💡 ICI : Logique d'achat in-app (ex: RevenueCat)
        // Si achat réussi :
        unlockPremium();
        onSuccess();
    };

    const goldColor = THEME.colors.levels?.gold || '#FFD700';

    return (
        <BaseBottomSheet
            isVisible={visible}
            onClose={onClose}
            title="ACCÈS RESTREINT"
        >
            <View style={styles.content}>

                {/* 1. ICÔNE & MESSAGE PRINCIPAL */}
                <View style={styles.iconWrapper}>
                    <Ionicons name="lock-closed" size={40} color={goldColor} />
                </View>

                <CyberText variant="body" align="center" style={{ marginBottom: 24, lineHeight: 24, color: THEME.colors.text.secondary }}>
                    Vous avez épuisé vos 3 billets quotidiens.{'\n'} Passez à la version <CyberText variant="body" style={{ color: goldColor, fontWeight: 'bold' }}>UNOCCULTO PREMIUM</CyberText> pour une exploration sans aucune limite.
                </CyberText>

                {/* 2. BOÎTE DES AVANTAGES PREMIUM */}
                <View style={[styles.benefitsBox, { borderColor: goldColor + '40' }]}>
                    <BenefitItem icon="infinite" text="Parties illimitées à vie" color={goldColor} />
                    <BenefitItem icon="earth" text="Déblocage de tous les modes" color={goldColor} />
                    <BenefitItem icon="shield-checkmark" text="Zéro publicité, 100% immersion" color={goldColor} />
                </View>

                {/* 3. BOUTON D'ACHAT PRINCIPAL */}
                <MyButton
                    title="UNOCCULTO PREMIUM (4,99€)"
                    iconLeft="checkmark-circle"
                    variant="outline"
                    onPress={handlePurchasePremium}
                    style={{ width: '100%', marginBottom: 20 }}
                />

                {/* 4. SÉPARATEUR "OU" */}
                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <CyberText variant="caps" style={{ color: THEME.colors.text.disabled, fontSize: 10, letterSpacing: 2 }}>OU</CyberText>
                    <View style={styles.dividerLine} />
                </View>

                {/* 5. OPTION DE SECOURS (PUB) */}
                <View style={styles.freeOptionContainer}>
                    {isWatchingAd ? (
                        <View style={styles.loadingBox}>
                            <ActivityIndicator color={THEME.colors.primary} />
                            <CyberText variant="bodySmall" colorType="secondary">Transmission en cours...</CyberText>
                        </View>
                    ) : (
                        <MyButton
                            title="Regarder une vidéo"
                            iconLeft="play-circle"
                            onPress={handleWatchAd}
                        />
                    )}
                </View>

            </View>
        </BaseBottomSheet>
    );
}

// Sous-composant pour lister les avantages proprement
const BenefitItem = ({ icon, text, color }: { icon: any, text: string, color: string }) => (
    <View style={styles.benefitRow}>
        <Ionicons name={icon} size={20} color={color} />
        <CyberText variant="body" style={{ fontSize: 14, color: THEME.colors.text.primary }}>{text}</CyberText>
    </View>
);

const styles = StyleSheet.create({
    content: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 10,
    },
    iconWrapper: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 215, 0, 0.05)', // Fond doré très léger
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.2)',
    },
    benefitsBox: {
        width: '100%',
        backgroundColor: THEME.colors.glass.background,
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
        gap: 16,
        marginBottom: 24,
    },
    benefitRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        gap: 12,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    freeOptionContainer: {
        width: '100%',
        alignItems: 'center'
    },
    loadingBox: {
        height: 56,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 12
    },
});