// src/services/billingService.ts
import { useUserStore } from '@/store/useUserStore';
import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL, PurchasesPackage } from 'react-native-purchases';

const ENTITLEMENT_ID = 'unocculto-premium';
const iosApiKey = 'test_jkYeIEIezOOTSMUKritfDLrRiPf';
const androidApiKey = 'goog_aJsnapDjSTgSJGyPmHAiIFVrkPu';

// 💡 Fonction d'aide interne pour vérifier le statut
const checkIsPremium = (customerInfo: any) => {
    return typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== "undefined";
};

export const billingService = {
    // 1. Initialisation (Appelé dans _layout)
    setup: async () => {
        Purchases.setLogLevel(LOG_LEVEL.DEBUG);

        if (Platform.OS === 'ios') {
            await Purchases.configure({ apiKey: iosApiKey });
        } else if (Platform.OS === 'android') {
            await Purchases.configure({ apiKey: androidApiKey });
        }

        // Vérification initiale
        try {
            const customerInfo = await Purchases.getCustomerInfo();
            useUserStore.getState().setPremium(checkIsPremium(customerInfo));
        } catch (e) {
            console.error("Erreur RC Start", e);
        }

        // Écouteur en arrière-plan
        Purchases.addCustomerInfoUpdateListener((info) => {
            useUserStore.getState().setPremium(checkIsPremium(info));
        });
    },

    // 2. Récupérer l'offre à vie (Appelé dans la Modale)
    getLifetimeOffer: async (): Promise<PurchasesPackage | null> => {
        try {
            const offerings = await Purchases.getOfferings();
            if (offerings.current && offerings.current.availablePackages.length > 0) {
                return offerings.current.availablePackages.find(p => p.identifier === '$rc_lifetime')
                    || offerings.current.availablePackages[0];
            }
        } catch (e) {
            console.error("Erreur offres RC", e);
        }
        return null;
    },

    // 3. Acheter (Appelé dans la Modale)
    purchase: async (pack: PurchasesPackage): Promise<boolean> => {
        try {
            const { customerInfo } = await Purchases.purchasePackage(pack);
            const isPremium = checkIsPremium(customerInfo);
            if (isPremium) useUserStore.getState().setPremium(true);
            return isPremium;
        } catch (e: any) {
            if (!e.userCancelled) console.error("Erreur achat RC", e);
            return false;
        }
    },

    // 4. Restaurer (Appelé dans la Modale)
    restore: async (): Promise<boolean> => {
        try {
            const customerInfo = await Purchases.restorePurchases();
            const isPremium = checkIsPremium(customerInfo);
            if (isPremium) useUserStore.getState().setPremium(true);
            return isPremium;
        } catch (e) {
            console.error("Erreur restauration RC", e);
            return false;
        }
    },
    syncPremiumStatus: async () => {
        try {
            // Récupère les infos du client (RevenueCat gère le cache intelligemment)
            const customerInfo = await Purchases.getCustomerInfo();

            // Remplacez 'Premium' par le nom exact de l'Entitlement créé sur le dashboard RevenueCat
            const isPremium = typeof customerInfo.entitlements.active['Premium'] !== 'undefined';

            // Met à jour le store Zustand
            useUserStore.getState().setPremium(isPremium);

            return isPremium;
        } catch (e) {
            console.error("Erreur lors de la synchro Premium :", e);
            return false;
        }
    }
};