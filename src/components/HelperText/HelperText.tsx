import React, { memo } from 'react';

import { buildComponentIdAndClassNameFromProps } from '../../core';
import { ComponentProps } from './types';
import { Wrapper } from './styled';

function HelperText({ children, generateCss, level, ...rest }: ComponentProps) {
    return (
        <Wrapper {...buildComponentIdAndClassNameFromProps(rest, 'HelperText')} generateCss={generateCss} level={level}>
            {children}
        </Wrapper>
    );
}

export { Wrapper as StyledHelperText };
export default memo(HelperText);
