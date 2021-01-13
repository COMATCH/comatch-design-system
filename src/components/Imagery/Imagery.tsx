import React from 'react';

import { buildComponentIdAndClassNameFromProps } from '../../core';
import defaultAvatar from '../../static/images/default-avatar.svg';
import { ComponentProps } from './types';
import { StyledImagery } from './styled';

function Imagery(props: ComponentProps) {
    const { alt, avatar, badge, className, id, src, ...rest } = props;

    if (!src && !alt && !avatar) {
        return null;
    }

    return (
        <StyledImagery
            {...buildComponentIdAndClassNameFromProps({ className, id }, 'Imagery', { avatar })}
            alt={alt}
            src={src || defaultAvatar}
            {...rest}
        >
            {!!badge && <div className="Badge">{badge}</div>}
        </StyledImagery>
    );
}

export { StyledImagery };
export default Imagery;
