import React, { ReactNode } from 'react';
import { WithClassAndId, WithCssGeneratorFunction } from '../../core/types';

export type ProgressBar = {
    length?: number;
    progress?: number;
    vertical?: boolean;
    x?: number;
    y?: number;
};

export type Step = {
    id: string;
    label: ReactNode;
    title: ReactNode;

    completed?: boolean;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>, step: Step) => void;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
};

export type StepComponentProps = WithClassAndId &
    WithCssGeneratorFunction &
    Step & {
        selected?: boolean;
    };

export type ComponentProps = WithClassAndId &
    WithCssGeneratorFunction & {
        enableDefaultNavigation?: boolean;
        steps?: Step[];
        stepIndex?: number;
        onStepChange?: (step: Step) => void;

        circular?: boolean;
        vertical?: boolean;
        children?:
            | ReactNode
            | ((
                  step: Step,
                  actions: {
                      jumpTo: (index: number) => void;
                      next: () => void;
                      prev: () => void;
                  },
                  stepStates: {
                      nextStepIsDisabled: boolean;
                      prevStepIsDisabled: boolean;
                  },
              ) => ReactNode);
    };
