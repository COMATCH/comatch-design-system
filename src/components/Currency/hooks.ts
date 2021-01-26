import { ChangeEvent, RefObject, useEffect, useState } from 'react';

import { noop, useCollapseAndFocus, useOnClickOutside } from '../../core';

import { ComponentProps, CurrencyType } from './types';
import { DEFAULT_VALUE, OPTIONS } from './constants';

function useHandlers({
    onChange = noop,
    value = { ...DEFAULT_VALUE },
    wrapperRef,
}: Pick<ComponentProps, 'onChange' | 'value'> & { wrapperRef: RefObject<HTMLDivElement> }) {
    const [prevValue, setPrevValue] = useState(value.value || undefined);
    const [currentValue, setCurrentValue] = useState(value.value || undefined);
    const [currency, setCurrency] = useState(OPTIONS.find((option) => option.label === value.currency) || OPTIONS[0]);
    const { isCollapsed, isFocused, collapseToggle, focusToggle } = useCollapseAndFocus(wrapperRef);

    const optionIsSelected = (option: { label: CurrencyType; symbol: string }) => currency.label === option.label;
    const buildCurrencyOptionHandlers = (option: { label: CurrencyType; symbol: string }) => ({
        onClick: () => {
            setCurrency(option);
        },
    });

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();

        const { value: nextValue } = event.target;
        setCurrentValue(nextValue ? parseFloat(nextValue) : undefined);
    };

    const handleCurrencyChange = () => {
        collapseToggle();
    };

    const handleFocus = () => {
        focusToggle(true);
    };

    useEffect(() => {
        onChange({ value: { currency: currency.label, value: currentValue } });
    }, [currency, currentValue]);

    useEffect(() => {
        if (prevValue === value.value) return;

        setPrevValue(value.value);
        setCurrentValue(value.value);
    }, [value.value]);

    useOnClickOutside(wrapperRef, () => {
        collapseToggle(false);
    });

    return {
        buildCurrencyOptionHandlers,
        currency,
        currentValue,
        handleCurrencyChange,
        handleFocus,
        handleValueChange,
        isCollapsed,
        isFocused,
        optionIsSelected,
    };
}

export { useHandlers };
