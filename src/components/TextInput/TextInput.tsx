import React, { forwardRef, memo } from 'react';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';

import { renderLabel, renderMessage } from '../shared/helpers';

import { ComponentProps } from './types';
import { Input, Wrapper } from './styled';
import { TEXTAREA } from './constants';
import { useHandlers } from './hooks';

const TextInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, ComponentProps>((props, ref) => {
    const {
        name,

        className,
        disabled = false,
        generateCss,
        hasError = false,
        id,
        label,
        message,
        multi = false,
        placeholder = '',
        type = 'text',
    } = props;

    const { currentValue, handleBlur, handleOnChange, handleFocus, isFocused } = useHandlers(props);

    return (
        <Wrapper
            className={classnames('TextInput', className, { disabled, hasError, isFocused })}
            generateCss={generateCss}
            id={id}
        >
            {renderLabel(label, name)}

            <div className={classnames('Field', { hasActions: !!currentValue })}>
                <Input
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    {...(multi ? { as: TEXTAREA as any, rows: 5 } : { type })}
                    {...(currentValue && props.onChange && { value: currentValue })}
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

            {renderMessage(message, hasError)}
        </Wrapper>
    );
});

export { Wrapper as StyledTextInput };
export default memo(TextInput);
