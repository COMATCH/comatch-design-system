import React, { memo } from 'react';

import { buildComponentIdAndClassNameFromProps } from '../../core';
import { ComponentProps } from './types';
import { Wrapper } from './styled';

function Label({ children, generateCss, htmlFor, required, tooltip, ...rest }: ComponentProps) {
    return (
        <Wrapper {...buildComponentIdAndClassNameFromProps(rest, 'Label')} generateCss={generateCss} htmlFor={htmlFor}>
            {children}
            {!!required && <div className="RequiredIndicator">*</div>}
            {!!tooltip && <div className="TooltipWrapper">{tooltip}</div>}
        </Wrapper>
    );
}

export { Wrapper as StyledLabel };
export default memo(Label);
