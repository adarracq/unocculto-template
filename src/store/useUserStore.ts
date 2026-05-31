// src/store/useUserStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
    tickets: number;
    isPremium: boolean;

    // --- ACTIONS ---
    consumeTicket: () => boolean;
    addTicket: (amount: number) => void;
    refillTicketsDaily: () => void;
    unlockPremium: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            tickets: 3,
            isPremium: false,
            consumeTicket: () => {
                const { tickets, isPremium } = get();
                // Si le joueur est premium, il ne consomme rien, l'accès est toujours autorisé
                if (isPremium) return true;

                // Sinon on vérifie les billets
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
                    set({ tickets: 3 });
                }
            },

            unlockPremium: () => set({ isPremium: true }),
        }),
        {
            name: 'unocculto-user-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);