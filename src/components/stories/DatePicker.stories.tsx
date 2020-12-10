import React, { useEffect, useState } from 'react';
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

export const WithError = () => (
    <PageWrapper>
        <DatePicker hasError message="Test error..." name="test" />
    </PageWrapper>
);

export const WithMinDate = () => {
    const TODAY = new Date();
    const [start, setStart] = useState<Date>();
    const [min, setMin] = useState<Date>(TODAY);

    useEffect(() => {
        const minDate = new Date(start || TODAY);
        minDate.setDate((start || TODAY).getDate() + 1);
        setMin(minDate);
    }, [start]);

    return (
        <PageWrapper>
            <DatePicker name="start-date" label="Starting date" min={TODAY} onChange={({ value }) => setStart(value)} />
            <DatePicker name="end-date" label="Ending date" min={min} />
        </PageWrapper>
    );
};
