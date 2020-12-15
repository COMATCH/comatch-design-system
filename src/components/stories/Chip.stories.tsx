import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { PageWrapper } from '../../core/storybook';
import { Chip } from '..';

export default {
    title: 'Components/Chip',
    component: Chip,
};

export const Intro = () => (
    <PageWrapper>
        <h1>Chip</h1>
        <p>
            Chips are compact elements that represent an input, attribute, or action. They can contain one action and
            that is usually apply/clear, for example in filters. Chips won’t contain links. Chips have a max width of
            350 px on desktop and 200 px on mobile.
        </p>
    </PageWrapper>
);

export const StandardWithContent = () => (
    <PageWrapper>
        <Chip>Test</Chip>
    </PageWrapper>
);

export const WithActionApplied = () => (
    <PageWrapper>
        <Chip icon={<FontAwesomeIcon icon={faCheck} />}>Test</Chip>
    </PageWrapper>
);

export const WithActionAppliedReverse = () => (
    <PageWrapper>
        <Chip reverse icon={<FontAwesomeIcon icon={faCheck} />}>
            Test
        </Chip>
    </PageWrapper>
);

export const Disabled = () => (
    <PageWrapper>
        <Chip disabled>Test</Chip>
    </PageWrapper>
);
