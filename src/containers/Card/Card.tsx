import React, { forwardRef, memo } from 'react';
import classnames from 'classnames';

import { CardProps as ComponentProps } from './types';
import { CardWrapper } from './styled';

const Card = forwardRef<HTMLDivElement, ComponentProps>((props, ref) => {
    const { as, children, content, className, generateCss, id, subTitle, title } = props;

    return (
        <CardWrapper
            {...(as && { as })}
            id={id}
            className={classnames('Card', className)}
            generateCss={generateCss}
            ref={ref}
        >
            <div className="Title">{title}</div>
            {!!subTitle && <div>{subTitle}</div>}
            {(!!children || !!content) && <div className="Content">{children || content}</div>}
        </CardWrapper>
    );
});

export { CardWrapper as StyledCard };
export default memo(Card);
