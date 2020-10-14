import React, { forwardRef, memo, ReactNode, useRef, useEffect, useState, useMemo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';

import { buildComponentIdAndClassNameFromProps } from '../../core';

import { ComponentProps, Step as StepProps, StepComponentProps } from './types';
import { StepLabel, StepTitle, StyledStepper, StyledStep, UserProgress } from './styled';
import { useProgressBarBase } from './hooks';
import { calculateProgress } from './helpers';

const Step = memo(
    forwardRef<HTMLDivElement, StepComponentProps>((props, ref) => {
        const {
            completed,
            disabled,
            generateCss,
            label,
            onClick = () => {},
            selected,
            vertical,
            title,
            ...rest
        } = props;

        return (
            <StyledStep
                {...buildComponentIdAndClassNameFromProps(rest, 'Step', { completed, disabled, selected, vertical })}
            >
                <StepLabel ref={ref} onClick={(event) => onClick(event, props)}>
                    {completed ? <FontAwesomeIcon icon={faCheck} /> : label}
                </StepLabel>
                {!!title && <StepTitle onClick={(event) => onClick(event, props)}>{title}</StepTitle>}
            </StyledStep>
        );
    }),
);

function Stepper(props: ComponentProps) {
    const {
        children,
        circular = false,
        enableDefaultNavigation = false,
        generateCss,
        onStepChange,
        stepIndex = 0,
        steps = [],
        vertical = false,
        ...rest
    } = props;

    const firstStep = useRef<HTMLDivElement>(null);
    const lastStep = useRef<HTMLDivElement>(null);
    const progressBarBase = useProgressBarBase(firstStep, lastStep, vertical);
    const [currentIndex, setCurrentIndex] = useState<number>(stepIndex);
    const progress = useMemo(() => calculateProgress(currentIndex, steps.length - 1), [
        currentIndex,
        stepIndex,
        steps,
        steps.length,
    ]);

    const jumpToIndex = (index: number) => {
        if (!enableDefaultNavigation) {
            return;
        }

        const indexIsTooLow = index < 0;
        const indexIsTooHigh = index >= steps.length;
        const indexIsDisabled = steps[index]?.disabled;

        if (indexIsTooLow) {
            setCurrentIndex(circular ? steps.length - 1 : 0);
            return;
        }

        if (indexIsTooHigh) {
            setCurrentIndex(circular ? 0 : steps.length - 1);
            return;
        }

        if (indexIsDisabled) {
            return;
        }

        setCurrentIndex(index);
    };

    const renderStep = (step: StepProps, index: number): ReactNode => {
        let ref;
        let selected = !!currentIndex && index <= currentIndex;
        const handleOnClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            jumpToIndex(index);

            if (step.onClick) {
                event.persist();
                step.onClick(event, step);
            }
        };

        if (index === 0) {
            ref = firstStep;
            selected = true;
        }

        if (index === steps.length - 1) {
            ref = lastStep;
        }

        return (
            <Step key={step.id} ref={ref} {...step} selected={selected} vertical={vertical} onClick={handleOnClick} />
        );
    };

    const renderChildren = (): ReactNode => {
        if (typeof children === 'function') {
            if (typeof currentIndex === 'undefined') {
                return null;
            }

            let nextStepIndex = currentIndex + 1;
            let prevStepIndex = currentIndex - 1;

            if (nextStepIndex >= steps.length) {
                nextStepIndex = circular ? 0 : steps.length - 1;
            }

            if (prevStepIndex < 0) {
                prevStepIndex = circular ? steps.length - 1 : 0;
            }

            return children(
                steps[currentIndex],
                {
                    jumpTo: jumpToIndex,
                    next: () => jumpToIndex(nextStepIndex),
                    prev: () => jumpToIndex(prevStepIndex),
                },
                {
                    nextStepIsDisabled: !!steps[nextStepIndex]?.disabled,
                    prevStepIsDisabled: !!steps[prevStepIndex]?.disabled,
                },
            );
        }

        return children;
    };

    const handleStepsChanges = () => {
        jumpToIndex(
            steps.reduce((acc, step, index) => {
                if (step.completed) return index;
                return acc;
            }, currentIndex),
        );
    };

    const handleCurrentIndexChanges = () => {
        if (typeof currentIndex !== 'undefined' && onStepChange) {
            onStepChange(steps[currentIndex]);
        }
    };

    const handleStepIndexChanges = () => {
        setCurrentIndex(stepIndex);
    };

    useEffect(handleCurrentIndexChanges, [currentIndex]);
    useEffect(handleStepIndexChanges, [stepIndex]);
    useEffect(handleStepsChanges, [steps, steps.length]);

    if (!steps.length && !children) return null;
    return (
        <>
            <StyledStepper
                generateCss={generateCss}
                {...buildComponentIdAndClassNameFromProps(rest, 'Stepper', { vertical })}
            >
                <UserProgress {...progressBarBase} progress={progress} />
                {steps.map(renderStep)}
            </StyledStepper>
            {renderChildren()}
        </>
    );
}

export { StyledStepper };
export default Stepper;
