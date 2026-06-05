// src/screens/learn/components/DiscoveryGameController.tsx
import MyButton from '@/components/atoms/MyButton'; // 💡 Import du bouton
import type { Country } from '@/data/Countries';
import { useLearningGame } from '@/hooks/useLearningGame';
import { useEffect } from 'react'; // 💡 Import useEffect
import { Keyboard, StyleSheet, View } from 'react-native'; // 💡 Import Keyboard

import GameLevel1View from '@/screens/geogames/components/GameLevel1View';
import GameLevel2View from '@/screens/geogames/components/GameLevel2View';
import { THEME } from '@/theme/theme';
import DiscoveryHeader from './DiscoveryHeader';

interface Props {
    sessionCountries: Country[];
    onFinish: () => void;
}

export default function DiscoveryGameController({ sessionCountries, onFinish }: Props) {
    const {
        currentTask,
        phase,
        queueLength,
        totalInPhase,
        status,
        mapFeedback,
        validateAnswer,
        nextTask // 💡 Récupération de l'action
    } = useLearningGame(sessionCountries, onFinish);

    // 💡 GESTION INTELLIGENTE DU FLUX ET DU CLAVIER (Copie exacte des révisions)
    useEffect(() => {
        if (status === 'success') {
            const timer = setTimeout(() => {
                nextTask();
            }, 1000);
            return () => clearTimeout(timer);
        } else if (status === 'error') {
            Keyboard.dismiss();
        }
    }, [status]);

    if (!currentTask) return null;

    const progress = (totalInPhase - queueLength) / totalInPhase;
    const ViewComponent = currentTask.level === 1 ? GameLevel1View : GameLevel2View;

    const engineAdapter = {
        currentQuestion: {
            target: currentTask.target,
            options: currentTask.options
        },
        validateAnswer: validateAnswer,
        mapFeedback: mapFeedback,
        status: status,
        currentIndex: totalInPhase - queueLength,
        total: totalInPhase,
        errors: 0,
        elapsedTime: 0,
    } as any;

    const currentRegionCode = (currentTask.target as any).continentId || 'WLD';

    return (
        <View style={styles.container}>

            <DiscoveryHeader
                phase={phase}
                progress={progress}
                remaining={queueLength}
            />

            <View style={styles.gameWrapper}>
                <ViewComponent
                    engine={engineAdapter}
                    mode={currentTask.mode}
                    regionCode={currentRegionCode}
                    hasFloatingButton={true}
                />
            </View>

            {/* 💡 BOUTON FLOTTANT D'ERREUR */}
            {status === 'error' && (
                <View style={styles.floatingErrorBtn}>
                    <MyButton
                        title="J'AI COMPRIS"
                        onPress={nextTask}
                        variant="danger"
                        iconRight="arrow-forward"
                        iconLeft='checkmark'
                    />
                </View>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background,
    },
    gameWrapper: {
        flex: 1,
        // On retire le paddingBottom pour que la carte respire
    },
    // 💡 Style du bouton flottant (Identique à RevisionSessionScreen)
    floatingErrorBtn: {
        position: 'absolute',
        bottom: 40,
        left: THEME.paddings.horizontal,
        right: THEME.paddings.horizontal,
        zIndex: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
    }
});