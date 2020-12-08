import { ReactNode } from 'react';
import { WithClassAndId, WithCssGeneratorFunction } from '../../core';

export type QuestionnaireAnswer = {
    description?: ReactNode;
    id: string;
    title?: ReactNode;
    value?: string;
};

export type ComponentProps = WithClassAndId &
    WithCssGeneratorFunction & {
        answers: [QuestionnaireAnswer, QuestionnaireAnswer];
        divider?: ReactNode;
        name?: string;
        onChange?: (answer?: QuestionnaireAnswer) => void;
        pinnedToSelectedAnswer?: boolean;
        selectedAnswer?: string;
    };
