import React, { useState } from 'react';
import styled from 'styled-components';

import { PageWrapper as DefaultPage } from '../../core/storybook';
import { Select, StyledSelect, SelectOption as Option } from '..';

const PageWrapper = styled(DefaultPage)`
    ${StyledSelect} + ${StyledSelect},
    .Section + .Section {
        margin-top: 20px;
    }
`;

export default {
    title: 'Components/Select',
    component: Select,
};

export const Intro = () => (
    <PageWrapper>
        <h1>Select</h1>
        <p>TBD</p>
    </PageWrapper>
);

export const Default = () => (
    <PageWrapper>
        <Select name="test" options={[]} />
    </PageWrapper>
);

export const WithError = () => (
    <PageWrapper>
        <Select hasError message="Test error..." label="Single select" name="test" options={[]} />
        <Select hasError multi message="Test error..." label="Multi select" name="test-multi" options={[]} />
    </PageWrapper>
);

export const WithPlaceholder = () => (
    <PageWrapper>
        <Select
            placeholder="Single select placeholder..."
            label="Single select"
            name="test"
            options={[
                { id: '1', label: '1', value: '1' },
                { id: '2', label: '2', value: '2' },
                { id: '3', label: '3', value: '3' },
                { id: '4', label: '4', value: '4' },
                { id: '5', label: '5', value: '5' },
            ]}
        />
        <Select
            placeholder="Multi select placeholder..."
            multi
            label="Multi select"
            name="test-multi"
            options={[
                { id: '1', label: '1', value: '1' },
                { id: '2', label: '2', value: '2' },
                { id: '3', label: '3', value: '3' },
                { id: '4', label: '4', value: '4' },
                { id: '5', label: '5', value: '5' },
            ]}
        />
    </PageWrapper>
);

export const WithOptions = () => (
    <PageWrapper>
        <Select
            label="Single select"
            name="test"
            placeholder="Select Input"
            options={[
                { id: '1', label: '1', value: '1' },
                { id: '2', label: '2', value: '2' },
                { id: '3', label: '3', value: '3' },
                { id: '4', label: '4', value: '4' },
                { id: '5', label: '5', value: '5' },
            ]}
        />
        <Select
            multi
            label="Multi select"
            name="test-multi"
            placeholder="Select Input"
            options={[
                { id: '1', label: '1', value: '1' },
                { id: '2', label: '2', value: '2' },
                { id: '3', label: '3', value: '3' },
                { id: '4', label: '4', value: '4' },
                { id: '5', label: '5', value: '5' },
            ]}
        />
    </PageWrapper>
);

export const WithHandler = () => {
    const [singleSelectValue, setSingleSelectValue] = useState<Option | undefined>({ id: '1', label: '1', value: '1' });
    const clearSingle = () => setSingleSelectValue(undefined);

    const [multiSelectValue, setMultiSelectValue] = useState<Option[] | undefined>([
        { id: '3', label: '3', value: '3' },
    ]);
    const clearMulti = () => setMultiSelectValue(undefined);

    return (
        <>
            <div className="Section">
                <Select
                    value={singleSelectValue}
                    name="test"
                    label="Single select"
                    placeholder="Select Input (single)"
                    options={[
                        { id: '1', label: '1', value: '1' },
                        { id: '2', label: '2', value: '2' },
                        { id: '3', label: '3', value: '3' },
                        { id: '4', label: '4', value: '4' },
                        { id: '5', label: '5', value: '5' },
                    ]}
                    onChange={({ value: newValue }) => {
                        setSingleSelectValue(newValue?.[0]);
                    }}
                />
                <button onClick={clearSingle} type="button">
                    clear
                </button>
            </div>

            <div className="Section">
                <Select
                    multi
                    value={multiSelectValue}
                    name="test-multi"
                    label="Multi select"
                    placeholder="Select Input (single)"
                    options={[
                        { id: '1', label: '1', value: '1' },
                        { id: '2', label: '2', value: '2' },
                        { id: '3', label: '3', value: '3' },
                        { id: '4', label: '4', value: '4' },
                        { id: '5', label: '5', value: '5' },
                    ]}
                    onChange={({ value: newValue }) => {
                        setMultiSelectValue(newValue);
                    }}
                />
                <button onClick={clearMulti} type="button">
                    clear
                </button>
            </div>
        </>
    );
};
