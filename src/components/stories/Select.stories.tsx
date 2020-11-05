import React from 'react';

import { PageWrapper } from '../../core/storybook';
import { Select } from '..';

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
        <Select hasError message="Test error..." name="test" options={[]} />
    </PageWrapper>
);

export const WithOptions = () => (
    <PageWrapper>
        <Select
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
    </PageWrapper>
);

export const Multi = () => (
    <PageWrapper>
        <Select
            multi
            placeholder="Select Input"
            name="test"
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
