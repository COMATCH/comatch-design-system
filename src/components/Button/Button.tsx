import React, { memo } from 'react';

import { buildComponentIdAndClassNameFromProps, noop } from '../../core';
import { ComponentProps } from './types';
import { Wrapper } from './styled';

function Button({
    children,
    disabled = false,
    generateCss,
    onClick = noop,
    secondary = false,
    ...rest
}: ComponentProps) {
    return (
        <Wrapper
            {...buildComponentIdAndClassNameFromProps(rest, 'Button')}
            disabled={disabled}
            generateCss={generateCss}
            secondary={secondary}
            onClick={onClick}
        >
            {children}
        </Wrapper>
    );
}

export { Wrapper as StyledButton };
export default memo(Button);
