import { useEffect, useState } from 'react';
import { noop } from '../../core';
import { ComponentProps, Option } from './types';

function useSelected({ multi = false, onChange = noop, value }: Pick<ComponentProps, 'multi' | 'onChange' | 'value'>) {
    const [prevValue, setPrevValue] = useState<Option | Option[]>();
    const [selected, setSelected] = useState<Option[]>([]);
    const optionIsSelected = (option: Option) => !!selected.find(({ id }) => id === option.id);
    const onToggleOption = (option: Option) => {
        const options = [...selected];
        const indexWithinSelected = options.findIndex(({ id }) => id === option.id);
        if (indexWithinSelected >= 0) {
            options.splice(indexWithinSelected, 1);
        } else if (!multi) {
            options[0] = option;
        } else {
            options.push(option);
        }

        setSelected(options);
        onChange({ value: options });
    };

    useEffect(
        function handleValueChanges() {
            // If the value hasn't changed then skip
            if (value === prevValue) {
                return;
            }

            // If the value is to cleared, then reset selected
            if (!value) {
                setSelected([]);
                setPrevValue(value);
                return;
            }

            // Since it's not clearing, the component will need to check if the two arrays match
            // - e.g. if all elements are where they're supposed to be at
            const newValue = Array.isArray(value) ? value : [value];
            let shouldUpdateTheSelected = newValue.length !== selected.length;
            if (!shouldUpdateTheSelected) {
                for (let x = 0; x < newValue.length; x += 1) {
                    if (!selected.find(({ id }) => id === newValue[x].id)) {
                        shouldUpdateTheSelected = true;
                        break;
                    }
                }
            }

            if (shouldUpdateTheSelected) {
                setSelected(newValue);
            }

            // Store the current value for next computation
            setPrevValue(value);
        },
        [value],
    );

    return {
        onToggleOption,
        options: selected,
        optionIsSelected,
    };
}

export { useSelected };
