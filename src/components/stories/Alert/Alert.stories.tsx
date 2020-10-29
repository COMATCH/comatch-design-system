import React from 'react';
import { uniqueId } from '../../../core';
import { Alert } from '../..';
import { ALERT_MESSAGE, COLOR_SECTIONS, HEADLINE_TEXT, SECTIONS } from './constants';
import { renderAlertSection, renderColorsSection } from './helpers';
import { AlertSections, ColorSections, IntroTitle, PageWrapper } from './styled';

export default {
    title: 'Components/Alert',
    component: Alert,
};

export const Intro = () => {
    return (
        <PageWrapper>
            <IntroTitle main>Alert</IntroTitle>
            <AlertSections>{SECTIONS.map(renderAlertSection)}</AlertSections>

            <IntroTitle>Colors</IntroTitle>
            <ColorSections>
                {COLOR_SECTIONS.map((section) => (
                    <li key={uniqueId()}>{section.map(renderColorsSection)}</li>
                ))}
            </ColorSections>
        </PageWrapper>
    );
};

export const Empty = () => (
    <PageWrapper>
        <Alert />
    </PageWrapper>
);

export const Default = () => (
    <PageWrapper>
        <Alert title={HEADLINE_TEXT} type="error">
            {ALERT_MESSAGE}
        </Alert>
        <Alert title={HEADLINE_TEXT} type="info">
            {ALERT_MESSAGE}
        </Alert>
        <Alert title={HEADLINE_TEXT} type="success">
            {ALERT_MESSAGE}
        </Alert>
        <Alert title={HEADLINE_TEXT} type="warning">
            {ALERT_MESSAGE}
        </Alert>
    </PageWrapper>
);

export const Inline = () => (
    <PageWrapper>
        <Alert inline title={HEADLINE_TEXT} type="error">
            {ALERT_MESSAGE}
        </Alert>
        <Alert inline title={HEADLINE_TEXT} type="info">
            {ALERT_MESSAGE}
        </Alert>
        <Alert inline title={HEADLINE_TEXT} type="success">
            {ALERT_MESSAGE}
        </Alert>
        <Alert inline title={HEADLINE_TEXT} type="warning">
            {ALERT_MESSAGE}
        </Alert>
    </PageWrapper>
);
