import { GameMode } from '@/constants/GameConfig';
import type { Country } from '@/data/Countries';
import { useLearningStore } from '@/store/useLearningStore';
import { useEffect, useRef, useState } from 'react';

export interface RevisionTask {
    target: Country;
    options: Country[];
    mode: GameMode;
    level: 1 | 2 | 3;
}

export interface RevisionStats {
    timeTaken: number;
    accuracy: number;
    errors: number;
}

export const useRevisionGame = (urgentCountries: Country[], allCountries: Country[], onFinish: (stats: RevisionStats) => void) => {
    const [queue, setQueue] = useState<RevisionTask[]>([]);
    const [status, setStatus] = useState<'playing' | 'success' | 'error'>('playing');
    const [mapFeedback, setMapFeedback] = useState<Record<string, 'correct' | 'wrong' | 'target'>>({});
    const [totalTasks, setTotalTasks] = useState(0);

    const [errorsCount, setErrorsCount] = useState(0);
    const [countryFails, setCountryFails] = useState<Record<string, boolean>>({});
    const startTimeRef = useRef<number>(0);
    const baseTasksCountRef = useRef<number>(0);

    const processAnswerInStore = useLearningStore(state => state.processAnswer);
    const memoryMap = useLearningStore(state => state.memoryMap);

    useEffect(() => {
        if (urgentCountries.length === 0) return;

        startTimeRef.current = Date.now();
        const tasks: RevisionTask[] = [];

        urgentCountries.forEach(target => {
            const options = new Set<Country>();
            options.add(target);
            while (options.size < 4) {
                const randomC = allCountries[Math.floor(Math.random() * allCountries.length)];
                if (randomC.code !== target.code && randomC.continentId === target.continentId) {
                    options.add(randomC);
                }
            }
            const optionsArray = Array.from(options).sort(() => Math.random() - 0.5);

            const box = memoryMap[target.code]?.box || 1;
            const hasCapital = !!target.capital;

            if (box === 1) {
                // BOÎTE 1 : Reconnaissance (Drapeau + Capitale + Carte Pays)
                tasks.push({ target, options: optionsArray, mode: 'flag', level: 1 });
                if (hasCapital) tasks.push({ target, options: optionsArray, mode: 'capital', level: 1 });
                tasks.push({ target, options: optionsArray, mode: 'country', level: 2 });

            } else if (box === 2) {
                // BOÎTE 2 : Géographie (Carte Pays + Carte Capitale)
                tasks.push({ target, options: optionsArray, mode: 'country', level: 2 });
                if (hasCapital) tasks.push({ target, options: optionsArray, mode: 'capital', level: 2 });

            } else if (box === 3) {
                // BOÎTE 3 : Mixte (Saisie Pays + Visuel Capitale)
                if (hasCapital) {
                    const randomCapitalLevel = Math.random() > 0.5 ? 1 : 2; // QCM ou Carte
                    tasks.push({ target, options: optionsArray, mode: 'capital', level: randomCapitalLevel });
                }
                tasks.push({ target, options: optionsArray, mode: 'country', level: 3 });

            } else if (box === 4) {
                // BOÎTE 4 : Expert (Saisie Pays + Saisie Capitale)
                tasks.push({ target, options: optionsArray, mode: 'country', level: 3 });
                if (hasCapital) tasks.push({ target, options: optionsArray, mode: 'capital', level: 3 });
            }
        });

        // 💡 LE TRI RESTE STRICTEMENT PAR NIVEAU (Tous les QCM, puis toutes les Cartes, puis tous les Claviers)
        tasks.sort((a, b) => {
            if (a.level !== b.level) return a.level - b.level;
            return Math.random() - 0.5;
        });

        setQueue(tasks);
        setTotalTasks(tasks.length);
        baseTasksCountRef.current = tasks.length;
        setStatus('playing');
    }, [urgentCountries, allCountries]);

    const currentTask = queue[0];

    const validateAnswer = (answerCode: string) => {
        if (status !== 'playing' || !currentTask) return;

        const isCorrect = answerCode === currentTask.target.code;

        if (isCorrect) {
            setStatus('success');
            setMapFeedback({ [currentTask.target.code]: 'correct' });
        } else {
            setStatus('error');
            setErrorsCount(e => e + 1);
            setCountryFails(prev => ({ ...prev, [currentTask.target.code]: true }));
            setMapFeedback({
                [answerCode]: 'wrong',
                [currentTask.target.code]: 'correct'
            });
        }
    };

    const nextTask = () => {
        if (status === 'playing') return;

        const current = queue[0];
        const remaining = [...queue.slice(1)];

        if (status === 'error') {
            const nextLevelIndex = remaining.findIndex(t => t.level > current.level);
            if (nextLevelIndex === -1) {
                remaining.push(current);
            } else {
                remaining.splice(nextLevelIndex, 0, current);
            }
            setTotalTasks(prev => prev + 1);
        }

        if (remaining.length === 0) {
            urgentCountries.forEach(c => {
                const hasFailed = countryFails[c.code] || false;
                processAnswerInStore(c.code, !hasFailed);
            });

            const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);
            const accuracy = Math.max(0, Math.round(((baseTasksCountRef.current - errorsCount) / baseTasksCountRef.current) * 100));

            onFinish({ timeTaken, accuracy, errors: errorsCount });
        } else {
            setQueue(remaining);
            setStatus('playing');
            setMapFeedback({});
        }
    };

    return { currentTask, queueLength: queue.length, totalTasks, status, mapFeedback, validateAnswer, nextTask };
};