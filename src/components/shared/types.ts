import { ReactNode } from 'react';
import { ComponentProps as HelperTextProps } from '../HelperText/types';
import { ComponentProps as LabelProps } from '../Label/types';

export type LabelWithProps = [ReactNode, Omit<LabelProps, 'children' | 'htmlFor'>];
export type MessageWithProps = [ReactNode, Omit<HelperTextProps, 'children'>];
