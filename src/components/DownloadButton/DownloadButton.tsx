import React, { memo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { noop } from '../../core';
import { ComponentProps } from './types';
import { Wrapper } from './styled';

function DownloadButton(props: ComponentProps) {
    const { children, generateCss, onClick = noop, disabled = false } = props;

    return (
        <Wrapper generateCss={generateCss} onClick={onClick} disabled={disabled}>
            <div className="download-button">
                <FontAwesomeIcon className="icon" icon={faCheck} />
                {children}
            </div>
        </Wrapper>
    );
}

export { Wrapper as StyledDownloadButton };
export default memo(DownloadButton);
