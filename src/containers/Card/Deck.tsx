import React, { forwardRef, memo } from 'react';
import classnames from 'classnames';

import Card from './Card';
import { DeckProps as ComponentProps } from './types';
import { DeckWrapper } from './styled';

const Deck = forwardRef<HTMLDivElement, ComponentProps>((props, ref) => {
    const { cards = [], className, control, generateCss, id, title } = props;

    return (
        <DeckWrapper id={id} className={classnames('Deck', className)} generateCss={generateCss} ref={ref}>
            <div>
                <div className="Title">{typeof title === 'function' ? title(cards) : title}</div>
                {!!control && <div className="Control">{typeof control === 'function' ? control(cards) : control}</div>}
            </div>
            <ul>
                {cards.map((cardProps) => (
                    <Card key={cardProps.id} {...cardProps} as="li" />
                ))}
            </ul>
        </DeckWrapper>
    );
});

export { DeckWrapper as StyledDeck };
export default memo(Deck);
