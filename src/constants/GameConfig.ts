// src/config/GameConfig.ts
import { THEME } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';

export type GameLevel = 1 | 2 | 3 | 4 | 5; // Ajout du 5 manquant dans votre type
export type GameMode = 'country' | 'flag' | 'capital';

export interface LevelConfig {
    id: number;
    title: string;
    subTitle: string;
    description: string;
}

export interface ModeConfig {
    id: GameMode;
    label: string;
    color: string;
    iconName: keyof typeof Ionicons.glyphMap;
    levels: LevelConfig[];
}

export const GAME_CONFIG: Record<GameMode, ModeConfig> = {
    country: {
        id: 'country',
        label: 'PAYS',
        color: THEME.colors.modes.country,
        iconName: 'globe',
        levels: [
            { id: 1, title: "CHOISIR", subTitle: "QCM", description: "Sélectionnez le pays parmi 4 options." },
            { id: 2, title: "TROUVER", subTitle: "LOCALISATION", description: "Pointez le pays sur la carte." },
            { id: 3, title: "SAISIR", subTitle: "ORTHOGRAPHE", description: "Saisissez le nom exact du pays." },
            { id: 4, title: "ELIMINER", subTitle: "STRATÉGIE", description: "Éliminez les pays jusqu'au dernier." },
            { id: 5, title: "CONTOUR", subTitle: "FORME", description: "Identifiez le pays par sa silhouette." }
        ]
    },
    flag: {
        id: 'flag',
        label: 'DRAPEAUX',
        color: THEME.colors.modes.flag,
        iconName: 'flag',
        levels: [
            { id: 1, title: "CHOISIR", subTitle: "QCM", description: "Associez le drapeau au bon pays." },
            { id: 2, title: "TROUVER", subTitle: "LOCALISATION", description: "Localisez le pays de ce drapeau." },
            { id: 3, title: "SAISIR", subTitle: "ORTHOGRAPHE", description: "Saisissez le pays de ce drapeau." },
        ]
    },
    capital: {
        id: 'capital',
        label: 'CAPITALES',
        color: THEME.colors.modes.capital,
        iconName: 'trail-sign',
        levels: [
            { id: 1, title: "CHOISIR", subTitle: "QCM", description: "Sélectionnez la capitale parmi 4 options." },
            { id: 2, title: "TROUVER", subTitle: "LOCALISATION", description: "Pointez la capitale sur la carte." },
            { id: 3, title: "SAISIR", subTitle: "ORTHOGRAPHE", description: "Saisissez le nom de la capitale." },
            { id: 4, title: "ELIMINER", subTitle: "STRATÉGIE", description: "Éliminez les capitales jusqu'à la bonne." },
        ]
    }
};