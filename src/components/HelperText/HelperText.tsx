import React, { forwardRef, memo } from 'react';

import { buildComponentIdAndClassNameFromProps } from '../../core';
import { ComponentProps } from './types';
import { Wrapper } from './styled';

const HelperText = forwardRef<HTMLDivElement, ComponentProps>(({ children, generateCss, level, ...rest }, ref) => (
    <Wrapper
        {...buildComponentIdAndClassNameFromProps(rest, 'HelperText')}
        generateCss={generateCss}
        level={level}
        ref={ref}
    >
        {children}
    </Wrapper>
));

export { Wrapper as StyledHelperText };
export default memo(HelperText);
