import { ReactNode } from 'react';
import { WithClassAndId, WithCssGeneratorFunction } from '../../core';

export type ComponentProps = WithClassAndId &
    WithCssGeneratorFunction & {
        alt?: string;
        avatar?: boolean;
        badge?: ReactNode;
        badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
        inline?: boolean;
        size?: 'sm' | 'md' | 'lg' | number | Record<'height' | 'width', number>;
        src?: string;
    };
