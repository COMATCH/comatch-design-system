import { RefObject, useEffect, useState } from 'react';

/**
 * Custom hook to provide functionality for clicking `inside` and `out` of an HTML Element (component).
 *
 * @param ref The HTMLElement
 * @param onClickOutside Handler for `outside` clicks
 * @param onClickInside Handler for `inside` clicks
 */
export default <E extends Element>(
    ref: RefObject<E>,
    onClickOutside: (event: Event, elementRef: RefObject<E>) => void,
    onClickInside: (event: Event, elementRef: RefObject<E>) => void = () => {},
) => {
    const [clickedInside, setClickedInside] = useState(false);

    useEffect(() => {
        const listener = (event: Event) => {
            const eventTarget = event.target as Node;
            const initiallyClickedInside = !!ref.current && ref.current.contains(eventTarget);

            if (initiallyClickedInside) {
                event.stopPropagation();
                onClickInside(event, ref);
                setClickedInside(true);
                return;
            }

            onClickOutside(event, ref);
            setClickedInside(false);
        };

        document.addEventListener('mousedown', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, [ref, onClickOutside, onClickInside]);

    return clickedInside;
};
