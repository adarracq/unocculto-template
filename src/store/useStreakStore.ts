import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
// 💡 1. Import du store utilisateur
import { useUserStore } from './useUserStore';

export type StreakStatus = 'INCREASED' | 'LOST' | 'ALREADY_LOGGED' | null;

interface StreakState {
    streakCount: number;
    previousStreak: number;
    lastActiveDate: number | null;

    status: StreakStatus;
    isModalVisible: boolean;

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
                    // Nouveau jour (Première connexion)
                    useUserStore.getState().refillTicketsDaily(); // 💡 2. On recharge les tickets
                    set({ streakCount: 1, lastActiveDate: todayMidnight, status: 'INCREASED', isModalVisible: true });
                    return;
                }

                const diff = todayMidnight - state.lastActiveDate;

                if (diff === 0) {
                    // Déjà connecté aujourd'hui, on ne fait RIEN pour les tickets
                    set({ status: 'ALREADY_LOGGED', isModalVisible: false });
                    return;
                } else if (diff === ONE_DAY_MS) {
                    // Nouveau jour (Série maintenue)
                    useUserStore.getState().refillTicketsDaily(); // 💡 2. On recharge les tickets
                    set({ streakCount: state.streakCount + 1, lastActiveDate: todayMidnight, status: 'INCREASED', isModalVisible: true });
                } else if (diff > ONE_DAY_MS) {
                    // Nouveau jour (Série brisée)
                    useUserStore.getState().refillTicketsDaily(); // 💡 2. On recharge les tickets
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
            partialize: (state) => ({
                streakCount: state.streakCount,
                previousStreak: state.previousStreak,
                lastActiveDate: state.lastActiveDate,
            }),
        }
    )
);