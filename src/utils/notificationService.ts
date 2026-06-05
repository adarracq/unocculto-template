import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configuration du comportement des notifications quand l'app est au premier plan
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export const notificationService = {
    // 1. Demander la permission
    async requestPermissions() {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        return finalStatus === 'granted';
    },

    async scheduleReviewNotification(timeString: string, urgentCount: number) {
        if (urgentCount == 0) return;
        await this.cancelNotification('evening-review');
        const [hour, minute] = timeString.split(':').map(Number);
        await Notifications.scheduleNotificationAsync({
            identifier: 'evening-review',
            content: {
                title: "Révisions",
                body: `Vous avez ${urgentCount} pays à réviser ce soir !`,
                sound: true,
            },
            trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute },
        });
    },


    // 4. Annuler une notification spécifique
    async cancelNotification(identifier: string) {
        await Notifications.cancelScheduledNotificationAsync(identifier);
    },

    // 5. Annuler toutes les notifications (utile si l'utilisateur désactive l'option globale)
    async cancelAll() {
        await Notifications.cancelAllScheduledNotificationsAsync();
    }
};