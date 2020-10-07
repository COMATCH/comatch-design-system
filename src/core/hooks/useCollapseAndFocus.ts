import { RefObject, useMemo, useState } from 'react';
import { noop } from '../helpers';
import useOnClickOutside from './useOnClickOutside';

export default <T extends Element>(
    wrapperRef: RefObject<T>,
    {
        onBlur = noop,
        onClickInside = noop,
        onClickOutside = noop,
        onFocus = noop,
        toggleOnClickInside = false,
    }: {
        onBlur?: () => void;
        onClickInside?: () => void;
        onClickOutside?: () => void;
        onFocus?: () => void;
        toggleOnClickInside?: boolean;
    } = {},
) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const collapseToggle = (collapsed = !isCollapsed) => {
        setIsCollapsed(collapsed);
    };

    const focusToggle = (focused = !isFocused) => {
        setIsFocused(focused);
        (focused ? onFocus : onBlur)();
    };

    const collapseAndFocus = useMemo(
        () => () => {
            setIsCollapsed(true);
            setIsFocused(true);
        },
        [],
    );

    const toggle = useMemo(
        () => () => {
            collapseToggle();
            focusToggle();
        },
        [],
    );

    const handleClickOutside = useMemo(
        () => () => {
            setIsCollapsed(false);
            setIsFocused(false);
            onClickOutside();
        },
        [onClickOutside],
    );

    const handleClickInside = useMemo(
        () => () => {
            if (toggleOnClickInside) {
                toggle();
            }

            onClickInside();
        },
        [onClickInside],
    );

    useOnClickOutside(wrapperRef, handleClickOutside, handleClickInside);

    return {
        isCollapsed,
        isFocused,
        collapseAndFocus,
        collapseToggle,
        focusToggle,
        toggle,
    };
};
