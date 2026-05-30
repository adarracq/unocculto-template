// src/hooks/useRevisionGame.ts
import { GameMode } from '@/constants/GameConfig';
import type { Country } from '@/data/Countries';
import { useLearningStore } from '@/store/useLearningStore';
import { useEffect, useState } from 'react';

export interface RevisionTask {
    target: Country;
    options: Country[];
    mode: GameMode;
    level: 1 | 2 | 3; // On mélange QCM (1), Carte (2) et Saisie (3)
}

export const useRevisionGame = (urgentCountries: Country[], allCountries: Country[], onFinish: () => void) => {
    const [queue, setQueue] = useState<RevisionTask[]>([]);
    const [status, setStatus] = useState<'playing' | 'success' | 'error'>('playing');
    const [mapFeedback, setMapFeedback] = useState<Record<string, 'correct' | 'wrong' | 'target'>>({});
    const [totalTasks, setTotalTasks] = useState(0);

    const processAnswerInStore = useLearningStore(state => state.processAnswer);

    // Initialisation de la session
    useEffect(() => {
        if (urgentCountries.length === 0) {
            onFinish();
            return;
        }

        const tasks: RevisionTask[] = urgentCountries.map(target => {
            // 1. Choix aléatoire du Mode (Pays, Drapeau ou Capitale)
            const modes: GameMode[] = ['country', 'flag'];
            if (target.capital) modes.push('capital');
            const randomMode = modes[Math.floor(Math.random() * modes.length)];

            // 2. Choix aléatoire du Niveau de difficulté (1 = QCM, 2 = Carte, 3 = Saisie)
            const randomLevel = Math.floor(Math.random() * 3) + 1 as 1 | 2 | 3;

            // 3. Génération des options (Leurres) pour le QCM (Niveau 1)
            const options = new Set<Country>();
            options.add(target);
            while (options.size < 4) {
                const randomC = allCountries[Math.floor(Math.random() * allCountries.length)];
                if (randomC.code !== target.code && randomC.continentId === target.continentId) {
                    options.add(randomC);
                }
            }

            return {
                target,
                options: Array.from(options).sort(() => Math.random() - 0.5),
                mode: randomMode,
                level: randomLevel
            };
        });

        // Mélange du paquet
        setQueue(tasks.sort(() => Math.random() - 0.5));
        setTotalTasks(tasks.length);
        setStatus('playing');
    }, [urgentCountries]);

    const currentTask = queue[0];

    const validateAnswer = (answerCode: string) => {
        if (status !== 'playing' || !currentTask) return;

        const isCorrect = answerCode === currentTask.target.code;

        // Mise à jour de la mémoire Leitner dans le Store (MMKV/AsyncStorage)
        processAnswerInStore(currentTask.target.code, isCorrect);

        if (isCorrect) {
            setStatus('success');
            setMapFeedback({ [currentTask.target.code]: 'correct' });

            setTimeout(() => {
                const newQueue = [...queue.slice(1)];
                if (newQueue.length === 0) {
                    onFinish();
                } else {
                    setQueue(newQueue);
                    setStatus('playing');
                    setMapFeedback({});
                }
            }, 1000);

        } else {
            setStatus('error');
            setMapFeedback({
                [answerCode]: 'wrong',
                [currentTask.target.code]: 'correct'
            });

            // En cas d'erreur, on remet la question à la fin du paquet !
            setTimeout(() => {
                const failedTask = queue[0];
                const remaining = [...queue.slice(1)];

                // Change de niveau pour ne pas reposer la même question à l'identique (Optionnel mais sympa)
                failedTask.level = failedTask.level === 1 ? 2 : 1;

                remaining.push(failedTask); // À la fin de la file

                setQueue(remaining);
                setTotalTasks(prev => prev + 1); // La session s'allonge
                setStatus('playing');
                setMapFeedback({});
            }, 1500);
        }
    };

    return {
        currentTask,
        queueLength: queue.length,
        totalTasks,
        status,
        mapFeedback,
        validateAnswer
    };
};