/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { forwardRef, memo, useRef } from 'react';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons/faCalendarAlt';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

import { uniqueId } from '../../core';
import { renderLabel, renderMessage } from '../shared';

import { MONTHS, WEEK_DAYS } from './constants';
import { Calendar, Dates, Navigation, Weekdays, Wrapper } from './styled';
import { ComponentProps } from './types';
import { useHandlers } from './hooks';

const DatePicker = forwardRef<HTMLInputElement, ComponentProps>((props, ref) => {
    const {
        className,
        disabled = false,
        generateCss,
        hasError = false,
        id,
        label,
        message,
        months = MONTHS,
        name,
        placeholder,
        startOfWeek = 1,
        weekDays = WEEK_DAYS,
    } = props;

    const wrapperRef = useRef<HTMLDivElement>(null);
    const {
        buildDateProps,
        goToNextMonth,
        goToPrevMonth,
        handleUserDeleteAction,
        handleBlur,
        handleFocus,
        isCollapsed,
        isFocused,
        month,
        nextMonthIsDisabled,
        prevMonthIsDisabled,
        selectedDate,
        weeks,
        year,
    } = useHandlers({ ...props, wrapperRef });

    return (
        <Wrapper
            className={classnames('DatePicker', className, { disabled, hasError, isCollapsed, isFocused })}
            generateCss={generateCss}
            id={id}
            ref={wrapperRef}
        >
            {renderLabel(label, name)}

            <div className={classnames('Field', { canClear: !!selectedDate })}>
                <input
                    readOnly
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onKeyDown={handleUserDeleteAction}
                    placeholder={placeholder}
                    ref={ref}
                    type="text"
                    value={selectedDate?.format('DD/MM/YYYY') || ''}
                />
                <div className="FieldIcon">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                </div>
            </div>

            {renderMessage(message, hasError)}

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
});

export { Wrapper as StyledDatePicker };
export default memo(DatePicker);
