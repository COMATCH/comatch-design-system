import React, { useState } from 'react';
import styled from 'styled-components';
import { PageWrapper as DefaultPageWrapper } from '../../core/storybook';
import { Stepper, StyledStepper } from '..';

const PageWrapper = styled(DefaultPageWrapper)`
    ${StyledStepper} {
        margin: ${({ theme: { spacing } }) => spacing(3)};
    }
`;

export default {
    title: 'Components/Stepper',
    component: Stepper,
};

export const Intro = () => (
    <PageWrapper>
        <h1>Stepper</h1>
        <p>TBD</p>
    </PageWrapper>
);

export const Empty = () => (
    <PageWrapper>
        <Stepper steps={[]} />
    </PageWrapper>
);

export const Basic = () => {
    const steps = [
        { id: '1', label: '1', title: 'Step 1' },
        { id: '2', label: '2', title: 'Step 2' },
        { id: '3', label: '3', title: 'Step 3' },
    ];

    return (
        <PageWrapper>
            <Stepper steps={steps} generateCss={() => 'width: 100%;'} />
            <Stepper vertical steps={steps} generateCss={() => 'height: 100%;'} />
        </PageWrapper>
    );
};

export const WithCompletedSteps = () => {
    const steps = [
        { id: '1', label: '1', title: 'Step 1', completed: true },
        { id: '2', label: '2', title: 'Step 2', completed: true },
        { id: '3', label: '3', title: 'Step 3' },
    ];

    return (
        <PageWrapper>
            <Stepper steps={steps} generateCss={() => 'height: 100%;'} />
            <Stepper vertical steps={steps} generateCss={() => 'height: 100%;'} />
        </PageWrapper>
    );
};

export const WithDisabledSteps = () => {
    const steps = [
        { id: '1', label: '1', title: 'Step 1', completed: true },
        { id: '2', label: '2', title: 'Step 2', completed: true },
        { id: '3', label: '3', title: 'Step 3' },
        { id: '4', label: '4', title: 'Step 4', disabled: true },
    ];

    return (
        <PageWrapper>
            <Stepper steps={steps} generateCss={() => 'height: 100%;'} />
            <Stepper vertical steps={steps} generateCss={() => 'height: 100%;'} />
        </PageWrapper>
    );
};

export const WithContent = () => {
    const steps = [
        { id: '1', label: '1', title: 'Step 1', completed: true },
        { id: '2', label: '2', title: 'Step 2', completed: true },
        { id: '3', label: '3', title: 'Step 3' },
        { id: '4', label: '4', title: 'Step 4', disabled: true },
    ];

    return (
        <PageWrapper>
            <Stepper enableDefaultNavigation steps={steps} generateCss={() => 'height: 100%;'}>
                {(step) => <>Current Step: {step.title}</>}
            </Stepper>
            <Stepper enableDefaultNavigation vertical steps={steps} generateCss={() => 'height: 100%;'}>
                {(step) => <>Current Step: {step.title}</>}
            </Stepper>
        </PageWrapper>
    );
};

export const WithCustomNavigation = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const steps = [
        { id: '1', label: '1', title: 'Step 1', completed: true },
        { id: '2', label: '2', title: 'Step 2', completed: true },
        { id: '3', label: '3', title: 'Step 3' },
        { id: '4', label: '4', title: 'Step 4', disabled: true },
    ];

    const onGoToNextStep = () => {
        setCurrentStepIndex((index) => Math.min(index + 1, steps.length - 1));
    };

    const onGoToPrevStep = () => {
        setCurrentStepIndex((index) => Math.max(index - 1, 0));
    };

    return (
        <PageWrapper>
            <div>
                <Stepper stepIndex={currentStepIndex} steps={steps} generateCss={() => 'height: 100%;'} />
                Current Step: {steps[currentStepIndex]?.title}
                <div className="actions">
                    <button type="button" onClick={onGoToPrevStep}>
                        Previous
                    </button>
                    <button type="button" onClick={onGoToNextStep}>
                        Next
                    </button>
                </div>
            </div>

            <div>
                <Stepper vertical stepIndex={currentStepIndex} steps={steps} generateCss={() => 'height: 100%;'} />
                Current Step: {steps[currentStepIndex]?.title}
                <div className="actions">
                    <button type="button" onClick={onGoToPrevStep}>
                        Previous
                    </button>
                    <button type="button" onClick={onGoToNextStep}>
                        Next
                    </button>
                </div>
            </div>
        </PageWrapper>
    );
};

export const CircularWithDefaultNavigation = () => {
    const steps = [
        { id: '1', label: '1', title: 'Step 1', completed: true },
        { id: '2', label: '2', title: 'Step 2', completed: true },
        { id: '3', label: '3', title: 'Step 3' },
        { id: '4', label: '4', title: 'Step 4' },
    ];

    return (
        <PageWrapper>
            <Stepper circular enableDefaultNavigation steps={steps} generateCss={() => 'height: 100%;'}>
                {(step, { next, prev }) => (
                    <>
                        Current Step: {step.title}
                        <div className="actions">
                            <button type="button" onClick={() => prev()}>
                                Previous
                            </button>
                            <button type="button" onClick={() => next()}>
                                Next
                            </button>
                        </div>
                    </>
                )}
            </Stepper>

            <Stepper circular enableDefaultNavigation vertical steps={steps} generateCss={() => 'height: 100%;'}>
                {(step, { next, prev }) => (
                    <>
                        Current Step: {step.title}
                        <div className="actions">
                            <button type="button" onClick={() => prev()}>
                                Previous
                            </button>
                            <button type="button" onClick={() => next()}>
                                Next
                            </button>
                        </div>
                    </>
                )}
            </Stepper>
        </PageWrapper>
    );
};
