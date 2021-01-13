import React from 'react';
import styled from 'styled-components';
import { PageWrapper as DefaultPageWrapper } from '../../core/storybook';
import Eleanor from '../../static/images/Eleanor.jpg';
import Pikachu from '../../static/images/pikachu-chidori.jpg';
import silverStatus from '../../static/images/silver-status-badge.svg';
import goldStatus from '../../static/images/gold-status-badge.svg';
import { Imagery, StyledImagery } from '..';

const PageWrapper = styled(DefaultPageWrapper)`
    ${StyledImagery} {
        margin: ${({ theme: { spacing } }) => spacing(3)};
    }
`;

const GoldStatus = <img src={goldStatus} alt="Gold status" />;
const SilverStatus = <img src={silverStatus} alt="Silver status" />;

export default {
    title: 'Components/Imagery',
    component: Imagery,
};

export const Intro = () => (
    <PageWrapper>
        <h1>Imagery</h1>
        <p>TBD</p>
    </PageWrapper>
);

export const Empty = () => (
    <PageWrapper>
        <Imagery />
    </PageWrapper>
);

export const WithClassAndId = () => (
    <PageWrapper>
        <Imagery inline id="Test" className="Test" src={Eleanor} />
        <Imagery inline id="Test-1" className="Test" src={Eleanor} size="sm" />
        <Imagery inline id="Test-2" className="Test" src={Eleanor} size="md" />
        <Imagery inline id="Test-3" className="Test" src={Eleanor} size="lg" />
        <Imagery inline id="Test-4" className="Test" src={Eleanor} size={250} />
        <Imagery inline id="Test-4" className="Test" src={Eleanor} size={{ height: 100, width: 150 }} />
    </PageWrapper>
);

export const Avatar = () => (
    <PageWrapper>
        <Imagery avatar src={Pikachu} />
        <Imagery avatar src={Pikachu} size="sm" />
        <Imagery avatar src={Pikachu} size="md" />
        <Imagery avatar src={Pikachu} size="lg" />
        <Imagery avatar src={Pikachu} size={250} />
        <Imagery avatar src={Pikachu} size={{ height: 100, width: 150 }} />
    </PageWrapper>
);

export const WithDefaultAvatar = () => (
    <PageWrapper>
        <Imagery avatar id="Test" className="Test" />
        <Imagery avatar id="Test-1" className="Test" size="sm" />
        <Imagery avatar id="Test-2" className="Test" size="md" />
        <Imagery avatar id="Test-3" className="Test" size="lg" />
        <Imagery avatar id="Test-4" className="Test" size={250} />
        <Imagery avatar id="Test-4" className="Test" size={{ height: 100, width: 150 }} />
    </PageWrapper>
);

export const WithBadge = () => (
    <PageWrapper>
        <Imagery avatar badge={GoldStatus} badgePosition="bottom-left" src={Pikachu} />
        <Imagery avatar badge={SilverStatus} src={Pikachu} size="sm" />
        <Imagery avatar badge={SilverStatus} badgePosition="top-right" size="md" />
        <Imagery avatar badge={GoldStatus} src={Pikachu} size="lg" />
        <Imagery avatar badge={SilverStatus} badgePosition="top-left" size={250} />
        <Imagery
            avatar
            badge={GoldStatus}
            badgePosition="bottom-right"
            src={Pikachu}
            size={{ height: 100, width: 150 }}
        />
    </PageWrapper>
);
