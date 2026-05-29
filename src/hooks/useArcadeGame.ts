// src/hooks/useArcadeGame.ts
import { GameMode } from '@/constants/GameConfig';
import { Country } from '@/data/Countries';
import { useEffect, useRef, useState } from 'react';

export interface Question {
    target: Country;
    options: Country[];
}

export const useArcadeGame = (
    regionCountries: Country[],
    level: number,
    mode: GameMode,
    onGameFinish: (stats: { timeTaken: number; accuracy: number; errors: number }) => void
) => {
    const [queue, setQueue] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [errors, setErrors] = useState(0);
    const [status, setStatus] = useState<'loading' | 'playing' | 'success' | 'error' | 'finished'>('loading');
    const [mapFeedback, setMapFeedback] = useState<Record<string, 'correct' | 'wrong' | 'target'>>({});

    const startTimeRef = useRef<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (regionCountries.length === 0) return;

        const generated: Question[] = [];
        const targets = [...regionCountries].sort(() => Math.random() - 0.5);

        targets.forEach(target => {
            const options = new Set<Country>();
            options.add(target);

            // On ajoute des leurres uniques
            while (options.size < 4) {
                const randomC = regionCountries[Math.floor(Math.random() * regionCountries.length)];
                if (randomC.code !== target.code) options.add(randomC);
            }
            generated.push({
                target,
                options: Array.from(options).sort(() => Math.random() - 0.5)
            });
        });

        setQueue(generated);
        setStatus('playing');
        startTimeRef.current = Date.now();

        timerIntervalRef.current = setInterval(() => {
            if (startTimeRef.current) {
                setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
            }
        }, 1000);

        return () => {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current as number);
        };
    }, [regionCountries]);

    const currentQuestion = queue[currentIndex];

    const validateAnswer = (answerCountryCode: string) => {
        if (status !== 'playing' || !currentQuestion) return;

        const isCorrect = answerCountryCode === currentQuestion.target.code;

        if (isCorrect) {
            setStatus('success');
            // functions.vibrate('small-success');
            setMapFeedback({ [currentQuestion.target.code]: 'correct' });
            setTimeout(nextStep, 1000);
        } else {
            setStatus('error');
            setErrors(e => e + 1);
            // functions.vibrate('small-error');

            setMapFeedback({
                [answerCountryCode]: 'wrong',
                [currentQuestion.target.code]: 'correct'
            });

            setTimeout(() => {
                nextStep();
            }, 1500);
        }
    };

    const nextStep = () => {
        if (currentIndex < queue.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setStatus('playing');
            setMapFeedback({});
        } else {
            finishGame();
        }
    };

    const finishGame = () => {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current as number);
        const finalTime = startTimeRef.current ? Math.floor((Date.now() - startTimeRef.current) / 1000) : 0;
        const accuracy = Math.round(((queue.length - errors) / queue.length) * 100);

        setStatus('finished');
        onGameFinish({ timeTaken: finalTime, accuracy, errors });
    };

    return {
        currentQuestion,
        currentIndex,
        total: queue.length,
        errors,
        status,
        mapFeedback,
        elapsedTime,
        validateAnswer
    };
};