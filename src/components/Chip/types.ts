import { ReactNode } from 'react';
import { WithClassAndId, WithCssGeneratorFunction } from '../../core';

export type ComponentProps = WithClassAndId &
    WithCssGeneratorFunction & {
        children?: ReactNode;
        icon?: ReactNode;
        disabled?: boolean;
        reverse?: boolean;
    };
