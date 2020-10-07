/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo, useRef } from 'react';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import { noop } from '../../core';
import { renderLabel, renderMessage } from '../shared';

import { ComponentProps } from './types';
import { AvailableOptions, FieldWrapper, Placeholder, SelectedOptionWrapper, SelectedOptions, Wrapper } from './styled';
import { useHandlers } from './hooks';

function Select(props: ComponentProps) {
    const {
        canClear = true,
        className,
        disabled = false,
        generateCss,
        hasError = false,
        id,
        label,
        message,
        multi = false,
        name,
        placeholder,
    } = props;

    const fieldWrapperRef = useRef<HTMLDivElement>(null);
    const {
        buildOptionHandlers,
        buildSelectedOptionHandler,
        isFocused,
        isCollapsed,
        handleToggle,
        queriedOptions,
        optionIsSelected,
        selectedOptions,
    } = useHandlers({ ...props, fieldWrapperRef });

    return (
        <Wrapper
            className={classnames('Select', className, { disabled, hasError, isFocused })}
            generateCss={generateCss}
            id={id}
        >
            {renderLabel(label, name)}

            <FieldWrapper
                className={classnames('Field', {
                    canClear: selectedOptions.length && canClear,
                    isFocused,
                    isCollapsed,
                })}
                onClick={handleToggle}
                ref={fieldWrapperRef}
            >
                <SelectedOptions>
                    {!!placeholder && !selectedOptions.length && <Placeholder>{placeholder}</Placeholder>}
                    {selectedOptions.map((option) => {
                        const optionProps = buildSelectedOptionHandler(option);

                        return (
                            <SelectedOptionWrapper key={option.id} {...optionProps.wrapper}>
                                <div {...optionProps.removeAction}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </div>
                                {option.label}
                            </SelectedOptionWrapper>
                        );
                    })}
                </SelectedOptions>

                <div className="FieldIcon">
                    <FontAwesomeIcon className="CollapseIndicator" icon={faCaretDown} />
                </div>

                <AvailableOptions>
                    {queriedOptions.map((option) => {
                        const isSelected = optionIsSelected(option);

                        if (isSelected && multi) {
                            return null;
                        }

                        return (
                            <li key={option.id} {...buildOptionHandlers(option)}>
                                <div className="SelectionIndicator">
                                    {isSelected && <FontAwesomeIcon icon={faCheck} />}
                                </div>
                                {option.label}
                            </li>
                        );
                    })}
                </AvailableOptions>
            </FieldWrapper>

            {/* This is used just to allow users to navigate by using the `tab` */}
            <input
                id={name}
                name={name}
                onChange={noop}
                onFocus={handleToggle}
                value={selectedOptions.map((option) => option.value).join(',')}
            />

            {renderMessage(message, hasError)}
        </Wrapper>
    );
}

export { Wrapper as StyledSelect };
export default memo(Select);
