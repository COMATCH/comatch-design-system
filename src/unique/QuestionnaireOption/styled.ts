import styled from 'styled-components';
import { runCSSGeneratorFunction, WithCssGeneratorFunction } from '../../core';

const Answer = styled.button`
    background-color: inherit;
    border: 2px solid transparent;
    color: inherit;
    cursor: pointer;
    display: block;
    flex: 50% 0;
    min-width: 235px;
    outline: 0 !important;
    padding: ${({ theme: { spacing } }) => `${spacing(4)} ${spacing(6)}`};
    text-decoration: none;
    text-align: left;
    touch-action: manipulation;
    transition: background-color 250ms ease-in, border-color 250ms ease-in, color 250ms ease-in;
    will-change: background-color, border-color, color;

    &:hover,
    &.selected {
        border-color: ${({ theme: { palettes } }) => palettes.primary.main.bgColor};
        z-index: 1;
    }

    &.selected {
        background-color: ${({ theme: { palettes } }) => palettes.primary.lighter.bgColor};
        color: ${({ theme: { palettes } }) => palettes.primary.lighter.contrast};
    }

    &.left-out {
        background-color: ${({ theme: { palettes } }) => palettes.greyScale.light.bgColor};
        color: ${({ theme: { palettes } }) => palettes.greyScale.dark.bgColor};
    }

    &:first-of-type {
        /* top left and top right corners are rounded */
        border-radius: ${({ theme: { shapes } }) => `${shapes.borderRadius} ${shapes.borderRadius} 0 0`};
    }

    &:last-of-type {
        /* bottom left and bottom right corners are rounded */
        border-radius: ${({ theme: { shapes } }) => `0 0 ${shapes.borderRadius} ${shapes.borderRadius}`};
    }

    .Title {
        display: flex;
        font-family: ${({ theme: { typography } }) => typography.subHeadline2.fontFamily};
        font-size: ${({ theme: { typography } }) => typography.subHeadline2.fontSize};
        font-weight: 500;
        justify-content: space-between;
        line-height: ${({ theme: { typography } }) => typography.subHeadline2.lineHeight};
    }

    .Description {
        font-family: ${({ theme: { typography } }) => typography.body.fontFamily};
        font-size: ${({ theme: { typography } }) => typography.body.fontSize};
        font-weight: 400;
        line-height: ${({ theme: { typography } }) => typography.body.lineHeight};
    }

    .Title + .Description {
        margin-top: ${({ theme: { spacing } }) => spacing(1)};
    }

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

    ${({ theme: { breakpoints } }) => breakpoints.lg} {
        padding: ${({ theme: { spacing } }) => `${spacing(4)} ${spacing(6)}`};

        &:first-of-type {
            /* top left and top right corners are rounded */
            border-radius: ${({ theme: { shapes } }) => `${shapes.borderRadius} 0 0 ${shapes.borderRadius}`};
        }

        &:last-of-type {
            /* bottom left and bottom right corners are rounded */
            border-radius: ${({ theme: { shapes } }) => `0 ${shapes.borderRadius} ${shapes.borderRadius} 0`};
        }
    }
`;

const Wrapper = styled.div<WithCssGeneratorFunction>`
    border: 1px solid ${({ theme: { palettes } }) => palettes.greyScale.main.bgColor};
    border-radius: ${({ theme: { shapes } }) => shapes.borderRadius};
    box-shadow: ${({ theme: { shadows } }) => shadows[1]};
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;

    > .DividerLine {
        background: ${({ theme: { palettes } }) => palettes.greyScale.main.bgColor};
        height: 2px;
        left: 50%;
        position: absolute;
        top: calc(50% - 1px);
        transform: translateX(-50%);
        width: 100%;
    }

    > .Divider {
        align-items: center;
        display: flex;
        background-color: ${({ theme: { palettes } }) => palettes.greyScale.lighter.bgColor};
        border: 2px solid ${({ theme: { palettes } }) => palettes.greyScale.main.bgColor};
        border-radius: 50%;
        height: 36px;
        justify-content: center;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 36px;
        z-index: 1;
    }

    ${({ theme: { breakpoints } }) => breakpoints.lg} {
        flex-direction: row;

        > .DividerLine {
            height: 100%;
            top: 0;
            width: 2px;
        }
    }

    ${runCSSGeneratorFunction}
`;

export { Answer, Wrapper };
