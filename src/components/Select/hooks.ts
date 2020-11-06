import { RefObject, useEffect } from 'react';
import classnames from 'classnames';

import { noop, useCollapseAndFocus, useSearchOptions, useSelectOptions } from '../../core';

import { ComponentProps, Option } from './types';
import { optionsAreEqual } from './helpers';

function useHandlers({
    fieldWrapperRef,
    multi = false,
    onBlur = noop,
    onChange = noop,
    onFocus = noop,
    options,
    optionsToggle = true,
    value,
}: Pick<ComponentProps, 'multi' | 'onBlur' | 'onChange' | 'onFocus' | 'options' | 'optionsToggle' | 'value'> & {
    fieldWrapperRef: RefObject<HTMLDivElement>;
}) {
    const { isCollapsed, isFocused, toggle: handleToggle } = useCollapseAndFocus(fieldWrapperRef, {
        onClickOutside: onBlur,
        onClickInside: () => {
            if (!isFocused) {
                onFocus();
            }
        },
    });
    const { options: queriedOptions } = useSearchOptions(options);
    const { clearAll, optionIsSelected, options: selectedOptions, setOptions, toggleOption } = useSelectOptions(
        Array.isArray(value) ? value : [...(value ? [value] : [])],
        optionsAreEqual,
        multi,
    );

    const buildOptionHandlers = (option: Option) => ({
        onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
            event.persist();
            event.stopPropagation();

            if (optionsToggle || !optionIsSelected(option)) {
                toggleOption(option);
            }

            if (!multi) {
                handleToggle();
            }
        },
    });

    const buildSelectedOptionHandler = (option: Option) => ({
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
    });

    useEffect(() => {
        onChange({ value: selectedOptions });
    }, [selectedOptions]);

    useEffect(() => {
        if (!isFocused) {
            onBlur();
        }
    }, [isFocused]);

    useEffect(() => {
        if (!value || (Array.isArray(value) && !value.length)) {
            clearAll();
        } else {
            setOptions(Array.isArray(value) ? value : [value]);
        }
    }, [value]);

    return {
        buildOptionHandlers,
        buildSelectedOptionHandler,
        isFocused,
        isCollapsed,
        handleToggle,
        queriedOptions,
        optionIsSelected,
        selectedOptions,
    };
}

export { useHandlers };
