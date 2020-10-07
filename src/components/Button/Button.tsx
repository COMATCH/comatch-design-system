import React, { forwardRef, memo } from 'react';

import { buildComponentIdAndClassNameFromProps, noop } from '../../core';
import { ComponentProps } from './types';
import { Wrapper } from './styled';

const Button = forwardRef<HTMLButtonElement, ComponentProps>((props, ref) => {
    const {
        children,
        disabled = false,
        generateCss,
        onClick = noop,
        secondary = false,
        type = 'button',
        ...rest
    } = props;

    return (
        <Wrapper
            {...buildComponentIdAndClassNameFromProps(rest, 'Button')}
            disabled={disabled}
            generateCss={generateCss}
            onClick={onClick}
            ref={ref}
            secondary={secondary}
            type={type}
        >
            {children}
        </Wrapper>
    );
});

export { Wrapper as StyledButton };
export default memo(Button);
