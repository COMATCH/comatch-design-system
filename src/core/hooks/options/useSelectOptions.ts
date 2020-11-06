import { useMemo, useState } from 'react';
import { Option } from './types';

/**
 * Use this hook to obtain a mechanism to deal with selecting option(s).
 *
 * @param alreadySelectedOptions List of options which are already selected
 * @param optionsAreEqual A function which can compare two options
 * @param multi Whether or not the user can select multiple options at once
 */
export default <T extends Option>(
    alreadySelectedOptions?: T[],
    optionsAreEqual: (a?: T, b?: T) => boolean = (a, b) => a?.id === b?.id,
    multi = false,
) => {
    const [options, setOptions] = useState<T[]>(alreadySelectedOptions || []);

    const optionIsSelected = useMemo(
        () => (option: T) => options.find((selectedOption) => optionsAreEqual(selectedOption, option)),
        [options, optionsAreEqual],
    );

    const clearAll = useMemo(
        () => () => {
            setOptions([]);
        },
        [setOptions],
    );

    const toggleOption = useMemo(
        () => (option: T) => {
            setOptions((currentlySelectedOptions) => {
                if (!multi) {
                    return !currentlySelectedOptions.find((selectedOption) => optionsAreEqual(selectedOption, option))
                        ? [option]
                        : [];
                }

                const newlySelectedOptions = currentlySelectedOptions.filter(
                    (selectedOption) => !optionsAreEqual(selectedOption, option),
                );

                return [
                    ...newlySelectedOptions,
                    ...(newlySelectedOptions.length === currentlySelectedOptions.length ? [option] : []),
                ];
            });
        },
        [alreadySelectedOptions, multi, optionsAreEqual, setOptions],
    );

    return {
        clearAll,
        optionIsSelected,
        options,
        toggleOption,
    };
};
