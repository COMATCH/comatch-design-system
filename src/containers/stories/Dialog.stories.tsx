import React, { useState } from 'react';
import { PageWrapper } from '../../core/storybook';
import { Dialog } from '..';

export default {
    title: 'Containers/Dialog',
    component: Dialog,
};

export const Intro = () => (
    <PageWrapper>
        <h1>Dialog</h1>
        <p>TBD</p>
    </PageWrapper>
);

export const Simple = () => (
    <PageWrapper>
        <Dialog isOpen>Simple dialog</Dialog>
    </PageWrapper>
);

export const WithHeaderAndFooter = () => (
    <PageWrapper>
        <Dialog isOpen header="This is the header" footer="This is the footer">
            Simple dialog
        </Dialog>
    </PageWrapper>
);

export const WithCustomHeaderAndFooter = () => (
    <PageWrapper>
        <Dialog isOpen>
            <header>Custom header</header>
            <main>Simple dialog</main>
            <footer>Custom footer</footer>
        </Dialog>
    </PageWrapper>
);

export const WithActions = () => (
    <PageWrapper>
        <Dialog
            isOpen
            header="Dialog with actions"
            onCancel={[() => console.log('Cancel'), 'Cancel']}
            onSuccess={[() => console.log('Success'), 'Success']}
        >
            Simple dialog
        </Dialog>
    </PageWrapper>
);

export const Controlled = () => {
    const [isOpen, setIsOpen] = useState(true);
    const closeDialog = () => setIsOpen(false);

    return (
        <PageWrapper>
            <button onClick={() => setIsOpen(true)} type="button">
                Open dialog
            </button>
            <Dialog
                isOpen={isOpen}
                header="Dialog with actions"
                onClose={closeDialog}
                onSuccess={[() => console.log('Success'), 'Success']}
                onCancel={[
                    () => {
                        console.log('Cancel');
                        closeDialog();
                    },
                    'Cancel',
                ]}
            >
                Simple dialog
            </Dialog>
        </PageWrapper>
    );
};
