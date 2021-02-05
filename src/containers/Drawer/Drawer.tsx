import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import { buildComponentIdAndClassNameFromProps, useOnClickOutside } from '../../core';
import { ComponentProps } from './types';
import { StyledDrawer, StyledOverlay } from './styled';

const Drawer: FunctionComponent<ComponentProps> = (props) => {
    const { children, className, generateCss, id, isOpen, onClose, ...rest } = props;
    const overlayContainer = useRef(document.createElement('div'));
    const dialogRef = useRef<HTMLDivElement>(null);
    const [showDialog, setShowDialog] = useState(false);
    const handleCloseDialog = () => {
        setShowDialog(false);
        onClose?.();
    };

    useEffect(() => {
        if (isOpen !== showDialog) setShowDialog(!!isOpen);
    }, [isOpen]);

    useEffect(() => {
        document.body.appendChild(overlayContainer.current);
        return () => {
            document.body.removeChild(overlayContainer.current);
        };
    }, []);

    useOnClickOutside(dialogRef, (event) => {
        event.stopPropagation();
        handleCloseDialog();
    });

    return createPortal(
        <StyledOverlay className={classnames('DialogOverlay', { closed: !showDialog })} role="presentation">
            <StyledDrawer
                ref={dialogRef}
                {...buildComponentIdAndClassNameFromProps({ className, id }, 'Dialog')}
                generateCss={generateCss}
                role="dialog"
                {...rest}
            >
                {typeof children === 'function' ? (children as any)() : children}
                <button className="CloseDrawerAction" type="button" onClick={handleCloseDialog}>
                    <FontAwesomeIcon className="CloseDrawerAction" icon={faTimes} />
                </button>
            </StyledDrawer>
        </StyledOverlay>,
        overlayContainer.current,
    );
};

export { StyledDrawer, StyledOverlay };
export default Drawer;
