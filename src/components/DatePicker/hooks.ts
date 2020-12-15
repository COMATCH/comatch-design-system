import { RefObject, useMemo, useState } from 'react';
import moment, { Moment } from 'moment';
import classnames from 'classnames';

import { noop, useCurrentMonth, useFocusElement } from '../../core';

import { CalendarDay, ComponentProps } from './types';

function useHandlers({
    max,
    min,
    onChange = noop,
    startOfWeek = 1,
    today,
    value,
    wrapperRef,
}: Pick<ComponentProps, 'max' | 'min' | 'onChange' | 'startOfWeek' | 'today' | 'value'> & {
    wrapperRef: RefObject<HTMLDivElement>;
}) {
    const [selectedDate, setSelectedDate] = useState<Moment | undefined>(value ? moment(value) : undefined);
    const { weeks, month, year, goToNextMonth, goToPrevMonth } = useCurrentMonth(startOfWeek, min || today, min, max);
    const { blur, focus, isFocused } = useFocusElement(wrapperRef);

    const [prevMonthIsDisabled, nextMonthIsDisabled] = useMemo(() => {
        const firstWeek = weeks[0];
        const lastWeek = weeks[weeks.length - 1];

        return [!!firstWeek[0].disabled, !!lastWeek[lastWeek.length - 1].disabled];
    }, [weeks]);

    const selectDate = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>,
        newValue?: Moment,
    ) => {
        setSelectedDate(newValue);
        blur();
        onChange({ event, value: newValue?.toDate() });
    };

    const buildDateProps = (day: CalendarDay) => {
        const { date, disabled, nextMonth, prevMonth } = day;

        return {
            className: classnames({
                disabled,
                'out-of-scope': nextMonth || prevMonth,
                selected: date.isSame(selectedDate),
            }),
            ...(!disabled && {
                onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                    event.persist();
                    selectDate(event, date);
                },
            }),
        };
    };

    const handleUserDeleteAction = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            event.persist();
            selectDate(event, undefined);
            focus();
        }
    };

    return {
        buildDateProps,
        goToNextMonth,
        goToPrevMonth,
        handleUserDeleteAction,
        handleBlur: blur,
        handleFocus: focus,
        isCollapsed: isFocused,
        isFocused,
        month,
        nextMonthIsDisabled,
        prevMonthIsDisabled,
        selectedDate,
        weeks,
        year,
    };
}

export { useHandlers };
