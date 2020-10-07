import React, { ReactNode } from 'react';

import { Option as DefaultOption } from '../../core/hooks/options/types';
import { WithClassAndId, WithCssGeneratorFunction } from '../../core';
import { LabelWithProps, MessageWithProps } from '../shared';

export type Option = DefaultOption;

export type OptionsFilter<O = Option> = <T = O>(options: T[], term: string) => T[];

export type ComponentProps = WithClassAndId &
    WithCssGeneratorFunction & {
        name: string;
        options: Option[];

        canClear?: boolean;
        disabled?: boolean;
        hasError?: boolean;
        label?: ReactNode | LabelWithProps;
        message?: ReactNode | MessageWithProps;
        multi?: boolean;
        onBlur?: () => void;
        onChange?: (args: { event?: React.MouseEvent<HTMLLIElement, MouseEvent>; value: Option[] }) => void;
        onFilterOptions?: OptionsFilter;
        onFocus?: () => void;
        optionsToggle?: boolean;
        placeholder?: string;
        value?: Option | Option[];
    };
