// src/store/useArenaStore.ts
import { GameMode } from '@/constants/GameConfig'; // Ajustez le chemin si besoin
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useUserStore } from './useUserStore'; // <-- On importe le store utilisateur !

// --- TYPES DE STRUCTURE ---
export interface LevelProgress {
    completed: boolean;
    bestTime: number;
    bestAccuracy: number;
}

export interface ModeProgress {
    levels: Record<number, LevelProgress>;
}

export interface RegionProgress {
    country?: ModeProgress;
    flag?: ModeProgress;
    capital?: ModeProgress;
}

export interface LocalRunRecord {
    id: string;
    regionId: string;
    modeId: GameMode;
    levelId: number;
    pseudo: string;
    timeTaken: number;
    accuracy: number;
    date: string;
}

interface ArenaState {
    // --- STATE ---
    currentRegionId: string;
    progression: Record<string, RegionProgress>;
    records: LocalRunRecord[];

    // --- ACTIONS ---
    setCurrentRegionId: (regionId: string) => void;

    // Validation d'un niveau et enregistrement du score
    saveLevelResult: (params: {
        regionId: string;
        modeId: GameMode;
        levelId: number;
        timeTaken: number;
        accuracy: number;
    }) => void;
}

export const useArenaStore = create<ArenaState>()(
    persist(
        (set, get) => ({
            // --- VALEURS INITIALES ---
            currentRegionId: 'EUR',
            progression: {},
            records: [],

            // --- ACTIONS ---
            setCurrentRegionId: (currentRegionId) => set({ currentRegionId }),

            saveLevelResult: ({ regionId, modeId, levelId, timeTaken, accuracy }) => {
                set((state) => {
                    const currentProgression = { ...state.progression };

                    // Initialisation sécurisée des sous-objets
                    if (!currentProgression[regionId]) currentProgression[regionId] = {};
                    if (!currentProgression[regionId][modeId]) currentProgression[regionId][modeId] = { levels: {} };

                    const existingLevel = currentProgression[regionId][modeId]?.levels[levelId];

                    // Vérifie s'il faut mettre à jour le record
                    const isNewBestTime = !existingLevel || timeTaken < existingLevel.bestTime;
                    const bestTime = isNewBestTime ? timeTaken : existingLevel.bestTime;
                    const bestAccuracy = isNewBestTime ? accuracy : existingLevel.bestAccuracy;

                    // Mise à jour du niveau
                    currentProgression[regionId][modeId]!.levels[levelId] = {
                        completed: true,
                        bestTime,
                        bestAccuracy
                    };

                    // 💡 RÉCUPÉRATION DU PSEUDO GLOBAL ICI
                    const currentPseudo = useUserStore.getState().pseudo;

                    // Ajout au Leaderboard local
                    const newRecord: LocalRunRecord = {
                        id: Date.now().toString(),
                        regionId,
                        modeId,
                        levelId,
                        pseudo: currentPseudo, // On utilise le pseudo récupéré
                        timeTaken,
                        accuracy,
                        date: new Date().toLocaleDateString(),
                    };

                    // On garde le top 20 trié par précision puis temps
                    const updatedRecords = [...state.records, newRecord]
                        .sort((a, b) => b.accuracy - a.accuracy || a.timeTaken - b.timeTaken)
                        .slice(0, 20);

                    return {
                        progression: currentProgression,
                        records: updatedRecords
                    };
                });
            },
        }),
        {
            name: 'unocculto-arena-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);