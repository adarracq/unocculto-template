import { THEME } from '@/theme/theme';
import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export type TextVariant = 'h1' | 'h2' | 'body' | 'bodySmall' | 'caps';
export type ColorType = 'primary' | 'secondary' | 'disabled' | 'accent';

interface CyberTextProps extends TextProps {
    variant?: TextVariant;
    colorType?: ColorType;
    align?: 'left' | 'center' | 'right';
    children: React.ReactNode;
}

export const CyberText = ({
    variant = 'body',
    colorType = 'primary',
    align = 'left',
    style,
    children,
    ...rest
}: CyberTextProps) => {

    // Attribution de la couleur selon votre THEME
    const getColor = () => {
        switch (colorType) {
            case 'secondary': return THEME.colors.text.secondary;
            case 'disabled': return THEME.colors.text.disabled;
            case 'accent': return THEME.colors.primary; // L'Or ou la couleur d'accentuation
            default: return THEME.colors.text.primary;
        }
    };

    return (
        <Text
            style={[
                styles.base,
                styles[variant],
                { color: getColor(), textAlign: align },
                style,
            ]}
            {...rest}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    base: {
        fontFamily: 'Jakarta-Regular', // 💡 Par défaut, tout le texte utilisera cette police
    },

    // TITRES
    h1: {
        fontFamily: 'Jakarta-ExtraBold', // 💡 Remplace le fontWeight: '800'
        fontSize: 28,
        letterSpacing: -0.5,
        lineHeight: 34,
    },
    h2: {
        fontFamily: 'Jakarta-SemiBold', // 💡 Remplace le fontWeight: '600'
        fontSize: 20,
        letterSpacing: -0.3,
        lineHeight: 26,
    },

    // CORPS DE TEXTE
    body: {
        fontFamily: 'Jakarta-Regular',
        fontSize: 16,
        letterSpacing: 0,
        lineHeight: 24,
    },
    bodySmall: {
        fontFamily: 'Jakarta-Regular',
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 20,
    },

    // SUR-TITRES / BADGES
    caps: {
        fontFamily: 'Jakarta-Bold', // 💡 Remplace le fontWeight: '700'
        fontSize: 11,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
});