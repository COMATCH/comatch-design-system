import { RefObject, useCallback, useEffect, useState } from 'react';
import { noop } from '../helpers';

type Config = {
    actionDebounce?: number;
    onBlur?: (event: Event) => void;
    onClickInside?: (event: Event) => void;
    onClickOutside?: (event: Event) => void;
    onFocus?: (event: Event) => void;
    toggleOnClickInside?: boolean;
};

export default <T extends HTMLElement>(
    ref: RefObject<T>,
    {
        actionDebounce = 150,
        onBlur = noop,
        onClickInside = noop,
        onClickOutside = noop,
        onFocus = noop,
        toggleOnClickInside = false,
    }: Config = {},
) => {
    const [isFocused, setIsFocused] = useState(false);

    const blur = useCallback(() => {
        // Ensures that the user's interactions are captured before this event is distributed;
        // Fixes misbehaving coming from race conditions
        setTimeout(() => {
            ref.current?.dispatchEvent(new Event('blur'));
        }, actionDebounce);
    }, [ref]);

    const focus = useCallback(() => {
        // Ensures that the user's interactions are captured before this event is distributed;
        // Fixes misbehaving coming from race conditions
        setTimeout(() => {
            ref.current?.dispatchEvent(new Event('focus'));
        }, actionDebounce);
    }, [ref]);

    useEffect(() => {
        const onElementBlurListener = (event: Event) => {
            setIsFocused(false);
            onBlur(event);
        };

        const onElementFocusListener = (event: Event) => {
            setIsFocused(true);
            onFocus(event);
        };

        const onDocumentClickListener = (event: Event) => {
            const clickedInside = !!ref.current?.contains(event.target as Node);

            if (clickedInside) {
                if (toggleOnClickInside) {
                    setIsFocused((focused) => !focused);
                } else {
                    onElementFocusListener(event);
                }

                onClickInside(event);
            } else {
                onElementBlurListener(event);
                onClickOutside(event);
            }
        };

        document.addEventListener('mouseup', onDocumentClickListener);
        ref.current?.addEventListener('blur', onElementBlurListener);
        ref.current?.addEventListener('focus', onElementFocusListener);

        return () => {
            document.removeEventListener('mouseup', onDocumentClickListener);
            ref.current?.removeEventListener('focus', onElementFocusListener);
            ref.current?.removeEventListener('blur', onElementBlurListener);
        };
    }, [ref]);

    return {
        blur,
        focus,
        isFocused,
    };
};
