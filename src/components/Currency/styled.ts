import styled from 'styled-components';
import { FormFieldContainer } from '../shared';

const CurrencyIndicator = styled.div`
    border: none;
    color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    min-width: 35px;
    padding: ${({ theme: { spacing } }) => spacing(2)};
    text-align: center;
`;

const CurrencySelector = styled.div`
    align-items: center;
    border: none;
    color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
    display: flex;
    justify-content: center;
    min-width: 50px;
    padding: ${({ theme: { spacing } }) => spacing(2)};
    position: relative;

    > svg {
        margin-left: ${({ theme: { spacing } }) => spacing(2)};
        overflow: hidden;
        transform: rotate(0deg);
        transition: all 250ms ease-out;
        will-change: transform;
    }

    &.isCollapsed {
        ul {
            max-height: 250px;
            opacity: 1;
            padding: ${({ theme: { spacing } }) => `${spacing(2)} 0`};
        }

        > svg {
            transform: rotate(180deg);
        }
    }

    ul {
        background-color: ${({ theme: { palettes } }) => palettes.greyScale.lighter.bgColor};
        border: none;
        box-shadow: ${({ theme: { shadows } }) => shadows[1]};
        left: 0;
        list-style: none;
        margin: 0;
        max-height: 0;
        opacity: 0;
        overflow: auto;
        padding: ${({ theme: { spacing } }) => `${spacing(2)} 0`};
        position: absolute;
        top: calc(100% + 1px); /* 1px because of the "border" */
        transition: all 250ms;
        width: 100%;
        z-index: 10;

        li {
            align-items: center;
            cursor: pointer;
            display: flex;
            min-height: 30px;
        }

        li:hover {
            background-color: ${({ theme: { palettes } }) => palettes.greyScale.light.bgColor};
        }

        li .SelectionIndicator {
            margin: ${({ theme: { spacing } }) => `0 ${spacing(1)}`};
            width: 14px; /* Comes from the icon's size */
        }
    }
`;

const Wrapper = styled(FormFieldContainer)`
    position: relative;

    .Field {
        display: flex;

        input {
            flex: 1;
            border-top: none;
            border-bottom: none;
            border-left: 1px solid;
            border-right: 1px solid;
            border-color: inherit;
            border-radius: 0;
            color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
            display: block;
            font-family: inherit;
            font-size: inherit;
            line-height: 1.5;
            padding: ${({ theme: { spacing } }) => spacing(2)};
            outline: 0;
            width: calc(100% - 20px);
        }
    }
`;

export { CurrencyIndicator, CurrencySelector, Wrapper };
