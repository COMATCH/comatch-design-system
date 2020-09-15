import { useMemo, useState } from 'react';
import moment, { Moment, MomentInput } from 'moment';

/**
 * A custom hook to provide `calendar data` for selecting duration.
 *
 * @param start The default starting date
 * @param end The default ending date
 */
export default (start?: MomentInput, end?: MomentInput) => {
    const [startDate, setStartDate] = useState(start ? moment(start) : undefined);
    const [endDate, setEndDate] = useState(end ? moment(end) : undefined);

    const dateIsWithinRange = useMemo(() => (date: Moment) => date.isBetween(startDate, endDate), [startDate, endDate]);

    const selectAsStartDate = useMemo(
        () => (date?: MomentInput) => {
            const newDate = date ? moment(date) : undefined;

            if (endDate && newDate?.isAfter(endDate)) {
                setStartDate(newDate);
                setEndDate(undefined);
            }
        },
        [endDate],
    );

    const selectAsEndDate = useMemo(
        () => (date?: MomentInput) => {
            const newDate = date ? moment(date) : undefined;

            if (startDate && newDate?.isBefore(startDate)) {
                setEndDate(undefined);
                setStartDate(newDate);
            }
        },
        [startDate],
    );

    return {
        startDate,
        endDate,
        dateIsWithinRange,
        selectAsStartDate,
        selectAsEndDate,
    };
};
