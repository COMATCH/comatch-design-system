import React, { ReactNode } from 'react';

import { WithClassAndId, WithCssGeneratorFunction } from '../../core';
import { LabelWithProps, MessageWithProps } from '../shared';

export type Option = {
    id: string;
    value: string;
    label: ReactNode;
};

export type ComponentProps = WithClassAndId &
    WithCssGeneratorFunction & {
        name: string;
        options: Option[];

        disabled?: boolean;
        hasError?: boolean;
        label?: ReactNode | LabelWithProps;
        message?: ReactNode | MessageWithProps;
        multi?: boolean;
        onChange?: (args: { event?: React.MouseEvent<HTMLLIElement, MouseEvent>; value: Option[] }) => void;
        placeholder?: string;
        value?: Option | Option[];
    };
