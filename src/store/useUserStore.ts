// src/store/useUserStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface NotificationPrefs {
    enabled: boolean;
    time: string; // Format "HH:mm"
}

interface UserState {
    tickets: number;
    isPremium: boolean;
    notifications: Record<'review' | 'learn', NotificationPrefs>;
    isFirstLaunch: boolean;

    // --- ACTIONS ---
    consumeTicket: () => boolean;
    addTicket: (amount: number) => void;
    refillTicketsDaily: () => void;
    setPremium: (status: boolean) => void;
    completeOnboarding: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            tickets: 10,
            isPremium: false,
            notifications: {
                review: { enabled: true, time: '20:00' },
                learn: { enabled: false, time: '08:00' },
            },
            isFirstLaunch: true,
            consumeTicket: () => {
                const { tickets, isPremium } = get();
                // Si le joueur est premium, il ne consomme rien, l'accès est toujours autorisé
                if (isPremium) return true;

                // Sinon on vérifie les tickets
                if (tickets > 0) {
                    set({ tickets: tickets - 1 });
                    return true;
                }
                return false;
            },

            addTicket: (amount) => set({ tickets: get().tickets + amount }),

            refillTicketsDaily: () => {
                // Ne recharge que si le joueur n'est pas premium
                if (!get().isPremium) {
                    set({ tickets: 5 });
                }
            },

            setPremium: (status) => set({ isPremium: status }),
            completeOnboarding: () => set({ isFirstLaunch: false }),
        }),
        {
            name: 'unocculto-user-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);