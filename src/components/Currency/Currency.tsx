import React, { ChangeEvent, useMemo, useRef, useState } from 'react';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';

import { noop, useCollapseAndFocus, useOnClickOutside } from '../../core';
import HelperText from '../HelperText';
import Label from '../Label';

import { ComponentProps, CurrencyType } from './types';
import { OPTIONS } from './constants';
import { CurrencyIndicator, CurrencySelector, Wrapper } from './styled';

function Currency(props: ComponentProps) {
    const { name, label, message, onChange = noop, value = { currency: 'EUR', value: 0 } } = props;

    const [currentValue, setCurrentValue] = useState(value.value || undefined);
    const [currency, setCurrency] = useState(OPTIONS.find((option) => option.label === value.currency) || OPTIONS[0]);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const { isCollapsed, isFocused, collapseToggle, focusToggle } = useCollapseAndFocus(wrapperRef);

    useOnClickOutside(wrapperRef, () => {
        collapseToggle(false);
    });

    const optionIsSelected = (option: { label: CurrencyType; symbol: string }) => currency.label === option.label;
    const buildCurrencyOptionHandlers = (option: { label: CurrencyType; symbol: string }) => ({
        onClick: () => {
            setCurrency(option);
        },
    });

    const componentsProps = useMemo(() => {
        const {
            id,
            className,
            generateCss,
            disabled = false,
            hasError = false,
            labelProps,
            messageType,
            placeholder,
        } = props;

        const focus = () => {
            focusToggle(true);
        };

        return {
            label: { htmlFor: name, ...labelProps },
            currencyIndicator: {
                dangerouslySetInnerHTML: { __html: currency.symbol },
            },
            currencySelector: {
                className: classnames({ isCollapsed }),
                onClick: () => collapseToggle(),
            },
            input: {
                name,
                onChange: (event: ChangeEvent<HTMLInputElement>) => {
                    event.stopPropagation();
                    event.persist();

                    const nextValue = event.target.value ? parseFloat(event.target.value) : undefined;
                    setCurrentValue(nextValue);
                    onChange(event, { currency: currency.label, value: nextValue });
                },
                onFocus: focus,
                placeholder,
                type: 'number',
                value: `${currentValue}`,
            },
            helperText: { level: hasError ? 'error' : messageType },
            wrapper: {
                className: classnames('Currency', className, { disabled, hasError, isFocused }),
                generateCss,
                id,
                onClick: focus,
                ref: wrapperRef,
            },
        };
    }, [
        collapseToggle,
        currency.label,
        currency.symbol,
        currentValue,
        focusToggle,
        isCollapsed,
        isFocused,
        name,
        onChange,
        props,
    ]);

    return (
        <Wrapper {...componentsProps.wrapper}>
            {!!label && <Label {...componentsProps.label}>{label}</Label>}

            <div className="Field">
                <CurrencyIndicator {...componentsProps.currencyIndicator} />
                <input {...componentsProps.input} />
                <CurrencySelector {...componentsProps.currencySelector}>
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

            {!!message && <HelperText {...componentsProps.helperText}>{message}</HelperText>}
        </Wrapper>
    );
}

export { Wrapper as StyledCurrency };
export default Currency;
