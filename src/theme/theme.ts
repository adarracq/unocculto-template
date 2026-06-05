// src/theme/theme.ts

export const THEME = {
    colors: {
        background: '#09090B', // Zinc-950 : Un noir très profond et élégant
        backgroundLight: '#18181B', // Zinc-900
        backgroundVeryLight: '#27272A', // Zinc-800
        primary: '#D4AF37', // Or premium maintenu
        accent: '#00F0FF', // Cyan pur
        danger: '#FF453A', // Rouge iOS Dark Mode (plus tranchant)
        inProgress: '#38BDF8', // Bleu ciel éclatant (bien plus lisible que le pastel)
        success: '#30D158', // Vert iOS Dark Mode (plus néon, moins terne)

        levels: {
            locked: '#333333',
            bronze: '#CD7F32',
            silver: '#C0C0C0',
            gold: '#D4AF37',
        },

        modes: {
            country: '#00E5FF', // Hologram Azure
            flag: '#FF2A6D',    // Plasma Pink
            capital: '#B026FF', // Cyber Purple
        },

        glass: {
            background: 'rgba(255, 255, 255, 0.03)',
            border: 'rgba(255, 255, 255, 0.08)',
            borderHighlight: 'rgba(255, 255, 255, 0.20)', // Légèrement adouci pour plus de finesse
        },
        text: {
            primary: '#F8F9FA',
            secondary: '#A1A1AA', // Zinc-400 (plus neutre)
            disabled: '#52525B', // Zinc-600
        }
    },
    paddings: {
        top: 20,
        horizontal: 20,
        bottom: 20,
    },

    metrics: {
        radius: {
            sm: 12,
            md: 20,
            lg: 32,
            round: 9999,
        },
        spacing: {
            xxs: 4,
            xs: 8,
            sm: 12,
            md: 16,
            lg: 24,
            xl: 32,
            xxl: 48,
        }
    }
} as const;

export type Theme = typeof THEME;