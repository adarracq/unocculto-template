import { MyText } from '@/components/atoms/MyText';
import InteractiveMap from '@/components/organisms/InteractiveMap';
import { MICRO_STATES } from '@/data/Countries';
import { THEME } from '@/theme/theme';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { GameViewProps } from '../GeoGameScreen';
import ArcadeControls from './ArcadeControls';

interface Props extends GameViewProps {
    hasFloatingButton?: boolean;
}

export default function GameLevel1View({ engine, mode, hasFloatingButton = false }: Props) {

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

        colors[target.code] = THEME.colors.primary;

        Object.keys(mapFeedback).forEach(code => {
            if (mapFeedback[code] === 'correct') colors[code] = THEME.colors.success;
            if (mapFeedback[code] === 'wrong') colors[code] = THEME.colors.danger;
        });

        return colors;
    };

    const getInstructionText = () => {
        return mode === 'capital' ? "IDENTIFIEZ LA CAPITALE" : "IDENTIFIEZ CE TERRITOIRE";
    };

    // CREATION D'UNE CLÉ UNIQUE POUR LA QUESTION ACTUELLE
    const questionKey = `${target.code}-${mode}-${currentQuestion.options[0]?.code}`;

    return (
        <View style={styles.container}>

            <View style={styles.visualArea}>
                <View style={styles.overlay}>
                    <View style={styles.instructionBadge}>
                        <MyText variant="caps" style={{ color: THEME.colors.background, letterSpacing: 1 }}>
                            {getInstructionText()}
                        </MyText>
                    </View>
                </View>

                <InteractiveMap
                    countryColors={getMapColors()}
                    focusCoordinates={cameraTarget}
                    zoomLevel={zoomLevel}
                />
            </View>

            <View style={[
                styles.bottomArea,
                { paddingBottom: (status === 'error' && hasFloatingButton) ? 120 : 30 }
            ]}>
                <ArcadeControls
                    key={questionKey}
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
        position: 'relative',
    },
    visualArea: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
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
        // Le paddingVertical original a été séparé : le paddingTop reste fixe, 
        // tandis que le paddingBottom est géré dynamiquement plus haut.
        paddingTop: 30,
    },
});