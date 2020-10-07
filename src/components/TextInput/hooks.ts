import React, { ChangeEvent, useState } from 'react';

import { noop } from '../../core';
import { ComponentProps } from './types';

/**
 * Custom hook to abstract the handler creation logic.
 * The purpose of this hook is to provide handlers and state values required by the component.
 *
 * @param param0 Component's props
 */
function useHandlers({
    onBlur = noop,
    onChange = noop,
    onFocus = noop,
    value,
}: Pick<ComponentProps, 'onBlur' | 'onChange' | 'onFocus' | 'value'>) {
    const [isFocused, setIsFocused] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);

    const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsFocused(false);
        onBlur(event);
    };

    const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.persist();
        const nextValue = event.target.value;

        setCurrentValue(nextValue);
        onChange({ event, value: nextValue });
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsFocused(true);
        onFocus(event);
    };

    return {
        currentValue,
        handleBlur,
        handleOnChange,
        handleFocus,
        isFocused,
    };
}

export { useHandlers };
