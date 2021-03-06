import { ReactNode } from 'react';
import { WithClassAndId, WithCssGeneratorFunction } from '../../core/types';

export type ComponentProps = WithClassAndId &
    WithCssGeneratorFunction & {
        children?: ReactNode;
    };
