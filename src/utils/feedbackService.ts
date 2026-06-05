import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

let isHapticsEnabled = true;
let isSoundEnabled = true;


// Fonction utilitaire interne pour jouer un son, arrêter l'ancien, et libérer la mémoire ensuite
/*const playSound = async (source: any) => {
    if (!isSoundEnabled || Platform.OS === 'web') return;
    try {
        // 💡 NOUVEAU : Si un son est déjà en cours, on l'arrête et on le décharge
        if (currentSound) {
            await currentSound.stopAsync();
            await currentSound.unloadAsync();
            currentSound = null;
        }

        const { sound } = await Audio.Sound.createAsync(source);
        currentSound = sound; // On sauvegarde la référence du nouveau son

        await sound.playAsync();

        // Nettoyage de la mémoire après la lecture naturelle
        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.didJustFinish) {
                sound.unloadAsync();
                // Si le son actuel vient de finir de lui-même, on vide la référence
                if (currentSound === sound) {
                    currentSound = null;
                }
            }
        });
    } catch (error) {
        console.log("Erreur de lecture audio", error);
    }
};*/

export const feedbackService = {
    // --- VIBRATIONS (HAPTICS) SEULES ---

    light() {
        if (!isHapticsEnabled || Platform.OS === 'web') return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    },

    medium() {
        if (!isHapticsEnabled || Platform.OS === 'web') return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    },

    heavy() {
        if (!isHapticsEnabled || Platform.OS === 'web') return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    },

    error() {
        if (!isHapticsEnabled || Platform.OS === 'web') return;
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    },

    // --- MIXTES : VIBRATIONS + SONS ---

    success(withSound = false) {
        if (isHapticsEnabled && Platform.OS !== 'web') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        if (withSound) {
            //playSound(require('../../assets/sounds/success2.mp3'));
        }
    },
};