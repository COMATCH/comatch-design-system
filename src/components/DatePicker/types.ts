import React, { ReactNode } from 'react';
import { Moment, MomentInput } from 'moment';

import { WithClassAndId, WithCssGeneratorFunction } from '../../core';
import { LabelWithProps, MessageWithProps } from '../shared';

export type CalendarDay = {
    date: Moment;
    dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    disabled?: boolean;
    nextMonth?: boolean;
    prevMonth?: boolean;
    today?: boolean;
};

export type ComponentProps = WithClassAndId &
    WithCssGeneratorFunction & {
        name: string;

        disabled?: boolean;
        hasError?: boolean;
        label?: ReactNode | LabelWithProps;
        max?: MomentInput;
        message?: ReactNode | MessageWithProps;
        min?: MomentInput;
        months?: [string, string, string, string, string, string, string, string, string, string, string, string];
        onChange?: (args: {
            event: React.MouseEvent<HTMLLIElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>;
            value?: Date;
        }) => void;
        placeholder?: string;
        startOfWeek?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
        today?: MomentInput;
        value?: MomentInput;
        weekDays?: [string, string, string, string, string, string, string];
    };
