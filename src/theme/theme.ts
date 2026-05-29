// src/theme/theme.ts

export const THEME = {
    colors: {
        background: '#050505',
        backgroundLight: '#1a1a1a',
        primary: '#D4AF37',
        secondary: '#8E9AAF',
        accent: '#00F0FF',
        danger: '#FF4C4C',
        success: '#4CAF50',

        // --- NOUVEAU : Couleurs de progression ---
        levels: {
            locked: '#333333',     // Gris sombre pour le cadenas/vide
            bronze: '#CD7F32',     // Niveau 1
            silver: '#C0C0C0',     // Niveau 2
            gold: '#D4AF37',       // Niveau 3 (Utilise le même Or que la couleur primaire)
        },
        // -----------------------------------------

        glass: {
            background: 'rgba(255, 255, 255, 0.02)',
            border: 'rgba(255, 255, 255, 0.08)',
            borderHighlight: 'rgba(255, 255, 255, 0.25)',
        },
        text: {
            primary: '#F8F9FA',
            secondary: '#A0AABF',
            disabled: '#4A5060',
        }
    },

    metrics: {
        radius: {
            sm: 12,
            md: 20, // Rayons plus généreux pour un aspect moderne
            lg: 32,
            round: 9999,
        },
        spacing: {
            xs: 4,
            sm: 8,
            md: 16,
            lg: 24,
            xl: 32,
            xxl: 48,
        }
    }
} as const;

export type Theme = typeof THEME;