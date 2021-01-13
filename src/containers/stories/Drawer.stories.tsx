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
            <Drawer isOpen={isOpen} onClose={closeDrawer}>
                Simple drawer
            </Drawer>
        </PageWrapper>
    );
};
