import { ReactNode, ChangeEvent } from 'react';
import { WithClassAndId, WithCssGeneratorFunction } from '../../core';
import { ComponentProps as LabelProps } from '../Label/types';

export type CurrencyType = 'CHF' | 'EUR' | 'GBR' | 'USD';

export type ComponentProps = WithClassAndId &
    WithCssGeneratorFunction & {
        name: string;

        disabled?: boolean;
        hasError?: boolean;
        label?: ReactNode;
        labelProps?: Omit<LabelProps, 'children' | 'htmlFor'>;
        message?: ReactNode;
        messageType?: 'success' | 'error' | 'info' | 'warning';
        onChange?: (
            event: ChangeEvent<HTMLInputElement>,
            nextValue: { currency: CurrencyType; value?: number },
        ) => void;
        placeholder?: string;
        value?: { currency: CurrencyType; value: number };
    };
