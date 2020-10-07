import { ChangeEvent, FocusEvent, ReactNode } from 'react';

import { WithClassAndId, WithCssGeneratorFunction } from '../../core';
import { LabelWithProps, MessageWithProps } from '../shared/types';

export type ComponentProps = WithClassAndId &
    WithCssGeneratorFunction & {
        name: string;

        disabled?: boolean;
        hasError?: boolean;
        label?: ReactNode | LabelWithProps;
        message?: ReactNode | MessageWithProps;
        multi?: boolean;
        onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
        onChange?: (args: { event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>; value: string }) => void;
        onFocus?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
        placeholder?: string;
        type?: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url';
        value?: string;
    };
