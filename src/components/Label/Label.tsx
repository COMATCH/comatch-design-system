import React, { forwardRef, memo } from 'react';

import { buildComponentIdAndClassNameFromProps, isValidReactNode } from '../../core';
import { ComponentProps } from './types';
import { Wrapper } from './styled';

const Label = forwardRef<HTMLLabelElement, ComponentProps>((props, ref) => {
    const { children, generateCss, htmlFor, required, tooltip, ...rest } = props;

    if (!isValidReactNode(children)) {
        return null;
    }

    return (
        <Wrapper
            {...buildComponentIdAndClassNameFromProps(rest, 'Label')}
            generateCss={generateCss}
            htmlFor={htmlFor}
            ref={ref}
        >
            {children}
            {!!required && <div className="RequiredIndicator">*</div>}
            {!!tooltip && <div className="TooltipWrapper">{tooltip}</div>}
        </Wrapper>
    );
});

export { Wrapper as StyledLabel };
export default memo(Label);
