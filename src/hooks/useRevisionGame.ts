import { GameMode } from '@/constants/GameConfig';
import type { Country } from '@/data/Countries';
import { useLearningStore } from '@/store/useLearningStore';
import { useEffect, useState } from 'react';

export interface RevisionTask {
    target: Country;
    options: Country[];
    mode: GameMode;
    level: 1 | 2 | 3;
}

export const useRevisionGame = (urgentCountries: Country[], allCountries: Country[], onFinish: () => void) => {
    const [queue, setQueue] = useState<RevisionTask[]>([]);
    const [status, setStatus] = useState<'playing' | 'success' | 'error'>('playing');
    const [mapFeedback, setMapFeedback] = useState<Record<string, 'correct' | 'wrong' | 'target'>>({});
    const [totalTasks, setTotalTasks] = useState(0);

    const processAnswerInStore = useLearningStore(state => state.processAnswer);

    useEffect(() => {
        if (urgentCountries.length === 0) {
            onFinish();
            return;
        }

        const tasks: RevisionTask[] = urgentCountries.map(target => {
            const modes: GameMode[] = ['country', 'flag'];
            if (target.capital) modes.push('capital');
            const randomMode = modes[Math.floor(Math.random() * modes.length)];

            const randomLevel = Math.floor(Math.random() * 3) + 1 as 1 | 2 | 3;

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

        const shuffledTasks = tasks.sort(() => Math.random() - 0.5);
        const groupedTasks = shuffledTasks.sort((a, b) => a.level - b.level);

        setQueue(groupedTasks);
        setTotalTasks(groupedTasks.length);
        setStatus('playing');
    }, [urgentCountries]);

    const currentTask = queue[0];

    const validateAnswer = (answerCode: string) => {
        if (status !== 'playing' || !currentTask) return;

        const isCorrect = answerCode === currentTask.target.code;
        processAnswerInStore(currentTask.target.code, isCorrect);

        if (isCorrect) {
            setStatus('success');
            setMapFeedback({ [currentTask.target.code]: 'correct' });
        } else {
            setStatus('error');
            setMapFeedback({
                [answerCode]: 'wrong',
                [currentTask.target.code]: 'correct'
            });
        }
    };

    // 💡 NOUVELLE FONCTION : Passage manuel à la question suivante
    const nextTask = () => {
        if (status === 'playing') return;

        const current = queue[0];
        const remaining = [...queue.slice(1)];

        if (status === 'error') {
            // En cas d'erreur, on réinsère la question à la fin de son bloc de niveau
            const nextLevelIndex = remaining.findIndex(t => t.level > current.level);

            if (nextLevelIndex === -1) {
                remaining.push(current);
            } else {
                remaining.splice(nextLevelIndex, 0, current);
            }
            setTotalTasks(prev => prev + 1);
        }

        if (remaining.length === 0) {
            onFinish();
        } else {
            setQueue(remaining);
            setStatus('playing');
            setMapFeedback({});
        }
    };

    return {
        currentTask,
        queueLength: queue.length,
        totalTasks,
        status,
        mapFeedback,
        validateAnswer,
        nextTask // 💡 Exposée pour l'UI
    };
};