import type { Country } from '@/data/Countries'; // Ajustez le chemin
import { useLearningGame } from '@/hooks/useLearningGame';
import { StyleSheet, View } from 'react-native';

import GameLevel1View from '@/screens/geogames/components/GameLevel1View';
import GameLevel2View from '@/screens/geogames/components/GameLevel2View';
import { THEME } from '@/theme/theme';
import DiscoveryHeader from './DiscoveryHeader';

interface Props {
    sessionCountries: Country[];
    onFinish: () => void;
}

export default function DiscoveryGameController({ sessionCountries, onFinish }: Props) {
    // 1. On lance le moteur de répétition espacée (Learning Hook)
    const {
        currentTask,
        phase,
        queueLength,
        totalInPhase,
        status,
        mapFeedback,
        validateAnswer
    } = useLearningGame(sessionCountries, onFinish);

    if (!currentTask) return null;

    const progress = (totalInPhase - queueLength) / totalInPhase;

    // 2. Sélection de la vue selon la phase d'apprentissage
    const ViewComponent = currentTask.level === 1 ? GameLevel1View : GameLevel2View;

    // 3. ADAPTATEUR D'ENGINE
    // Les vues de l'Arène s'attendent à recevoir un objet "engine" complet issu de useArcadeGame.
    // On mappe nos données d'apprentissage pour tromper la vue et lui donner ce qu'elle veut.
    const engineAdapter = {
        currentQuestion: {
            target: currentTask.target,
            options: currentTask.options
        },
        validateAnswer: validateAnswer,
        mapFeedback: mapFeedback,
        status: status,
        // Les valeurs suivantes sont requises par le type, mais peu ou pas utilisées dans les Vues 1 & 2
        currentIndex: totalInPhase - queueLength,
        total: totalInPhase,
        errors: 0,
        elapsedTime: 0,
    } as any; // On force le type pour éviter l'erreur de ReturnType<typeof useArcadeGame>

    // Récupération de la région cible (Assurez-vous du nom de la propriété, ex: continentId)
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
                />
            </View>

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
    }
});