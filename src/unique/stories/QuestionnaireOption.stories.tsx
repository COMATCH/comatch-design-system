import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PageWrapper as DefaultPageWrapper } from '../../core/storybook';
import { QuestionnaireOption, StyledQuestionnaireOption } from '..';
import { QuestionnaireAnswer } from '../QuestionnaireOption';

const PageWrapper = styled(DefaultPageWrapper)`
    ${StyledQuestionnaireOption} {
        margin: ${({ theme: { spacing } }) => spacing(3)};
    }
`;

export default {
    title: 'Unique Components/Questionnaire Option',
    component: QuestionnaireOption,
};

export const Intro = () => (
    <PageWrapper>
        <h1>Questionnaire Option</h1>
        <p>TBD</p>
    </PageWrapper>
);

export const Default = () => {
    const answers: [QuestionnaireAnswer, QuestionnaireAnswer] = [
        {
            id: 'diplomat',
            title: 'Diplomat',
            description:
                'Handelt konsensorientiert, versucht andere durch Kompromissbereitschaft zu überzeugen und so mitzuziehen. ',
        },
        {
            id: 'Durchsetzer',
            title: 'Durchsetzer',
            description:
                'Gibt klare Ziele vor, setzt diese auch gene Widerstand durch, treibt andere dadurch an und hält dabei Spannungen aus.',
        },
    ];

    return (
        <PageWrapper>
            <QuestionnaireOption answers={answers} divider="Or" />
            <QuestionnaireOption answers={answers} divider="Oder" />
            <QuestionnaireOption answers={answers} divider="Или" />
        </PageWrapper>
    );
};

export const WithPreSelectedAnswer = () => {
    const answers: [QuestionnaireAnswer, QuestionnaireAnswer] = [
        {
            id: 'diplomat',
            title: 'Diplomat',
            description:
                'Handelt konsensorientiert, versucht andere durch Kompromissbereitschaft zu überzeugen und so mitzuziehen. ',
        },
        {
            id: 'durchsetzer',
            title: 'Durchsetzer',
            description:
                'Gibt klare Ziele vor, setzt diese auch gene Widerstand durch, treibt andere dadurch an und hält dabei Spannungen aus.',
        },
    ];

    return (
        <PageWrapper>
            <QuestionnaireOption answers={answers} divider="Or" name="question-1" selectedAnswer="diplomat" />
            <QuestionnaireOption
                pinnedToSelectedAnswer
                answers={answers}
                divider="Oder"
                name="question-2"
                selectedAnswer="durchsetzer"
            />
            <QuestionnaireOption answers={answers} divider="Или" name="question-3" selectedAnswer="diplomat" />
        </PageWrapper>
    );
};

export const Controlled = () => {
    const [currentAnswer, setCurrentAnswer] = useState<string>();
    const answers: [QuestionnaireAnswer, QuestionnaireAnswer] = [
        {
            id: 'diplomat',
            title: 'Diplomat',
            description:
                'Handelt konsensorientiert, versucht andere durch Kompromissbereitschaft zu überzeugen und so mitzuziehen. ',
        },
        {
            id: 'durchsetzer',
            title: 'Durchsetzer',
            description:
                'Gibt klare Ziele vor, setzt diese auch gene Widerstand durch, treibt andere dadurch an und hält dabei Spannungen aus.',
        },
    ];

    const handleChange = (newAnswer?: QuestionnaireAnswer) => {
        setCurrentAnswer(newAnswer?.id);
    };

    useEffect(function fakeApi() {
        setTimeout(() => {
            setCurrentAnswer(answers[1].id);
        }, 1500);
    }, []);

    return (
        <PageWrapper>
            <QuestionnaireOption
                answers={answers}
                divider="Or"
                onChange={handleChange}
                selectedAnswer={currentAnswer}
            />
        </PageWrapper>
    );
};
