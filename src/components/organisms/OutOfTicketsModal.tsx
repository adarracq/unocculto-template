import MyButton from '@/components/atoms/MyButton';
import { MyText } from '@/components/atoms/MyText';
import { BaseBottomSheet } from '@/components/molecules/BaseBottomSheet';
import { useUserStore } from '@/store/useUserStore';
import { THEME } from '@/theme/theme';
import { billingService } from '@/utils/billingService';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TestIds, useRewardedAd } from 'react-native-google-mobile-ads';
import { PurchasesPackage } from 'react-native-purchases';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxxxxxxxxx/yyyyyyyyyy';

interface Props {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function OutOfTicketsModal({ visible, onClose, onSuccess }: Props) {
    const [isWatchingAd, setIsWatchingAd] = useState(false);
    const [rewardGiven, setRewardGiven] = useState(false);

    const [offer, setOffer] = useState<PurchasesPackage | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoadingOffers, setIsLoadingOffers] = useState(true);

    const addTicket = useUserStore(state => state.addTicket);

    const { isLoaded, isClosed, load, show, isEarnedReward, error } = useRewardedAd(adUnitId);

    useEffect(() => {
        if (visible) {
            setRewardGiven(false);
        }
    }, [visible]);

    // 1. Précharger la pub dès que la modale s'ouvre (ou quand la précédente est fermée)
    useEffect(() => {
        if (visible && (!isLoaded || isClosed) && !error) {
            load();
        }
    }, [visible, isLoaded, isClosed, error, load]);

    // 2. Écouter si l'utilisateur a gagné la récompense (a regardé jusqu'au bout)
    useEffect(() => {
        if (isEarnedReward && !rewardGiven) {
            setRewardGiven(true); // 🔒 On verrouille immédiatement !
            addTicket(1);
            onSuccess();
        }
    }, [isEarnedReward, rewardGiven]);

    useEffect(() => {
        if (!visible) return;

        const fetchOffer = async () => {
            setIsLoadingOffers(true);
            const packageOffer = await billingService.getLifetimeOffer();
            setOffer(packageOffer);
            setIsLoadingOffers(false);
        };
        fetchOffer();
    }, [visible]);

    const handlePurchasePremium = async () => {
        if (!offer) return;
        setIsProcessing(true);

        const success = await billingService.purchase(offer);
        if (success) onSuccess();

        setIsProcessing(false);
    };

    const handleRestore = async () => {
        setIsProcessing(true);

        const success = await billingService.restore();
        if (success) onSuccess();

        setIsProcessing(false);
    };

    const goldColor = THEME.colors.levels?.gold || '#FFD700';
    const isUIBlocked = isProcessing || isWatchingAd;

    return (
        <BaseBottomSheet
            isVisible={visible}
            onClose={onClose}
            title="ACCÈS RESTREINT"
        >
            <View style={styles.content}>

                {/* 1. ICÔNE & MESSAGE PRINCIPAL */}
                <View style={styles.iconWrapper}>
                    <Ionicons name="infinite" size={40} color={goldColor} />

                </View>

                <MyText variant="body" align="center" style={{ marginBottom: 24, lineHeight: 24, color: THEME.colors.text.secondary }}>
                    Vous avez épuisé vos billets quotidiens.{'\n'}
                    Acquérez <MyText variant="body" style={{ color: goldColor }}>UNOCCULTO PREMIUM</MyText> pour une exploration sans limite.
                </MyText>

                {/* 2. BOÎTE DES AVANTAGES */}
                <View style={[styles.benefitsBox, { borderColor: goldColor + '40' }]}>
                    <BenefitItem icon="card-outline" text="Paiement unique, sans abonnement" color={goldColor} />
                    <BenefitItem icon="game-controller-outline" text="Parties et explorations illimitées" color={goldColor} />
                    <BenefitItem icon="shield-checkmark-outline" text="Expérience 100% sans publicité" color={goldColor} />
                </View>

                {/* 3. BOUTON D'ACHAT DYNAMIQUE */}
                <MyButton
                    title={isLoadingOffers ? "CHARGEMENT..." : isProcessing ? "TRAITEMENT..." : `UNOCCULTO PREMIUM (${offer?.product.priceString || '...'})`}
                    subtitle="Achat définitif"
                    iconLeft={isProcessing || isLoadingOffers ? undefined : "key"}
                    variant="outline"
                    onPress={handlePurchasePremium}
                    disabled={isUIBlocked || isLoadingOffers || !offer}
                    style={{ width: '100%', marginBottom: 12 }}
                />

                {/* 4. SÉPARATEUR "OU" */}
                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <MyText variant="caps" style={{ color: THEME.colors.text.disabled, fontSize: 10, letterSpacing: 2 }}>OU</MyText>
                    <View style={styles.dividerLine} />
                </View>

                {/* 5. OPTION DE SECOURS (PUB) */}
                <View style={styles.freeOptionContainer}>
                    {error ? (
                        // CAS 1 : ERREUR DE CHARGEMENT
                        <MyButton
                            title="Réseau surchargé"
                            subtitle="Réessayer de charger une vidéo"
                            iconLeft="refresh"
                            variant="danger"
                            onPress={() => load()} // Permet à l'utilisateur de forcer une nouvelle requête
                            disabled={isUIBlocked}
                        />
                    ) :
                        <MyButton
                            title="Regarder une vidéo"
                            subtitle={isLoaded ? "Obtenir 1 billet d'exploration" : "Chargement de la publicité..."}
                            iconLeft="play-circle-outline"
                            onPress={() => show()} // 💡 Lance la publicité préchargée
                            disabled={isUIBlocked || !isLoaded}
                        />
                    }
                </View>
                {/* RESTAURATION */}
                <TouchableOpacity onPress={handleRestore} disabled={isUIBlocked} style={styles.restoreButton}>
                    <MyText variant="bodySmall" style={{ color: THEME.colors.text.secondary, textDecorationLine: 'underline' }}>
                        Déjà Premium ? Restaurer mon achat
                    </MyText>
                </TouchableOpacity>

            </View>
        </BaseBottomSheet>
    );
}

// Sous-composant
const BenefitItem = ({ icon, text, color }: { icon: any, text: string, color: string }) => (
    <View style={styles.benefitRow}>
        <View style={styles.iconContainer}>
            <Ionicons name={icon as any} size={18} color={color} />
        </View>
        <MyText variant="body" style={{ fontSize: 14, color: THEME.colors.text.primary, flex: 1 }}>{text}</MyText>
    </View>
);

const styles = StyleSheet.create({
    content: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    iconWrapper: {
        width: 80,
        height: 80,
        borderRadius: THEME.metrics.radius.round,
        backgroundColor: 'rgba(255, 215, 0, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.2)',
        position: 'relative',
    },
    lifetimeBadge: {
        position: 'absolute',
        bottom: -8,
        backgroundColor: THEME.colors.levels?.gold || '#FFD700',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: THEME.metrics.radius.sm,
        borderWidth: 2,
        borderColor: THEME.colors.background,
    },
    benefitsBox: {
        width: '100%',
        backgroundColor: THEME.colors.glass.background,
        padding: 20,
        borderRadius: THEME.metrics.radius.md,
        borderWidth: 1,
        gap: 16,
        marginBottom: 24,
    },
    benefitRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: THEME.metrics.radius.md,
        backgroundColor: 'rgba(255, 215, 0, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    restoreButton: {
        marginTop: 20,
        paddingVertical: 8,
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
        backgroundColor: 'rgba(255,255,255,0.08)',
    },
    freeOptionContainer: {
        width: '100%',
        alignItems: 'center'
    },
    loadingBox: {
        height: 64,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: THEME.metrics.radius.md,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
});