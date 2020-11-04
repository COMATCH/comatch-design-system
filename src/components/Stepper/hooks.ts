import { RefObject, useEffect, useState } from 'react';
import { ProgressBar } from './types';
import { STEP_HEIGHT, STEP_WIDTH } from './constants';

function useProgressBarBase(startNode: RefObject<HTMLElement>, endNode: RefObject<HTMLElement>, vertical = false) {
    const [progressBarProps, setProgressBarProps] = useState<ProgressBar>();

    const progressBarBase = () => {
        if (!startNode.current || !endNode.current) {
            if (typeof progressBarProps?.length !== 'undefined') {
                setProgressBarProps(undefined);
            }
            return;
        }

        const sNode = {
            ...startNode.current.getBoundingClientRect(),
            x: startNode.current.offsetLeft + STEP_WIDTH / 2,
            y: startNode.current.offsetTop + STEP_HEIGHT / 2,
        };
        const eNode = {
            ...endNode.current.getBoundingClientRect(),
            x: endNode.current.offsetLeft + STEP_WIDTH / 2,
            y: endNode.current.offsetTop + STEP_HEIGHT / 2,
        };
        const startXY = { x: sNode.x, y: sNode.y };
        const endXY = { x: eNode.x, y: eNode.y };
        const coordinate = vertical ? 'y' : 'x';

        setProgressBarProps({
            length: Math.abs(startXY[coordinate] - endXY[coordinate]),
            vertical,
            x: sNode.x,
            y: sNode.y,
        });
    };

    useEffect(() => {
        progressBarBase();
        window.addEventListener('resize', progressBarBase);
        return () => {
            window.removeEventListener('resize', progressBarBase);
        };
    }, [startNode.current, endNode.current, vertical]);

    return progressBarProps;
}

export { useProgressBarBase };
