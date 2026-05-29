// src/config/GameConfig.ts
import { THEME } from '@/theme/theme';

export type GameLevel = 1 | 2 | 3 | 4;
export type GameMode = 'country' | 'flag' | 'capital';

export interface LevelConfig {
    id: number;
    title: string;
    subTitle: string;
    description: string;
    rules: {
        time?: number;   // En secondes
        accuracy: number;
    };
    color?: string; // Surcharge de couleur si besoin (ex: Boss ou Niveau Noir)
}

export interface ModeConfig {
    id: GameMode;
    label: string;
    color: string;
    levels: LevelConfig[];
}

export const GAME_CONFIG: Record<GameMode, ModeConfig> = {
    country: {
        id: 'country',
        label: 'PAYS',
        color: THEME.colors.accent, // Cyan technologique
        levels: [
            { id: 1, title: "CHOISIR", subTitle: "QCM", description: "Identifiez le bon pays parmi 4 propositions.", rules: { accuracy: 80, time: 600 } },
            { id: 2, title: "TROUVER", subTitle: "LOCALISATION", description: "Localisez précisément le pays demandé sur la carte vierge.", rules: { accuracy: 100 } },
            { id: 3, title: "SAISIR", subTitle: "ORTHOGRAPHE", description: "Tapez le nom du pays sans erreur d'orthographe.", rules: { accuracy: 100 } },
            { id: 4, title: "CONTOUR", subTitle: "FORME", description: "Reconnaissez le pays uniquement à partir de sa forme.", rules: { accuracy: 100 }, color: THEME.colors.text.secondary } // Niveau "Noir/Gris" expert
        ]
    },
    flag: {
        id: 'flag',
        label: 'DRAPEAUX',
        color: THEME.colors.danger, // Rouge intense
        levels: [
            { id: 1, title: "CHOISIR", subTitle: "QCM", description: "Associez le drapeau au bon pays.", rules: { accuracy: 100 } },
            { id: 2, title: "TROUVER", subTitle: "MÉMOIRE", description: "Trouvez le pays sur la carte à partir de son drapeau.", rules: { accuracy: 100 } },
            { id: 3, title: "SAISIR", subTitle: "EXPERTISE", description: "Nommez le pays correspondant au drapeau affiché.", rules: { accuracy: 100 } }
        ]
    },
    capital: {
        id: 'capital',
        label: 'CAPITALES',
        color: THEME.colors.success, // Vert émeraude
        levels: [
            { id: 1, title: "CHOISIR", subTitle: "QCM", description: "Quelle est la capitale de ce pays ?", rules: { accuracy: 100 } },
            { id: 2, title: "TROUVER", subTitle: "PRÉCISION", description: "Placez le curseur sur l'emplacement de la capitale.", rules: { accuracy: 100 } },
            { id: 3, title: "SAISIR", subTitle: "CONNAISSANCE", description: "Écrivez le nom de la capitale sans faute.", rules: { accuracy: 100 } }
        ]
    }
};