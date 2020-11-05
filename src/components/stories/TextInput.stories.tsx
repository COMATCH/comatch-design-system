import React, { useState } from 'react';
import styled from 'styled-components';
import { PageWrapper as DefaultPageWrapper } from '../../core/storybook';
import { TextInput, StyledTextInput } from '..';

const PageWrapper = styled(DefaultPageWrapper)`
    ${StyledTextInput} {
        margin: 25px;
    }
`;

export default {
    title: 'Components/Text Input',
    component: TextInput,
};

export const Intro = () => (
    <PageWrapper>
        <h1>TextInput</h1>
        <p>TBD</p>
    </PageWrapper>
);

export const Default = () => (
    <PageWrapper>
        <TextInput name="test" />
        <TextInput multi name="test-multi" />
    </PageWrapper>
);

export const WithHandlers = () => {
    const [value, setValue] = useState('');

    return (
        <PageWrapper>
            <TextInput
                label="Test"
                name="test"
                message="Test"
                onChange={(args) => {
                    console.log('On Change:\t', args);
                    setValue(args.value);
                }}
                onBlur={console.error}
                value={value}
            />
            <TextInput
                multi
                label="Test multi"
                name="test-multi"
                message="Test multi liner"
                onChange={(args) => {
                    console.log('On Change:\t', args);
                    setValue(args.value);
                }}
                onBlur={console.error}
                value={value}
            />
        </PageWrapper>
    );
};

export const WithError = () => (
    <PageWrapper>
        <TextInput hasError label="Test" name="test" message="Test" />
    </PageWrapper>
);

export const WithCharacterCounter = () => (
    <PageWrapper>
        <TextInput multi withCharacterCounter max={10} label="Test" name="test" message="Test" />
        <TextInput
            multi
            withCharacterCounter={(currentValue, max) => (
                <>
                    <div>custom counter...</div>
                    <div>{`${currentValue.length}/${max}`}</div>
                </>
            )}
            max={10}
            label="Custom counter"
            name="test"
            message="Test"
        />
    </PageWrapper>
);
