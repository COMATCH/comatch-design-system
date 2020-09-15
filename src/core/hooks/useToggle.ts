import { useState } from 'react';

/**
 * Custom hook to provide functionality for toggling a component.
 *
 * @param isToggled The default state (toggled or not)
 * @param onToggle Handler for `toggles`
 */
export default (
    isToggled = false,
    onToggle: (newState: boolean, oldState: boolean) => void = () => {},
): [boolean, (toState?: boolean) => void] => {
    const [toggled, setToggled] = useState(isToggled);

    const toggle = (toState?: boolean) => {
        setToggled((oldState) => {
            const newState = typeof toState === 'boolean' ? toState : !oldState;
            onToggle(newState, oldState);
            return newState;
        });
    };

    return [toggled, toggle];
};
