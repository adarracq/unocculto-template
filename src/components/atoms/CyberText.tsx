// src/components/atoms/CyberText.tsx
import { StyleSheet, Text, type TextProps } from 'react-native';
import { THEME } from '../../theme/theme';

export type CyberTextProps = TextProps & {
    variant?: 'h1' | 'h2' | 'body' | 'bodySmall' | 'caps' | 'label';
    colorType?: 'primary' | 'secondary' | 'disabled';
    accent?: 'primary' | 'danger' | 'success' | 'accent';
    align?: 'left' | 'center' | 'right';
};

export function CyberText({
    style,
    variant = 'body',
    colorType = 'primary',
    accent,
    align = 'left',
    ...rest
}: CyberTextProps) {

    // Résolution de la couleur
    let textColor: string = THEME.colors.text[colorType];
    if (accent) {
        textColor = THEME.colors[accent];
    }

    return (
        <Text
            style={[
                { color: textColor, textAlign: align },
                styles[variant],
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 32,
        fontWeight: '800',
        letterSpacing: -1, // Titres massifs et serrés (style Apple/Stripe)
        lineHeight: 38,
    },
    h2: {
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: -0.5,
        lineHeight: 28,
    },
    body: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 0.2,
    },
    bodySmall: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        letterSpacing: 0.3,
    },
    caps: { // Pour les sur-titres et labels
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    label: { // Chiffres de statistiques ou valeurs fortes
        fontSize: 40,
        fontWeight: '900',
        letterSpacing: -1.5,
    }
});