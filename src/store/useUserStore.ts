// src/store/useUserStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
    // --- STATE ---
    pseudo: string;
    isPremium: boolean;
    fuel: number;

    // --- ACTIONS ---
    setPseudo: (pseudo: string) => void;
    setPremium: (status: boolean) => void;
    useFuel: () => boolean;
    refillFuel: (amount: number) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            pseudo: 'Agent_1', // Pseudo par défaut
            isPremium: false,
            fuel: 5,

            setPseudo: (pseudo) => set({ pseudo }),
            setPremium: (isPremium) => set({ isPremium }),

            useFuel: () => {
                const { isPremium, fuel } = get();
                if (isPremium) return true; // Infini pour les premiums
                if (fuel <= 0) return false;

                set({ fuel: fuel - 1 });
                return true;
            },

            refillFuel: (amount) => set((state) => ({ fuel: Math.min(5, state.fuel + amount) })),
        }),
        {
            name: 'unocculto-user-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);