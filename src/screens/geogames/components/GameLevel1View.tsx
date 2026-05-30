import { CyberText } from '@/components/atoms/CyberText';
import InteractiveMap from '@/components/organisms/InteractiveMap';
import { MICRO_STATES } from '@/data/Countries'; // Ajustez l'import selon votre fichier
import { THEME } from '@/theme/theme';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { GameViewProps } from '../GeoGameScreen';
import ArcadeControls from './ArcadeControls';


export default function GameLevel1View({ engine, mode }: GameViewProps) {

    const { currentQuestion, validateAnswer, mapFeedback, status } = engine;
    const target = currentQuestion.target;

    // --- LOGIQUE CAMERA (Focus Auto) ---
    const cameraTarget = useMemo<[number, number] | null>(() => {
        if (!target.longitude || !target.latitude) return null;
        return [target.longitude, target.latitude];
    }, [target]);

    const zoomLevel = useMemo(() => {
        const isMicro = MICRO_STATES.includes(target.code);
        return isMicro ? 5 : 3;
    }, [target]);

    // --- LOGIQUE COULEURS (Mise en évidence et Feedback) ---
    const getMapColors = () => {
        const colors: Record<string, string> = {};

        // 1. Highlight de la cible (Bleu/Or selon le thème)
        colors[target.code] = THEME.colors.primary;

        // 2. Écrase avec le Feedback (Vert/Rouge) après le clic
        Object.keys(mapFeedback).forEach(code => {
            if (mapFeedback[code] === 'correct') colors[code] = THEME.colors.success;
            if (mapFeedback[code] === 'wrong') colors[code] = THEME.colors.danger;
        });

        return colors;
    };

    const getInstructionText = () => {
        return mode === 'capital' ? "IDENTIFIEZ LA CAPITALE" : "IDENTIFIEZ CE TERRITOIRE";
    };

    return (
        <View style={styles.container}>

            {/* 1. ZONE VISUELLE (CARTE) */}
            <View style={styles.visualArea}>
                {/* HUD Overlay - Instruction */}
                <View style={styles.overlay}>
                    <View style={styles.instructionBadge}>
                        <CyberText variant="caps" style={{ color: THEME.colors.background, letterSpacing: 1 }}>
                            {getInstructionText()}
                        </CyberText>
                    </View>
                </View>

                {/* La Carte avec MapLibre */}
                <InteractiveMap
                    countryColors={getMapColors()}
                    focusCoordinates={cameraTarget}
                    zoomLevel={zoomLevel}
                />
            </View>

            {/* 2. ZONE DE CONTRÔLE (BOUTONS QCM) */}
            <View style={styles.bottomArea}>
                <ArcadeControls
                    mode={mode}
                    options={currentQuestion.options}
                    targetCode={target.code}
                    status={status as 'playing' | 'success' | 'error'}
                    onSelect={validateAnswer}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // On détache la vue pour qu'elle s'étende proprement
        position: 'relative',
    },
    visualArea: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        // Léger arrondi et bordure pour encapsuler la carte (optionnel)
        borderRadius: THEME.metrics.radius.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
        marginHorizontal: THEME.metrics.spacing.lg,
        marginTop: 10,
    },
    overlay: {
        position: 'absolute',
        top: 20,
        width: '100%',
        alignItems: 'center',
        zIndex: 5,
        pointerEvents: 'none',
    },
    instructionBadge: {
        backgroundColor: THEME.colors.text.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: THEME.metrics.radius.round,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    bottomArea: {
        minHeight: 180,
        justifyContent: 'center',
        paddingHorizontal: THEME.metrics.spacing.lg,
        paddingVertical: 30,
        // Suppression du fond semi-transparent pour garder l'aspect OLED propre, 
        // les boutons se détacheront naturellement sur le noir.
    },
});