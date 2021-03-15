import { ReactNode, ChangeEvent } from 'react';

import { WithClassAndId, WithCssGeneratorFunction } from '../../core';
import { LabelWithProps, MessageWithProps } from '../shared';

export type CurrencyType = 'CHF' | 'EUR' | 'GBP' | 'USD';
export type FieldValue = { currency: CurrencyType; value?: number };
export type ComponentProps = WithClassAndId &
    WithCssGeneratorFunction & {
        name: string;

        disabled?: boolean;
        hasError?: boolean;
        label?: ReactNode | LabelWithProps;
        message?: ReactNode | MessageWithProps;
        onChange?: (args: { event?: ChangeEvent<HTMLInputElement>; value: FieldValue }) => void;
        placeholder?: string;
        value?: FieldValue;
    };
