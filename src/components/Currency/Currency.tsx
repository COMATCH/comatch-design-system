import React, { memo, useRef } from 'react';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';

import { renderLabel, renderMessage } from '../shared';

import { ComponentProps } from './types';
import { OPTIONS } from './constants';
import { CurrencyIndicator, CurrencySelector, Wrapper } from './styled';
import { useHandlers } from './hooks';

function Currency(props: ComponentProps) {
    const { className, disabled = false, generateCss, hasError = false, id, label, message, name, placeholder } = props;
    const wrapperRef = useRef<HTMLDivElement>(null);
    const {
        buildCurrencyOptionHandlers,
        currency,
        currentValue,
        handleCurrencyChange,
        handleFocus,
        handleValueChange,
        isCollapsed,
        isFocused,
        optionIsSelected,
    } = useHandlers({ ...props, wrapperRef });

    return (
        <Wrapper
            className={classnames('Currency', className, { disabled, hasError, isFocused })}
            generateCss={generateCss}
            id={id}
            onClick={handleFocus}
            ref={wrapperRef}
        >
            {renderLabel(label, name)}

            <div className="Field">
                <CurrencyIndicator dangerouslySetInnerHTML={{ __html: currency.symbol }} />
                <input
                    name={name}
                    onChange={handleValueChange}
                    onFocus={handleFocus}
                    placeholder={placeholder}
                    type="number"
                    value={`${currentValue}`}
                />
                <CurrencySelector className={classnames({ isCollapsed })} onClick={handleCurrencyChange}>
                    {currency.label}
                    <FontAwesomeIcon icon={faCaretDown} />
                    <ul>
                        {OPTIONS.map((option) => (
                            <li key={option.label} {...buildCurrencyOptionHandlers(option)}>
                                <div className="SelectionIndicator">
                                    {optionIsSelected(option) && <FontAwesomeIcon icon={faCheck} />}
                                </div>
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </CurrencySelector>
            </div>

            {renderMessage(message, hasError)}
        </Wrapper>
    );
}

export { Wrapper as StyledCurrency };
export default memo(Currency);
