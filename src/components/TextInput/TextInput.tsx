import React, { ChangeEvent, memo, useMemo, useState } from 'react';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';

import { noop } from '../../core';
import HelperText from '../HelperText';
import Label from '../Label';

import { ComponentProps } from './types';
import { Wrapper } from './styled';
import { TEXTAREA } from './constants';

function TextInput(props: ComponentProps) {
    const { hasError = false, label, message, onChange = noop, value = '' } = props;

    const [currentValue, setCurrentValue] = useState(value);
    const changeCurrentValue = useMemo(
        () => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            event.persist();
            setCurrentValue(event.target.value);
            onChange(event);
        },
        [onChange],
    );

    const [isFocused, setIsFocused] = useState(false);
    const focus = useMemo(
        () => () => {
            setIsFocused(true);
        },
        [],
    );
    const blur = useMemo(
        () => () => {
            setIsFocused(false);
        },
        [],
    );

    const componentsProps = useMemo(() => {
        const {
            name,

            className,
            disabled = false,
            generateCss,
            id,
            labelProps,
            messageType,
            multi,
            placeholder,
        } = props;

        return {
            wrapper: {
                className: classnames('TextInput', className, { disabled, hasError, isFocused }),
                generateCss,
                id,
            },
            label: { ...labelProps, htmlFor: name },
            inputWrapper: {
                className: classnames('Field', { hasActions: !!currentValue }),
            },
            input: {
                ...(multi && { as: TEXTAREA, rows: 5 }),
                id: name,
                name,
                onBlur: blur,
                onChange: changeCurrentValue,
                onFocus: focus,
                placeholder,
                type: 'text',
                value: currentValue,
            },
            helperText: { level: hasError ? 'error' : messageType },
        };
    }, [blur, changeCurrentValue, currentValue, focus, isFocused, props]);

    return (
        <Wrapper {...componentsProps.wrapper}>
            {!!label && <Label {...componentsProps.label}>{label}</Label>}

            <div {...componentsProps.inputWrapper}>
                <input {...componentsProps.input} />
                {hasError && (
                    <div className="FieldIcon ErrorIndicator">
                        <FontAwesomeIcon icon={faExclamationCircle} />
                    </div>
                )}
            </div>

            {!!message && <HelperText {...componentsProps.helperText}>{message}</HelperText>}
        </Wrapper>
    );
}

export { Wrapper as StyledTextInput };
export default memo(TextInput);
