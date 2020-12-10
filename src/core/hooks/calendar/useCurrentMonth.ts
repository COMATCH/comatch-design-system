import { useCallback, useEffect, useMemo, useState } from 'react';
import moment, { MomentInput } from 'moment';
import { CalendarDay } from './types';

/**
 * A custom hook to provide `calendar data` for a particular month.
 *
 * @param startOfWeek The day from which the weeks will start (Monday by default; `1`)
 * @param todaysDate The date from which the hook can interpret the desired month (Today by default)
 * @param min The earliest date which isn't disabled
 * @param max The last date which isn't disabled
 */
export default (
    startOfWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7 = 1,
    todaysDate?: MomentInput,
    min?: MomentInput,
    max?: MomentInput,
) => {
    const [dateFocus, setDateFocus] = useState(moment(todaysDate).startOf('month'));
    const today = useMemo(() => moment(todaysDate), [todaysDate]);

    const jumpToDate = useCallback(
        (date?: MomentInput | 1 | -1) => {
            let newDate = moment(date);
            if (date === 1) newDate = moment(dateFocus).add(1, 'M');
            if (date === -1) newDate = moment(dateFocus).subtract(1, 'M');

            setDateFocus(newDate.startOf('month'));
        },
        [dateFocus, setDateFocus],
    );

    const goToNextMonth = useCallback(() => {
        jumpToDate(1);
    }, [jumpToDate]);

    const goToPrevMonth = useCallback(() => {
        jumpToDate(-1);
    }, [jumpToDate]);

    const dayCalculations = useMemo(() => {
        const days: CalendarDay[] = [];
        const weeks: CalendarDay[][] = [];
        const columns: CalendarDay[][] = [[], [], [], [], [], [], []];
        const month = dateFocus.month();
        const year = dateFocus.year();
        const start = moment(dateFocus).startOf('month');
        const end = moment(dateFocus).endOf('month');
        const endOfWeek = (startOfWeek + 6) % 7 || 7;

        if (start.isoWeekday() !== startOfWeek) {
            const weekDay = start.isoWeekday();
            const neededDays = 7 - ((7 - weekDay + startOfWeek) % 7);

            start.subtract(neededDays, 'days');
        }

        if (end.isoWeekday() !== endOfWeek) {
            const weekDay = end.isoWeekday();
            const neededDays = (7 - weekDay + endOfWeek) % 7;

            end.add(neededDays, 'days');
        }

        for (let tempDate = moment(start); tempDate.isSameOrBefore(end); tempDate.add(1, 'days')) {
            const date = tempDate.clone();
            const dateMonth = tempDate.month();
            const isBefore = min && date.endOf('day').isBefore(min);
            const isAfter = max && date.startOf('day').isAfter(max);
            const disabled = !!(isBefore || isAfter);

            days.push({
                date,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                dayOfWeek: date.isoWeekday() as any,
                disabled,
                nextMonth: dateMonth < month,
                prevMonth: dateMonth > month,
                today: date.isSame(today),
            });
        }

        days.forEach((day, index) => {
            const modPosition = index % 7;

            if (modPosition === 0) {
                weeks.push([]);
            }

            weeks[weeks.length - 1].push(day);
            columns[modPosition].push(day);
        });

        return {
            days,
            weeks,
            columns,
            month,
            year,
        };
    }, [dateFocus, max, min, startOfWeek, today]);

    useEffect(() => {
        setDateFocus(moment(todaysDate).startOf('month'));
    }, [today]);

    return {
        ...dayCalculations,
        today,
        dateFocus,
        jumpToDate,
        goToNextMonth,
        goToPrevMonth,
    };
};
