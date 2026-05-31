import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type StreakStatus = 'INCREASED' | 'LOST' | 'ALREADY_LOGGED' | null;

interface StreakState {
    streakCount: number;
    previousStreak: number;
    lastActiveDate: number | null;

    // États pour l'UI (Modale)
    status: StreakStatus;
    isModalVisible: boolean;


    // Actions
    checkAndIncrementStreak: () => void;
    closeModal: () => void;
    restoreStreak: () => void;
}

export const useStreakStore = create<StreakState>()(
    persist(
        (set, get) => ({
            streakCount: 0,
            previousStreak: 0,
            lastActiveDate: null,

            status: null,
            isModalVisible: false,


            checkAndIncrementStreak: () => {
                const state = get();
                const now = new Date();
                const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
                const ONE_DAY_MS = 24 * 60 * 60 * 1000;

                if (!state.lastActiveDate) {
                    set({ streakCount: 1, lastActiveDate: todayMidnight, status: 'INCREASED', isModalVisible: true });
                    return;
                }

                const diff = todayMidnight - state.lastActiveDate;

                if (diff === 0) {
                    // Déjà connecté aujourd'hui, on ne montre pas la modale
                    set({ status: 'ALREADY_LOGGED', isModalVisible: false });
                    return;
                } else if (diff === ONE_DAY_MS) {
                    // Connexion le lendemain parfait : +1
                    set({ streakCount: state.streakCount + 1, lastActiveDate: todayMidnight, status: 'INCREASED', isModalVisible: true });
                } else if (diff > ONE_DAY_MS) {
                    // Série brisée
                    set({
                        previousStreak: state.streakCount,
                        streakCount: 1,
                        lastActiveDate: todayMidnight,
                        status: 'LOST',
                        isModalVisible: true
                    });
                }
            },

            closeModal: () => set({ isModalVisible: false }),

            restoreStreak: () => {
                const state = get();
                if (state.status === 'LOST') {
                    // On restaure l'ancienne série et on ferme la modale
                    set({
                        streakCount: state.previousStreak,
                        status: 'INCREASED',
                        isModalVisible: false
                    });
                }
            },
        }),
        {
            name: 'streak-storage',
            storage: createJSONStorage(() => AsyncStorage),
            // 💡 On ne persiste QUE les vraies données, pas l'état éphémère de la modale
            partialize: (state) => ({
                streakCount: state.streakCount,
                previousStreak: state.previousStreak,
                lastActiveDate: state.lastActiveDate,
            }),
        }
    )
);