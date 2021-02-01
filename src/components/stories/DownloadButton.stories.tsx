/* eslint-disable no-alert, no-console */
import React from 'react';
import { PageWrapper } from '../../core/storybook';
import { DownloadButton } from '..';

export default {
    title: 'Components/Download Button',
    component: DownloadButton,
};

export const Intro = () => (
    <PageWrapper>
        <h1>Download Button</h1>
        <p>
            Similar to a link, this button usually occupies the full line and has a icon. They show by default the name
            of the file to be downloaded.
        </p>
    </PageWrapper>
);

export const Default = () => (
    <PageWrapper>
        <DownloadButton>Project list Sofia.pdf</DownloadButton>
    </PageWrapper>
);

export const Pressed = () => (
    <PageWrapper>
        <DownloadButton>Project list Sofia.pdf</DownloadButton>
    </PageWrapper>
);

export const Disabled = () => (
    <PageWrapper>
        <DownloadButton disabled>Project list Sofia.pdf</DownloadButton>
    </PageWrapper>
);
