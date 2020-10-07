import styled from 'styled-components';
import { FormFieldContainer } from '../shared';

const Placeholder = styled.div`
    color: ${({ theme: { palettes } }) => palettes.greyScale.dark.bgColor};
    margin-left: ${({ theme: { spacing } }) => spacing(2)};
`;

const AvailableOptions = styled.ul`
    background-color: ${({ theme: { palettes } }) => palettes.greyScale.lighter.bgColor};
    border: 1px solid;
    border-color: ${({ theme: { palettes } }) => palettes.greyScale.main.bgColor};
    border-radius: ${({ theme: { shapes } }) => `0 0 ${shapes.borderRadius} ${shapes.borderRadius}`};
    border-top: none;
    box-shadow: ${({ theme: { shadows } }) => shadows[1]};
    list-style: none;
    margin: 0;
    overflow: auto;

    svg + * {
        margin-left: 5px;
    }

    li {
        align-items: center;
        color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
        cursor: pointer;
        display: flex;
        min-height: 30px;
    }

    li:hover {
        background-color: ${({ theme: { palettes } }) => palettes.greyScale.light.bgColor};
    }

    li .SelectionIndicator {
        margin: 0 10px;
        width: 14px; /* Comes from the icon's size */
    }
`;

const SelectedOptionWrapper = styled.li`
    align-items: center;
    border: none;
    border-radius: 3px;
    color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
    display: flex;
    line-height: 1.5;
    margin: ${({ theme: { spacing } }) => spacing(1)};
    margin-left: ${({ theme: { spacing } }) => spacing(2)};
    padding-right: ${({ theme: { spacing } }) => spacing(2)};

    .RemoveAction {
        display: none;

        svg {
            color: inherit;
            cursor: pointer;
            height: 100%;
            padding: ${({ theme: { spacing } }) => `0 ${spacing(2)}`};
        }
    }

    &.isPill {
        border: ${({ theme: { palettes } }) => `1px solid ${palettes.greyScale.dark.bgColor}`};

        & + & {
            margin-left: 0;
        }

        .RemoveAction {
            align-items: center;
            display: flex;
        }
    }
`;

const SelectedOptions = styled.ul`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;

    li + li {
        margin-left: ${({ theme: { spacing } }) => spacing(2)};
    }
`;

const FieldWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;

    /* Will allow for the rotation of icons when needed */
    .FieldIcon svg {
        transform: rotate(0deg);
        overflow: hidden;
        transition: all 250ms ease-out;
        will-change: transform;
    }

    ${AvailableOptions} {
        left: -1px; /* 1px because of the "border" */
        max-height: 0;
        opacity: 0;
        padding: 0;
        position: absolute;
        top: calc(100% + 1px); /* 1px because of the "border" */
        transition: all 250ms;
        width: 100%;
        z-index: 10;
    }

    &.isCollapsed {
        ${AvailableOptions} {
            max-height: 250px;
            opacity: 1;
            padding: ${({ theme: { spacing } }) => `${spacing(2)} 0`};
        }

        .FieldIcon svg {
            transform: rotate(180deg);
        }
    }
`;

const Wrapper = styled(FormFieldContainer)`
    > input {
        border: none;
        height: 0;
        margin: 0;
        outline: 0;
        padding: 0;
        pointer-events: none;
        position: absolute;
        width: 0;
        z-index: -1;
    }

    &.disabled ${FieldWrapper} {
        background-color: rgba(220, 226, 226, 0.2);
    }
`;

export { AvailableOptions, FieldWrapper, Placeholder, SelectedOptions, SelectedOptionWrapper, Wrapper };
