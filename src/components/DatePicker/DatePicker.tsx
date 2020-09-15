/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { memo, useMemo, useRef, useState } from 'react';
import moment, { Moment } from 'moment';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons/faCalendarAlt';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

import { noop, uniqueId, useCollapseAndFocus, useCurrentMonth } from '../../core';
import HelperText from '../HelperText';
import Label from '../Label';

import { MONTHS, WEEK_DAYS } from './constants';
import { Calendar, Dates, Navigation, Weekdays, Wrapper } from './styled';
import { CalendarDay, ComponentProps } from './types';

function DatePicker(props: ComponentProps) {
    const {
        label,
        max,
        message,
        months = MONTHS,
        min,
        onChange = noop,
        startOfWeek = 1,
        today,
        value,
        weekDays = WEEK_DAYS,
    } = props;

    const [selectedDate, setSelectedDate] = useState<Moment | undefined>(value ? moment(value) : undefined);
    const { weeks, month, year, goToNextMonth, goToPrevMonth } = useCurrentMonth(startOfWeek, today, min, max);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const { isCollapsed, isFocused, collapseAndFocus, toggle } = useCollapseAndFocus(wrapperRef);

    const [prevMonthIsDisabled, nextMonthIsDisabled] = useMemo(() => {
        const firstWeek = weeks[0];
        const lastWeek = weeks[weeks.length - 1];

        return [!!firstWeek[0].disabled, !!lastWeek[lastWeek.length - 1].disabled];
    }, [weeks]);

    const selectDate = useMemo(
        () => (
            event: React.MouseEvent<HTMLLIElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>,
            newValue?: Moment,
        ) => {
            setSelectedDate(newValue);
            toggle();
            onChange(event, newValue?.toDate());
        },
        [toggle, onChange],
    );

    const buildDateProps = useMemo(
        () => (day: CalendarDay) => {
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
        },
        [selectDate, selectedDate],
    );

    const componentsProps = useMemo(() => {
        const {
            name,

            id,
            className,
            generateCss,
            disabled = false,
            hasError = false,
            labelProps,
            messageType,
            placeholder = 'dd/mm/yyyy',
        } = props;

        return {
            label: { htmlFor: name, ...labelProps },
            input: {
                type: 'text',
                onChange: noop,
                onFocus: collapseAndFocus,
                onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
                    if (event.key === 'Backspace' || event.key === 'Delete') {
                        event.persist();
                        selectDate(event, undefined);
                        collapseAndFocus();
                    }
                },
                placeholder,
                value: selectedDate?.format('DD/MM/YYYY') || '',
            },
            helperText: { level: hasError ? 'error' : messageType },
            wrapper: {
                className: classnames('DatePicker', className, { disabled, hasError, isCollapsed, isFocused }),
                generateCss,
                id,
                ref: wrapperRef,
            },
            fieldWrapper: {
                className: classnames('Field', { canClear: !!selectedDate }),
            },
        };
    }, [props, collapseAndFocus, selectedDate, isCollapsed, isFocused]);

    return (
        <Wrapper {...componentsProps.wrapper}>
            {!!label && <Label {...componentsProps.label}>{label}</Label>}

            <div {...componentsProps.fieldWrapper}>
                <input {...componentsProps.input} />
                <div className="FieldIcon">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                </div>
            </div>

            {message && <HelperText {...componentsProps.helperText}>{message}</HelperText>}

            <Calendar>
                <Navigation>
                    <button
                        type="button"
                        className={classnames({ disabled: prevMonthIsDisabled })}
                        onClick={goToPrevMonth}
                    >
                        {!prevMonthIsDisabled && <FontAwesomeIcon icon={faChevronLeft} />}
                    </button>

                    <span>{`${months[month]} ${year}`}</span>

                    <button
                        type="button"
                        className={classnames({ disabled: nextMonthIsDisabled })}
                        onClick={goToNextMonth}
                    >
                        {!nextMonthIsDisabled && <FontAwesomeIcon icon={faChevronRight} />}
                    </button>
                </Navigation>

                <Weekdays>
                    {[...weekDays.slice(startOfWeek - 1), ...weekDays.slice(0, startOfWeek - 1)].map((weekDayName) => (
                        <li key={weekDayName}>{weekDayName}</li>
                    ))}
                </Weekdays>

                <Dates>
                    {weeks.map((week) => (
                        <ul key={uniqueId()}>
                            {week.map((weekDay) => (
                                <li key={weekDay.date.date()} {...buildDateProps(weekDay)}>
                                    {weekDay.date.date()}
                                </li>
                            ))}
                        </ul>
                    ))}
                </Dates>
            </Calendar>
        </Wrapper>
    );
}

export { Wrapper as StyledDatePicker };
export default memo(DatePicker);
