import React, { useState } from 'react';
import { PageWrapper } from '../../core/storybook';
import { Drawer } from '..';

export default {
    title: 'Containers/Drawer',
    component: Drawer,
};

export const Intro = () => (
    <PageWrapper>
        <h1>Drawer</h1>
        <p>TBD</p>
    </PageWrapper>
);

export const Simple = () => (
    <PageWrapper>
        <Drawer isOpen>Simple Drawer</Drawer>
    </PageWrapper>
);

export const Controlled = () => {
    const [isOpen, setIsOpen] = useState(true);
    const closeDrawer = () => setIsOpen(false);

    return (
        <PageWrapper>
            <button onClick={() => setIsOpen(true)} type="button">
                Open drawer
            </button>
            <div style={{ height: '200vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                This is a filler
            </div>
            <Drawer isOpen={isOpen} onClose={closeDrawer}>
                Simple drawer
                <div style={{ width: '150vw' }}>Fun content</div>
            </Drawer>
        </PageWrapper>
    );
};

export const WithCustomMaxWidth = () => {
    const [isOpen, setIsOpen] = useState(true);
    const closeDrawer = () => setIsOpen(false);

    return (
        <PageWrapper>
            <button onClick={() => setIsOpen(true)} type="button">
                Open drawer
            </button>
            <div style={{ height: '200vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                This is a filler
            </div>
            <Drawer isOpen={isOpen} onClose={closeDrawer} maxWidth={[50, '%']}>
                Simple drawer
                <div style={{ width: '150vw' }}>Fun content</div>
            </Drawer>
        </PageWrapper>
    );
};

export const WithCustomWidth = () => {
    const [isOpen, setIsOpen] = useState(true);
    const closeDrawer = () => setIsOpen(false);

    return (
        <PageWrapper>
            <button onClick={() => setIsOpen(true)} type="button">
                Open drawer
            </button>
            <div style={{ height: '200vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                This is a filler
            </div>
            <Drawer isOpen={isOpen} onClose={closeDrawer} width={700}>
                Simple drawer
                <div style={{ width: '150vw' }}>Fun content</div>
            </Drawer>
        </PageWrapper>
    );
};
