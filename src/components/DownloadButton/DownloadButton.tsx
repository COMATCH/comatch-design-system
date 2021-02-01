import React, { memo } from 'react';

import { noop } from '../../core';
import { ComponentProps } from './types';
import { Wrapper } from './styled';

function DownloadButton(props: ComponentProps) {
    const { children, generateCss, onClick = noop, disabled = false } = props;

    return (
        <Wrapper generateCss={generateCss} onClick={onClick} disabled={disabled}>
            {children}
        </Wrapper>
    );
}

export { Wrapper as StyledDownloadButton };
export default memo(DownloadButton);
