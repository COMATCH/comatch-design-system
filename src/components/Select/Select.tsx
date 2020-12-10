/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, ReactNode, useCallback, useMemo, useRef } from 'react';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import { useFocusElement } from '../../core';
import { renderLabel, renderMessage } from '../shared';

import { ComponentProps, Option } from './types';
import { useSelected } from './hooks';
import { AvailableOptions, FieldWrapper, SelectedOptions, Wrapper } from './styled';

function Selected(props: {
    multi?: boolean;
    onToggleOption: (option: Option) => void;
    options: Option[];
    placeholder?: ReactNode;
}) {
    const { multi = false, onToggleOption, options, placeholder } = props;

    return (
        <SelectedOptions className={classnames('SelectedOptions', { multi })}>
            {!!placeholder && !options.length && <li className="Placeholder">{placeholder}</li>}
            {options.map((option, index) => {
                const onToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    event.stopPropagation();
                    onToggleOption(option);
                };

                return (
                    <li key={option.id}>
                        {multi && (
                            <button className="Action" onClick={onToggle} type="button" tabIndex={index}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        )}
                        {option.label}
                    </li>
                );
            })}
        </SelectedOptions>
    );
}

function Available(props: {
    multi?: boolean;
    onToggleOption: (option: Option) => void;
    optionIsSelected: (option: Option) => boolean;
    options: Option[];
}) {
    const { multi = false, onToggleOption, optionIsSelected, options } = props;

    return (
        <AvailableOptions className="AvailableOptions">
            {options.map((option) => {
                const isSelected = optionIsSelected(option);
                const onToggle = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                    event.stopPropagation();
                    onToggleOption(option);
                };

                if (multi && isSelected) {
                    return null;
                }

                return (
                    <li key={option.id} onClick={onToggle} role="menuitem">
                        <div className="SelectionIndicator">{isSelected && <FontAwesomeIcon icon={faCheck} />}</div>
                        {option.label}
                    </li>
                );
            })}
        </AvailableOptions>
    );
}

function Select(props: ComponentProps) {
    const {
        className,
        disabled = false,
        generateCss,
        hasError = false,
        id,
        label,
        message,
        multi = false,
        name,
        options: allOptions,
        placeholder,
    } = props;

    const fieldWrapperRef = useRef<HTMLDivElement>(null);
    const { blur, focus, isFocused } = useFocusElement(fieldWrapperRef, { toggleOnClickInside: !multi });
    const { options: selected, onToggleOption, optionIsSelected } = useSelected(props);
    const inputValue = useMemo(() => selected.map((option) => option.value).join(','), [selected, selected.length]);

    const onBlur = useCallback(() => {
        blur();
    }, [blur]);

    const onFocus = useCallback(() => {
        focus();
    }, [focus]);

    return (
        <Wrapper
            className={classnames('Select', className, { disabled, hasError, isFocused })}
            generateCss={generateCss}
            id={id}
        >
            {renderLabel(label, name)}
            <FieldWrapper
                ref={fieldWrapperRef}
                className={classnames('Field', {
                    isFocused,
                    isCollapsed: isFocused,
                })}
            >
                <Selected multi={multi} onToggleOption={onToggleOption} options={selected} placeholder={placeholder} />
                <div className="FieldIcon">
                    <FontAwesomeIcon className="CollapseIndicator" icon={faCaretDown} />
                </div>
                <Available
                    multi={multi}
                    onToggleOption={onToggleOption}
                    optionIsSelected={optionIsSelected}
                    options={allOptions}
                />
            </FieldWrapper>

            {/* This is used just to allow users to navigate by using the `tab` */}
            <input readOnly id={name} name={name} onBlur={onBlur} onFocus={onFocus} value={inputValue} />
            {renderMessage(message, hasError)}
        </Wrapper>
    );
}

export { Wrapper as StyledSelect };
export default memo(Select);
