import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';

import { buildComponentIdAndClassNameFromProps, useOnClickOutside } from '../../core';
import Button from '../../components/Button';

import { ComponentProps } from './types';
import { StyledDialog, StyledOverlay } from './styled';

function useDialogTypeIcon(type?: 'error' | 'info' | 'success' | 'warning') {
    return useMemo(() => {
        switch (type) {
            case 'error':
                return <FontAwesomeIcon icon={faTimesCircle} />;

            case 'info':
                return <FontAwesomeIcon icon={faInfoCircle} />;

            case 'success':
                return <FontAwesomeIcon icon={faCheckCircle} />;

            case 'warning':
                return <FontAwesomeIcon icon={faExclamationTriangle} />;

            default:
                return null;
        }
    }, [type]);
}

const Dialog: FunctionComponent<ComponentProps> = (props) => {
    const { children, footer, generateCss, header, isOpen, onCancel, onClose, onSuccess, type } = props;
    const dialogRef = useRef<HTMLDivElement>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [overlayContainer] = useState(document.createElement('div'));
    const typeIcon = useDialogTypeIcon(type);

    const handleCloseDialog = () => {
        setShowDialog(false);
        onClose?.();
    };

    const headerFromProps = useMemo(() => {
        if (!header && !typeIcon) return null;
        return (
            <header className={type}>
                {typeIcon}
                {typeof header === 'function' ? header() : header}
            </header>
        );
    }, [header, typeIcon]);

    const footerFromProps = useMemo(() => {
        if (!footer && !onCancel && !onSuccess) return null;
        return (
            <footer>
                {typeof footer === 'function' ? footer() : footer}
                {!!onCancel && (
                    <Button secondary onClick={onCancel[0]}>
                        {onCancel[1]}
                    </Button>
                )}
                {!!onSuccess && <Button onClick={onSuccess[0]}>{onSuccess[1]}</Button>}
            </footer>
        );
    }, [footer, onCancel, onSuccess]);

    useEffect(() => {
        document.body.appendChild(overlayContainer);
        return () => {
            document.body.removeChild(overlayContainer);
        };
    }, []);

    useEffect(() => {
        if (isOpen !== showDialog) setShowDialog(!!isOpen);
    }, [isOpen]);

    useOnClickOutside(dialogRef, (event) => {
        event.stopPropagation();
        handleCloseDialog();
    });

    return ReactDOM.createPortal(
        <StyledOverlay className={classnames('DialogOverlay', { closed: !showDialog })} role="presentation">
            <StyledDialog
                ref={dialogRef}
                {...buildComponentIdAndClassNameFromProps(props, 'Dialog')}
                generateCss={generateCss}
                role="dialog"
            >
                {headerFromProps}
                {children}
                {footerFromProps}
                <button className="CloseDialogAction" type="button" onClick={handleCloseDialog}>
                    <FontAwesomeIcon className="CloseDialogAction" icon={faTimes} />
                </button>
            </StyledDialog>
        </StyledOverlay>,
        overlayContainer,
    );
};

export { StyledDialog, StyledOverlay, useDialogTypeIcon };
export default Dialog;
