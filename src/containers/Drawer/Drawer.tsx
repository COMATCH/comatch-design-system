import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import { buildComponentIdAndClassNameFromProps, useOnClickOutside } from '../../core';
import { ComponentProps } from './types';
import { StyledDrawer, StyledOverlay } from './styled';

function Drawer(props: ComponentProps) {
    const { children, generateCss, isOpen, onClose, ...rest } = props;
    const dialogRef = useRef<HTMLDivElement>(null);
    const [showDialog, setShowDialog] = useState(false);
    const handleCloseDialog = () => {
        setShowDialog(false);
        onClose?.();
    };

    useEffect(() => {
        if (isOpen !== showDialog) setShowDialog(!!isOpen);
    }, [isOpen]);

    useOnClickOutside(dialogRef, (event) => {
        event.stopPropagation();
        handleCloseDialog();
    });

    return (
        <StyledOverlay className={classnames('DialogOverlay', { closed: !showDialog })} role="presentation">
            <StyledDrawer
                ref={dialogRef}
                {...buildComponentIdAndClassNameFromProps(rest, 'Dialog')}
                generateCss={generateCss}
                role="dialog"
            >
                {typeof children === 'function' ? children() : children}
                <button className="CloseDrawerAction" type="button" onClick={handleCloseDialog}>
                    <FontAwesomeIcon className="CloseDrawerAction" icon={faTimes} />
                </button>
            </StyledDrawer>
        </StyledOverlay>
    );
}

export { StyledDrawer, StyledOverlay };
export default Drawer;
