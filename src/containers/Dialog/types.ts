import { ReactNode } from 'react';
import { WithClassAndId, WithCssGeneratorFunction } from '../../core';

type ComponentProps = WithClassAndId &
    WithCssGeneratorFunction & {
        children: ReactNode;
        footer?: ReactNode | (() => ReactNode);
        header?: ReactNode | (() => ReactNode);
        isOpen?: boolean;
        onCancel?: [() => void, ReactNode];
        onClose?: () => void;
        onSuccess?: [() => void, ReactNode];
        type?: 'error' | 'info' | 'success' | 'warning';
    };

export type { ComponentProps };
