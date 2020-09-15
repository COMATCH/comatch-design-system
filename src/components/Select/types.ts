import React, { ReactNode } from 'react';
import { Option as DefaultOption } from '../../core/hooks/options/types';
import { WithClassAndId, WithCssGeneratorFunction } from '../../core';
import { ComponentProps as LabelProps } from '../Label/types';

export type Option = DefaultOption;

export type OptionsFilter<O = Option> = <T = O>(options: T[], term: string) => T[];

export type ComponentProps = WithClassAndId &
    WithCssGeneratorFunction & {
        name: string;
        options: Option[];

        canClear?: boolean;
        disabled?: boolean;
        hasError?: boolean;
        label?: ReactNode;
        labelProps?: Omit<LabelProps, 'children' | 'htmlFor'>;
        message?: ReactNode;
        messageType?: 'success' | 'error' | 'info' | 'warning';
        multi?: boolean;
        onChange?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, selectedOptions: Option[]) => void;
        onFilterOptions?: OptionsFilter;
        optionsToggle?: boolean;
        placeholder?: string;
        value?: Option | Option[];
    };
