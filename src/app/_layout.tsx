import { StreakModal } from '@/components/organisms/StreakModal';
import { useLearningStore } from '@/store/useLearningStore';
import { useStreakStore } from '@/store/useStreakStore';
import { useUserStore } from '@/store/useUserStore';
import { THEME } from '@/theme/theme';
import { billingService } from '@/utils/billingService';
import { notificationService } from '@/utils/notificationService';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts
} from '@expo-google-fonts/plus-jakarta-sans';
// 💡 Import de useRootNavigationState
import { SplashScreen, Stack, useRootNavigationState, useRouter } from 'expo-router';
import { useEffect } from 'react';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import mobileAds from 'react-native-google-mobile-ads';

const ENTITLEMENT_ID = 'unocculto-premium';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  // 💡 Permet de savoir quand Expo Router est prêt à écouter les redirections
  const rootNavigationState = useRootNavigationState();

  const checkAndIncrementStreak = useStreakStore((state) => state.checkAndIncrementStreak);
  const urgentCount = useLearningStore((state) => state.getUrgentCount());
  const setPremium = useUserStore((state) => state.setPremium);

  const isFirstLaunch = useUserStore((state) => state.isFirstLaunch);

  useEffect(() => {
    if (!isFirstLaunch) {
      checkAndIncrementStreak();
    }
  }, [isFirstLaunch]);

  const [loaded, error] = useFonts({
    'Jakarta-Regular': PlusJakartaSans_400Regular,
    'Jakarta-SemiBold': PlusJakartaSans_600SemiBold,
    'Jakarta-Bold': PlusJakartaSans_700Bold,
    'Jakarta-ExtraBold': PlusJakartaSans_800ExtraBold,
  });

  // 1. INITIALISATION DES SERVICES (Indépendant de la navigation)
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();

      const initBilling = async () => {
        billingService.setup();
        await billingService.syncPremiumStatus();
      };
      initBilling();

      mobileAds()
        .initialize()
        .then(adapterStatuses => {
          console.log('🟢 AdMob est initialisé et prêt !');
        });

      const setupNotifications = async () => {
        const hasPermission = await notificationService.requestPermissions();
        if (hasPermission) {
          const { notifications } = useUserStore.getState();

          if (notifications.review.enabled) {
            notificationService.scheduleReviewNotification(notifications.review.time, urgentCount);
          }
        }
      };
      setupNotifications();
    }
  }, [loaded, error]);

  // 💡 2. NOUVEAU : GESTION SÉCURISÉE DE LA REDIRECTION D'ONBOARDING
  useEffect(() => {
    // On attend que les polices soient chargées ET que le routeur soit prêt
    if (!loaded || !rootNavigationState?.key) return;

    if (isFirstLaunch) {
      console.log("🚀 Premier lancement détecté, redirection vers l'onboarding...");
      router.replace('/onboarding');
    }
  }, [loaded, isFirstLaunch, rootNavigationState?.key]);

  if (!loaded && !error) {
    console.log("Fonts are loading...");
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: THEME.colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
      </Stack>

      {!isFirstLaunch && <StreakModal />}

      <FlashMessage position="top" statusBarHeight={20} />
    </GestureHandlerRootView>
  );
}