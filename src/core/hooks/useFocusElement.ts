import { RefObject, useCallback, useEffect, useState } from 'react';
import { noop } from '../helpers';

type Config = {
    onBlur?: (event: Event) => void;
    onClickInside?: (event: Event) => void;
    onClickOutside?: (event: Event) => void;
    onFocus?: (event: Event) => void;
    toggleOnClickInside?: boolean;
};

export default <T extends HTMLElement>(
    ref: RefObject<T>,
    {
        onBlur = noop,
        onClickInside = noop,
        onClickOutside = noop,
        onFocus = noop,
        toggleOnClickInside = false,
    }: Config = {},
) => {
    const [isFocused, setIsFocused] = useState(false);

    const blur = useCallback(() => {
        ref.current?.dispatchEvent(new Event('blur'));
    }, [ref]);

    const focus = useCallback(() => {
        ref.current?.dispatchEvent(new Event('focus'));
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

        document.addEventListener('mousedown', onDocumentClickListener);
        ref.current?.addEventListener('blur', onElementBlurListener);
        ref.current?.addEventListener('focus', onElementFocusListener);

        return () => {
            document.removeEventListener('mousedown', onDocumentClickListener);
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
