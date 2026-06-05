// src/hooks/useLearningGame.ts
import { GameMode } from '@/constants/GameConfig';
import type { Country } from '@/data/Countries';
import { feedbackService } from '@/utils/feedbackService';
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

    useEffect(() => {
        if (batch.length > 0) {
            initPhase(1);
        }
    }, [batch]);

    useEffect(() => {
        if (queue.length > 0) {
            setMapFeedback({});
        }
    }, [queue[0]?.target?.code, queue[0]?.mode]);

    const initPhase = (p: 1 | 2) => {
        let tasks: LearningTask[] = [];

        batch.forEach(target => {
            const modes: GameMode[] = ['country', 'flag'];
            if (target.capital) modes.push('capital');

            modes.forEach(mode => {
                tasks.push({
                    target,
                    options: [...batch].sort(() => Math.random() - 0.5),
                    mode,
                    level: p
                });
            });
        });

        tasks = tasks.sort(() => Math.random() - 0.5);
        setQueue(tasks);
        setTotalInPhase(tasks.length);
        setPhase(p);
        setStatus('playing');
        setMapFeedback({});
    };

    const currentTask = queue[0];

    const validateAnswer = (answerCode: string) => {
        if (status !== 'playing' || !currentTask) return;

        const isCorrect = answerCode === currentTask.target.code;

        if (isCorrect) {
            setStatus('success');
            feedbackService.success();
            setMapFeedback({ [currentTask.target.code]: 'correct' });
        } else {
            setStatus('error');
            feedbackService.error();
            setMapFeedback({
                [answerCode]: 'wrong',
                [currentTask.target.code]: 'correct'
            });
        }
    };

    // 💡 NOUVEAU : Fonction manuelle pour passer à la suite
    const nextTask = () => {
        if (status === 'playing') return;

        const current = queue[0];
        const remaining = [...queue.slice(1)];

        if (status === 'error') {
            // RÉINJECTION : On replace la question ratée aléatoirement dans la liste restante
            const insertIndex = remaining.length > 1
                ? Math.floor(Math.random() * (remaining.length - 1)) + 1
                : 0;

            remaining.splice(insertIndex, 0, current);
            setQueue(remaining);
            setStatus('playing');
        } else if (status === 'success') {
            if (remaining.length === 0) {
                if (phase === 1) {
                    initPhase(2);
                } else {
                    onFinish();
                }
            } else {
                setQueue(remaining);
                setStatus('playing');
            }
        }
    };

    return {
        currentTask,
        phase,
        queueLength: queue.length,
        totalInPhase,
        status,
        mapFeedback,
        validateAnswer,
        nextTask // 💡 On l'expose pour l'UI
    };
};