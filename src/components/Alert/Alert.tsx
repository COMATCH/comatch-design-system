import React, { forwardRef, memo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';

import { buildComponentIdAndClassNameFromProps } from '../../core';

import { ComponentProps } from './types';
import { Wrapper } from './styled';

const Alert = forwardRef<HTMLDivElement, ComponentProps>((props, ref) => {
    const { children, generateCss, inline, title, type = 'info', ...rest } = props;
    let icon = faInfoCircle;

    switch (type) {
        case 'error':
            icon = faTimesCircle;
            break;

        case 'warning':
            icon = faExclamationCircle;
            break;

        case 'success':
            icon = faCheckCircle;
            break;

        default:
            icon = faInfoCircle;
    }

    return (
        <Wrapper
            {...buildComponentIdAndClassNameFromProps(rest, 'Alert')}
            generateCss={generateCss}
            inline={inline}
            ref={ref}
            type={type}
        >
            <FontAwesomeIcon icon={icon} />
            <div>
                {!!title && <div className="Title">{title}</div>}
                {children}
            </div>
        </Wrapper>
    );
});

export { Wrapper as StyledAlert };
export default memo(Alert);
