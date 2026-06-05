// src/store/useArenaStore.ts
import { GameMode } from '@/constants/GameConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
    timeTaken: number;
    accuracy: number;
    date: string;
}

interface ArenaState {
    currentRegionId: string;
    progression: Record<string, RegionProgress>;
    records: LocalRunRecord[];
    setCurrentRegionId: (regionId: string) => void;
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
            currentRegionId: 'EUR',
            progression: {},
            records: [],

            setCurrentRegionId: (currentRegionId) => set({ currentRegionId }),

            saveLevelResult: ({ regionId, modeId, levelId, timeTaken, accuracy }) => {
                set((state) => {
                    const currentProgression = { ...state.progression };

                    if (!currentProgression[regionId]) currentProgression[regionId] = {};
                    if (!currentProgression[regionId][modeId]) currentProgression[regionId][modeId] = { levels: {} };

                    const existingLevel = currentProgression[regionId][modeId]?.levels[levelId];

                    // 💡 1. RÈGLE DE DÉBLOCAGE : 90% d'accuracy minimum
                    const isSuccess = accuracy >= 90;

                    // On s'assure qu'un niveau déjà validé ne se reverrouille pas si on refait un mauvais score
                    const isCompleted = existingLevel?.completed || isSuccess;

                    // 💡 2. RÈGLE DES RECORDS : La précision prime sur la vitesse
                    let newBestAccuracy = accuracy;
                    let newBestTime = timeTaken;

                    if (existingLevel) {
                        if (accuracy > existingLevel.bestAccuracy) {
                            // Meilleure précision globale -> Nouveau record absolu
                            newBestAccuracy = accuracy;
                            newBestTime = timeTaken;
                        } else if (accuracy === existingLevel.bestAccuracy && timeTaken < existingLevel.bestTime) {
                            // Même précision, mais plus rapide -> Amélioration du record
                            newBestAccuracy = existingLevel.bestAccuracy;
                            newBestTime = timeTaken;
                        } else {
                            // La partie actuelle est moins bonne que le record existant
                            newBestAccuracy = existingLevel.bestAccuracy;
                            newBestTime = existingLevel.bestTime;
                        }
                    }

                    // Mise à jour du niveau
                    currentProgression[regionId][modeId]!.levels[levelId] = {
                        completed: isCompleted,
                        bestTime: newBestTime,
                        bestAccuracy: newBestAccuracy
                    };

                    // Ajout au Leaderboard local (Garde toutes les runs pour l'historique)
                    const newRecord: LocalRunRecord = {
                        id: Date.now().toString(),
                        regionId,
                        modeId,
                        levelId,
                        timeTaken,
                        accuracy,
                        date: new Date().toISOString(),
                    };

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