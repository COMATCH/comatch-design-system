import React, { forwardRef, memo } from 'react';
import classnames from 'classnames';

import { useToggle } from '../../core/hooks';
import CollapseIndicator from '../../core/svg/collapse-indicator.svg';

import { ComponentProps } from './types';
import { Content, Title, Wrapper } from './styled';

const Panel = forwardRef<HTMLDivElement, ComponentProps>((props, ref) => {
    const { children, className, open = false, generateCss, id, title } = props;
    const [isOpen, toggleOpenState] = useToggle(open);

    const handleClick = () => {
        toggleOpenState();
    };

    return (
        <Wrapper id={id} className={classnames('Panel', className, { isOpen })} generateCss={generateCss} ref={ref}>
            <Title onClick={handleClick}>
                <div>{title}</div>
                <CollapseIndicator />
            </Title>

            <Content>{children}</Content>
        </Wrapper>
    );
});

export { Wrapper as StyledPanel };
export default memo(Panel);
