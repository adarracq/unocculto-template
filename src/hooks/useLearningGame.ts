// src/hooks/useLearningGame.ts
import { GameMode } from '@/constants/GameConfig';
import type { Country } from '@/data/Countries';
import { useEffect, useState } from 'react';

export interface LearningTask {
    target: Country;
    options: Country[];
    mode: GameMode;
    level: 1 | 2; // 1 = Choisir (GameLevel1View), 2 = Trouver (GameLevel2View)
}

export const useLearningGame = (batch: Country[], onFinish: () => void) => {
    const [phase, setPhase] = useState<1 | 2>(1);
    const [queue, setQueue] = useState<LearningTask[]>([]);
    const [status, setStatus] = useState<'playing' | 'success' | 'error'>('playing');
    const [mapFeedback, setMapFeedback] = useState<Record<string, 'correct' | 'wrong' | 'target'>>({});
    const [totalInPhase, setTotalInPhase] = useState(0);

    // Initialisation de la Phase 1 au montage
    useEffect(() => {
        if (batch.length > 0) {
            initPhase(1);
        }
    }, [batch]);

    const initPhase = (p: 1 | 2) => {
        let tasks: LearningTask[] = [];

        // Génération des 12 tâches (4 pays x 3 modes)
        batch.forEach(target => {
            const modes: GameMode[] = ['country', 'flag'];
            if (target.capital) modes.push('capital'); // Sécurité si pas de capitale

            modes.forEach(mode => {
                tasks.push({
                    target,
                    // Les options sont toujours exactement les 4 pays du lot (mélangés)
                    options: [...batch].sort(() => Math.random() - 0.5),
                    mode,
                    level: p
                });
            });
        });

        // Mélange initial de la file
        tasks = tasks.sort(() => Math.random() - 0.5);
        setQueue(tasks);
        setTotalInPhase(tasks.length);
        setPhase(p);
        setStatus('playing');
    };

    const currentTask = queue[0];

    const validateAnswer = (answerCode: string) => {
        if (status !== 'playing' || !currentTask) return;

        const isCorrect = answerCode === currentTask.target.code;

        if (isCorrect) {
            setStatus('success');
            setMapFeedback({ [currentTask.target.code]: 'correct' });

            setTimeout(() => {
                const newQueue = [...queue.slice(1)]; // On retire la question réussie

                if (newQueue.length === 0) {
                    if (phase === 1) {
                        initPhase(2); // On passe au niveau 2
                    } else {
                        onFinish(); // Jeu terminé !
                    }
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
                [currentTask.target.code]: 'correct' // Montre la bonne réponse
            });

            setTimeout(() => {
                const failedTask = queue[0];
                const remaining = [...queue.slice(1)];

                // 💡 RÉINJECTION : On replace la question ratée aléatoirement dans la liste restante
                // (Mais on évite de la remettre immédiatement en position 0 si la liste est longue)
                const insertIndex = remaining.length > 1
                    ? Math.floor(Math.random() * (remaining.length - 1)) + 1
                    : 0;

                remaining.splice(insertIndex, 0, failedTask);

                setQueue(remaining);
                setStatus('playing');
                setMapFeedback({});
            }, 1500);
        }
    };

    return {
        currentTask,
        phase,
        queueLength: queue.length,
        totalInPhase,
        status,
        mapFeedback,
        validateAnswer
    };
};