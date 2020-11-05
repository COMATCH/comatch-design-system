import React, { useState } from 'react';
import { PageWrapper } from '../../core/storybook';
import { DatePicker } from '..';

export default {
    title: 'Components/Date Picker',
    component: DatePicker,
};

export const Intro = () => (
    <PageWrapper>
        <h1>DatePicker</h1>
        <p>TBD</p>
    </PageWrapper>
);

export const Default = () => (
    <PageWrapper>
        <DatePicker name="test" />
    </PageWrapper>
);

export const WithMinDate = () => {
    const TODAY = new Date();
    const endDateMin = new Date();
    const [start, setStart] = useState<Date>();

    return (
        <PageWrapper>
            <DatePicker name="start-date" label="Starting date" min={TODAY} onChange={({ value }) => setStart(value)} />
            <DatePicker name="end-date" label="Ending date" min={endDateMin.setDate((start || TODAY).getDate() + 1)} />
        </PageWrapper>
    );
};
