import { ReactNode } from 'react';
import { WithClassAndId, WithCssGeneratorFunction } from '../../core';

type ComponentProps = WithClassAndId &
    WithCssGeneratorFunction & {
        children: ReactNode | (() => ReactNode);
        isOpen?: boolean;
        maxWidth?: number | [number, '%' | 'em' | 'px' | 'rem'];
        onClose?: () => void;
        width?: number | [number, '%' | 'em' | 'px' | 'rem'];
    };

export type { ComponentProps };
