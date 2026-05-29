// src/store/useLearningStore.ts
import { ALL_COUNTRIES } from '@/data/Countries'; // Importation de votre BDD statique
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type LearningStep = 'basics' | 'capital'; // basics = Localisation + Drapeau

export interface MemoryData {
    box: number; // 0 = non commencé, 1 à 4 = en consolidation, 5 = maîtrisé
    nextReviewDate: number; // Timestamp de la prochaine révision
    step: LearningStep;
}

interface LearningState {
    // --- STATE ---
    currentLearningZone: string; // Ex: 'EUR', 'ASI', etc.
    memoryMap: Record<string, MemoryData>; // Clé: code pays (ex: 'FRA')

    // --- ACTIONS ---
    setCurrentLearningZone: (zoneId: string) => void;
    getNewCountriesBatch: (limit?: number) => string[];
    startDiscoverySession: (countryCodes: string[]) => void;
    processAnswer: (countryCode: string, isCorrect: boolean) => void;

    // --- SÉLECTEURS DE STATISTIQUES REPRISES SUR LA HOME ---
    getUrgentCount: () => number;
    getConsolidationCount: () => number;
    getMasteredCount: () => number;
    getRemainingCount: () => number;
}

// Intervalles de temps (en millisecondes) pour chaque boîte Leitner
const INTERVALS = {
    1: 1000 * 60 * 60 * 12,       // Boîte 1 : Révision dans 12 heures
    2: 1000 * 60 * 60 * 24 * 2,   // Boîte 2 : Révision dans 2 jours
    3: 1000 * 60 * 60 * 24 * 5,   // Boîte 3 : Révision dans 5 jours
    4: 1000 * 60 * 60 * 24 * 10,  // Boîte 4 : Révision dans 10 jours
    5: 1000 * 60 * 60 * 24 * 30,  // Boîte 5 : Maîtrisé ! Révision dans 30 jours
};

export const useLearningStore = create<LearningState>()(
    persist(
        (set, get) => ({
            currentLearningZone: 'EUR',
            memoryMap: {},

            setCurrentLearningZone: (zoneId) => set({ currentLearningZone: zoneId }),

            // Pioche 5 pays de la zone actuelle qui n'ont jamais été appris (Boîte 0)
            getNewCountriesBatch: (limit = 5) => {
                const { currentLearningZone, memoryMap } = get();
                const zoneCountries = ALL_COUNTRIES.filter(c => c.continentId === currentLearningZone);
                const unlearned = zoneCountries.filter(c => !memoryMap[c.code] || memoryMap[c.code].box === 0);
                return unlearned.slice(0, limit).map(c => c.code);
            },

            // Initialise la première phase d'apprentissage (quand on clique sur "Découvrir 5 pays")
            startDiscoverySession: (countryCodes) => {
                set((state) => {
                    const updatedMap = { ...state.memoryMap };
                    countryCodes.forEach(code => {
                        updatedMap[code] = {
                            box: 1, // Entre directement en boîte 1 (Urgent)
                            nextReviewDate: Date.now() + INTERVALS[1],
                            step: 'basics'
                        };
                    });
                    return { memoryMap: updatedMap };
                });
            },

            // Traite le résultat d'un jeu lors des révisions guidées
            processAnswer: (countryCode, isCorrect) => {
                set((state) => {
                    const currentData = state.memoryMap[countryCode] || { box: 1, nextReviewDate: 0, step: 'basics' };
                    let newBox = currentData.box;

                    if (isCorrect) {
                        newBox = Math.min(5, newBox + 1); // Monte d'une boîte
                    } else {
                        newBox = 1; // Sanction immédiate : retour en boîte 1 pour ré-apprentissage
                    }

                    const nextReviewDate = Date.now() + (INTERVALS[newBox as keyof typeof INTERVALS] || INTERVALS[1]);

                    return {
                        memoryMap: {
                            ...state.memoryMap,
                            [countryCode]: { ...currentData, box: newBox, nextReviewDate }
                        }
                    };
                });
            },

            // --- FONCTIONS CALCULATRICES DE STATS LOCALES ---
            getUrgentCount: () => {
                const now = Date.now();
                const { currentLearningZone, memoryMap } = get();
                return ALL_COUNTRIES.filter(c => c.continentId === currentLearningZone)
                    .filter(c => {
                        const data = memoryMap[c.code];
                        return data && data.box > 0 && data.box < 5 && data.nextReviewDate <= now;
                    }).length;
            },

            getConsolidationCount: () => {
                const now = Date.now();
                const { currentLearningZone, memoryMap } = get();
                return ALL_COUNTRIES.filter(c => c.continentId === currentLearningZone)
                    .filter(c => {
                        const data = memoryMap[c.code];
                        return data && data.box > 0 && data.box < 5 && data.nextReviewDate > now;
                    }).length;
            },

            getMasteredCount: () => {
                const { currentLearningZone, memoryMap } = get();
                return ALL_COUNTRIES.filter(c => c.continentId === currentLearningZone)
                    .filter(c => memoryMap[c.code] && memoryMap[c.code].box === 5).length;
            },

            getRemainingCount: () => {
                const { currentLearningZone, memoryMap } = get();
                const zoneCountries = ALL_COUNTRIES.filter(c => c.continentId === currentLearningZone);
                return zoneCountries.filter(c => !memoryMap[c.code] || memoryMap[c.code].box === 0).length;
            }
        }),
        {
            name: 'unocculto-learning-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);