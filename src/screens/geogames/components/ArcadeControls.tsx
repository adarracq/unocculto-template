// src/screens/arena/geogames/components/ArcadeControls.tsx
import { CyberText } from '@/components/atoms/CyberText';
import { GameMode } from '@/constants/GameConfig';
import { Country, getFlagImage } from '@/data/Countries';
import { THEME } from '@/theme/theme';
import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
    options: Country[];
    targetCode: string;
    mode: GameMode;
    status: 'playing' | 'success' | 'error';
    onSelect: (code: string) => void;
}

export default function ArcadeControls({ options, targetCode, mode, status, onSelect }: Props) {
    const [selectedCode, setSelectedCode] = useState<string | null>(null);

    const handlePress = (code: string) => {
        if (status !== 'playing') return; // Bloque le clic si l'animation est en cours
        setSelectedCode(code);
        onSelect(code);
    };

    const getButtonStyles = (code: string) => {
        const isSelected = selectedCode === code;
        const isTarget = code === targetCode;

        // État initial (En jeu)
        if (status === 'playing') {
            return {
                borderColor: isSelected ? THEME.colors.primary : THEME.colors.glass.border,
                backgroundColor: isSelected ? THEME.colors.primary + '20' : 'rgba(255,255,255,0.03)',
                opacity: 1
            };
        }

        // Révélation (Succès ou Erreur)
        if (isTarget) {
            // La bonne réponse clignote en vert
            return {
                borderColor: THEME.colors.success,
                backgroundColor: THEME.colors.success + '30',
                opacity: 1
            };
        }

        if (isSelected && !isTarget) {
            // Le mauvais choix de l'utilisateur reste rouge
            return {
                borderColor: THEME.colors.danger,
                backgroundColor: THEME.colors.danger + '30',
                opacity: 1
            };
        }

        // Les autres choix non sélectionnés s'estompent
        return {
            borderColor: THEME.colors.glass.border,
            backgroundColor: 'rgba(255,255,255,0.01)',
            opacity: 0.3
        };
    };

    const renderContent = (country: Country) => {
        if (mode === 'flag') {
            return (
                <View style={styles.flagWrapper}>
                    <Image source={getFlagImage(country.code)} style={styles.flagImg} />
                </View>
            );
        }

        const label = mode === 'capital' ? (country.capital || 'N/A') : country.name_fr.toUpperCase();
        return <CyberText variant="h2" align="center" style={{ fontSize: 16 }}>{label}</CyberText>;
    };

    return (
        <View style={styles.container}>
            {options.map((option) => {
                const stylesDyn = getButtonStyles(option.code);

                return (
                    <TouchableOpacity
                        key={option.code}
                        activeOpacity={0.7}
                        onPress={() => handlePress(option.code)}
                        style={[styles.button, stylesDyn]}
                    >
                        {renderContent(option)}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: THEME.metrics.spacing.md,
        width: '100%',
    },
    button: {
        width: '47%', // 2 colonnes
        minHeight: 80,
        borderRadius: THEME.metrics.radius.md,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: THEME.metrics.spacing.sm,
    },
    flagWrapper: {
        width: '100%',
        aspectRatio: 1.5,
        borderRadius: 4,
        overflow: 'hidden',
    },
    flagImg: {
        width: '100%',
        height: '100%',
    }
});