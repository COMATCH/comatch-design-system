import React, { forwardRef, memo } from 'react';
import classnames from 'classnames';

import { ComponentProps } from './types';
import { Wrapper } from './styled';

const Paper = forwardRef<HTMLDivElement, ComponentProps>((props, ref) => {
    const { children, className, generateCss, id } = props;

    return (
        <Wrapper id={id} className={classnames('Paper', className)} generateCss={generateCss} ref={ref}>
            {children}
        </Wrapper>
    );
});

export { Wrapper as StyledPaper };
export default memo(Paper);
