import { ReactNode } from 'react';
import { WithClassAndId, WithCssGeneratorFunction } from '../../core';

export type ComponentProps = WithClassAndId &
    WithCssGeneratorFunction & {
        children: ReactNode;
        htmlFor: string;
        required?: boolean;
        tooltip?: ReactNode;
    };
