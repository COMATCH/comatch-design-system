import styled, { css } from 'styled-components';
import { FormFieldContainer } from '../shared';

const CellStyle = css`
    align-items: center;
    display: flex;
    font-family: ${({ theme: { typography } }) => typography.label.fontFamily};
    font-size: ${({ theme: { typography } }) => typography.label.fontSize};
    height: 25px;
    justify-content: center;
    line-height: ${({ theme: { typography } }) => typography.label.lineHeight};
    margin: ${({ theme: { spacing } }) => spacing(1)};
    width: 25px;
`;

const Navigation = styled.div`
    align-items: center;
    display: flex;
    font-size: ${({ theme: { typography } }) => typography.subHeadline2.fontSize};
    font-weight: bold;
    justify-content: space-between;
    padding: ${({ theme: { spacing } }) => `${spacing(2)} ${spacing(2)} 0`};

    button {
        background: none;
        border: none;
        cursor: pointer;
        outline: 0 !important;
        padding: ${({ theme: { spacing } }) => spacing(2)};
        touch-action: manipulation;
    }

    button.disabled {
        pointer-events: none;
    }
`;

const Weekdays = styled.ul`
    border-bottom: 1px solid;
    border-color: inherit;
    display: flex;
    font-weight: bold;
    list-style: none;
    margin: 0;
    padding: ${({ theme: { spacing } }) => `0 ${spacing(2)} ${spacing(2)}`};

    li {
        ${CellStyle}
    }
`;

const Dates = styled.div`
    padding: ${({ theme: { spacing } }) => spacing(2)};

    ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    li {
        ${CellStyle}
        border-radius: ${({ theme: { shapes } }) => shapes.borderRadius};
        cursor: pointer;
        transition: all 250ms ease-out;
        will-change: background-color, border, color, font-weight;

        &.selected {
            background-color: ${({ theme: { palettes } }) => palettes.primary.main.bgColor};
            color: ${({ theme: { palettes } }) => palettes.primary.main.contrast} !important;
            font-weight: bold;
        }

        &.disabled {
            color: ${({ theme: { palettes } }) => palettes.greyScale.main.bgColor};
            cursor: default;
            pointer-events: none;
        }

        &.out-of-scope:not(.disabled) {
            color: ${({ theme: { palettes } }) => palettes.greyScale.dark.bgColor};
        }

        &:hover:not(.selected) {
            background-color: ${({ theme: { palettes } }) => palettes.greyScale.light.bgColor};
        }
    }
`;

const Calendar = styled.div`
    background-color: ${({ theme: { palettes } }) => palettes.greyScale.lighter.bgColor};
    border: 1px solid;
    border-color: ${({ theme: { palettes } }) => palettes.greyScale.main.bgColor};
    border-radius: ${({ theme: { shapes } }) => shapes.borderRadius};
    box-shadow: ${({ theme: { shadows } }) => shadows[1]};
    color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0;
`;

const Wrapper = styled(FormFieldContainer)`
    position: relative;

    input {
        border: none;
        border-radius: ${({ theme: { shapes } }) => shapes.borderRadius};
        color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
        flex: 1;
        font-family: inherit;
        font-size: inherit;
        height: 100%;
        line-height: inherit;
        margin: 0;
        padding: ${({ theme: { spacing } }) => `0 ${spacing(2)}`};
        outline: 0;
        -webkit-appearance: none; /* Remove default appearance styling for Webkit */
        -moz-appearance: none; /* Remove default appearance styling for Firefox */
    }

    ${Calendar} {
        display: none;
        left: 0;
        position: absolute;
        top: calc(100% + 2px);
        z-index: 10;
    }

    &.isCollapsed ${Calendar} {
        display: block;
    }

    &.disabled .Field {
        background-color: rgba(220, 226, 226, 0.2);
    }
`;

export { Calendar, Dates, Navigation, Weekdays, Wrapper };
