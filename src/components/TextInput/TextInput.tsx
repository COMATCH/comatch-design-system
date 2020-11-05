import React, { forwardRef, memo } from 'react';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';

import { renderLabel, renderMessage } from '../shared/helpers';

import { ComponentProps } from './types';
import { Input, Wrapper } from './styled';
import { TEXTAREA } from './constants';
import { useHandlers } from './hooks';

function CharacterCounter({
    currentValue,
    max,
    withCharacterCounter,
}: Pick<ComponentProps, 'max' | 'withCharacterCounter'> & { currentValue: string }) {
    if (!withCharacterCounter) {
        return null;
    }

    if (typeof withCharacterCounter === 'boolean' && (typeof max !== 'number' || max <= 0)) {
        return null;
    }

    return (
        <div className="CharacterCounter">
            {typeof withCharacterCounter === 'function'
                ? withCharacterCounter(currentValue, max)
                : `${currentValue.length}/${max}`}
        </div>
    );
}

const TextInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, ComponentProps>((props, ref) => {
    const {
        name,

        className,
        disabled = false,
        generateCss,
        hasError = false,
        id,
        label,
        max,
        message,
        multi = false,
        placeholder = '',
        type = 'text',
        withCharacterCounter,
    } = props;

    const { currentValue, exceedsMaxLength, handleBlur, handleOnChange, handleFocus, isFocused } = useHandlers(props);

    return (
        <Wrapper
            className={classnames('TextInput', className, {
                disabled,
                hasError: hasError || exceedsMaxLength,
                isFocused,
                multi,
            })}
            generateCss={generateCss}
            id={id}
        >
            {renderLabel(label, name)}

            <div className={classnames('Field', { hasActions: !!currentValue })}>
                <Input
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    {...(multi ? { as: TEXTAREA as any, rows: 5 } : { type })}
                    {...(currentValue && props.onChange && { value: currentValue })}
                    className={classnames({ disabled, hasError: hasError || exceedsMaxLength, isFocused })}
                    id={name}
                    name={name}
                    onBlur={handleBlur}
                    onChange={handleOnChange}
                    onFocus={handleFocus}
                    placeholder={placeholder}
                    ref={ref}
                />
                {hasError && (
                    <div className="FieldIcon ErrorIndicator">
                        <FontAwesomeIcon icon={faExclamationCircle} />
                    </div>
                )}
            </div>

            <CharacterCounter currentValue={currentValue || ''} max={max} withCharacterCounter={withCharacterCounter} />
            {renderMessage(message, hasError)}
        </Wrapper>
    );
});

export { Wrapper as StyledTextInput };
export default memo(TextInput);
