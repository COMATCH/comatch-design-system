import React from 'react';
import classnames from 'classnames';

import { StyledChip } from './styled';
import { ComponentProps } from './types';

function Chip(props: ComponentProps) {
    const { id, className, children, disabled, icon, reverse, generateCss } = props;

    if (!children) {
        return null;
    }

    return (
        <StyledChip id={id} className={classnames('Chip', className, { disabled, reverse })} generateCss={generateCss}>
            {!!icon && <div className="Icon">{icon}</div>}
            <div className="Content">{children}</div>
        </StyledChip>
    );
}

export { StyledChip };
export default Chip;
