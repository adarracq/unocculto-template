// src/components/atoms/GlassContainer.tsx
import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { THEME } from '../../theme/theme';

interface GlassContainerProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    intensity?: number;
    borderRadius?: number;
    hasGlow?: boolean;
}

export const GlassContainer = ({
    children,
    style,
    intensity = 40,
    borderRadius = THEME.metrics.radius.md,
    hasGlow = false,
}: GlassContainerProps) => {
    return (
        <View style={[styles.outerWrapper, hasGlow && styles.glowEffect, style]}>
            <View style={[styles.wrapper, { borderRadius }]}>
                {/* Le flou est plaqué en arrière-plan absolu */}
                <BlurView intensity={intensity} tint="dark" style={StyleSheet.absoluteFill} />

                {/* La couche de couleur ultra-fine (1 à 2% d'opacité) */}
                <View style={[StyleSheet.absoluteFill, { backgroundColor: THEME.colors.glass.background }]} />

                {/* Le contenu dicte la taille de la carte */}
                <View style={styles.content}>
                    {children}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerWrapper: {
        width: '100%', // S'assure que le conteneur prend la largeur dispo sans s'étirer verticalement
    },
    glowEffect: {
        shadowColor: THEME.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 10,
    },
    wrapper: {
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
        borderTopColor: THEME.colors.glass.borderHighlight,
        borderLeftColor: THEME.colors.glass.borderHighlight,
    },
    content: {
        padding: THEME.metrics.spacing.lg, // Un padding généreux fait toute la différence
    },
});