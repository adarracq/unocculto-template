import { THEME } from '@/theme/theme';
import { StyleSheet, View } from 'react-native';

import type { GameViewProps } from '../GeoGameScreen';
import ArcadeSaisieControls from './ArcadeSaisieControls';
import SingleCountryMap from './SingleCountryMap';

export default function GameLevel4View({ engine, mode }: GameViewProps) {
    const { currentQuestion, validateAnswer, status } = engine;

    if (!currentQuestion) return null;
    const target = currentQuestion.target;

    // --- LOGIQUE DE VALIDATION TEXTUELLE ---
    const handleTextSubmit = (text: string) => {
        // Normalisation : Retire les accents, passe en minuscules et supprime les espaces inutiles
        const normalize = (str: string) =>
            str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

        const input = normalize(text);
        // Compare selon le mode demandé (pays ou capitale)
        const expected = mode === 'capital'
            ? normalize(target.capital || '')
            : normalize(target.name_fr || target.name_fr || '');

        if (input === expected) {
            validateAnswer(target.code); // Bonne réponse !
        } else {
            validateAnswer('WRONG_CODE'); // Erreur !
        }
    };

    return (
        <View style={styles.container}>

            {/* 1. INPUT : En haut dans le flux normal */}
            <View style={styles.inputWrapper}>
                <ArcadeSaisieControls
                    status={status as 'playing' | 'success' | 'error'}
                    onSubmit={handleTextSubmit}
                    placeholder={`IDENTIFIEZ ${mode === 'capital' ? 'LA CAPITALE' : 'LE TERRITOIRE'}`}
                />
            </View>

            {/* 2. MAP : Prend tout l'espace restant pour afficher la silhouette */}
            <View style={styles.mapArea}>
                <SingleCountryMap
                    countryCode={target.code}
                    status={status as 'playing' | 'success' | 'error'}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: THEME.colors.background,
    },
    inputWrapper: {
        width: '100%',
        zIndex: 20,
        paddingHorizontal: THEME.metrics.spacing.lg,
        paddingTop: THEME.metrics.spacing.md,
        paddingBottom: THEME.metrics.spacing.md,
    },
    mapArea: {
        flex: 1,
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
    }
});