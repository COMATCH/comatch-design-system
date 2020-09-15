/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo, useMemo, useRef } from 'react';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import { noop, useCollapseAndFocus, useSearchOptions, useSelectOptions } from '../../core';
import Label from '../Label';
import HelperText from '../HelperText';

import { ComponentProps, Option } from './types';
import { optionsAreEqual } from './helpers';
import { AvailableOptions, FieldWrapper, Placeholder, SelectedOptionWrapper, SelectedOptions, Wrapper } from './styled';

function Select(props: ComponentProps) {
    const {
        options,

        canClear = true,
        label,
        message,
        multi = false,
        onChange: notifyListeners = () => {},
        onFilterOptions: filterOptions = (currentOptions: Option[], term: string) => currentOptions,
        optionsToggle = true,
        placeholder,
        value = [],
    } = props;

    const fieldWrapperRef = useRef<HTMLDivElement>(null);
    const { isCollapsed, isFocused, toggle } = useCollapseAndFocus(fieldWrapperRef);
    const { options: queriedOptions } = useSearchOptions(options);
    const { optionIsSelected, options: selectedOptions, toggleOption } = useSelectOptions(
        Array.isArray(value) ? value : [...(value ? [value] : [])],
        optionsAreEqual,
        multi,
    );

    const buildOptionHandlers = useMemo(
        () => (option: Option) => ({
            onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                event.persist();
                event.stopPropagation();

                if (optionsToggle || !optionIsSelected(option)) {
                    toggleOption(option);
                    notifyListeners(event, selectedOptions);
                }

                if (!multi) {
                    toggle();
                }
            },
        }),
        [multi, optionIsSelected, optionsToggle, toggle, toggleOption],
    );

    const buildSelectedOptionHandler = useMemo(
        () => (option: Option) => ({
            wrapper: {
                id: option.id,
                className: classnames({ isPill: multi }),
            },
            removeAction: {
                role: 'button',
                className: 'UserAction RemoveAction',
                onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    event.stopPropagation();
                    toggleOption(option);
                },
            },
        }),
        [multi, toggleOption],
    );

    const componentsProps = useMemo(() => {
        const {
            name,

            className,
            generateCss,
            labelProps,
            messageType,
            disabled = false,
            hasError = false,
            id,
        } = props;

        return {
            wrapper: {
                className: classnames('Select', className, { disabled, hasError, isFocused }),
                generateCss,
                id,
            },
            label: { htmlFor: name, ...labelProps },
            input: {
                id: name,
                name,
                onChange: noop,
                onFocus: toggle,
                value: selectedOptions.map((option) => option.value),
            },
            selectWrapper: {
                className: classnames('Field', {
                    canClear: selectedOptions.length && canClear,
                    isFocused,
                    isCollapsed,
                }),
                onClick: toggle,
                ref: fieldWrapperRef,
            },
            helperText: { level: hasError ? 'error' : messageType },
        };
    }, [canClear, isCollapsed, isFocused, props, selectedOptions, toggle]);

    return (
        <Wrapper {...componentsProps.wrapper}>
            {!!label && <Label {...componentsProps.label}>{label}</Label>}

            <FieldWrapper {...componentsProps.selectWrapper}>
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
            <input {...componentsProps.input} />

            {message && <HelperText {...componentsProps.helperText}>{message}</HelperText>}
        </Wrapper>
    );
}

export { Wrapper as StyledSelect };
export default memo(Select);
