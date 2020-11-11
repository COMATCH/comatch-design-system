import styled from 'styled-components';
import { runCSSGeneratorFunction, WithCssGeneratorFunction } from '../../core';

const Wrapper = styled.button<WithCssGeneratorFunction & { secondary: boolean }>`
    background-color: ${({ secondary, theme: { palettes } }) =>
        secondary ? 'transparent' : palettes.primary.main.bgColor};
    border: 1px solid;
    border-color: ${({ theme: { palettes } }) => palettes.primary.main.bgColor};
    border-radius: ${({ theme: { shapes } }) => shapes.borderRadius};
    color: ${({ secondary, theme: { palettes } }) =>
        secondary ? palettes.primary.main.bgColor : palettes.primary.main.contrast};
    cursor: pointer;
    display: inline-block;
    font-family: ${({ theme: { typography } }) => typography.body.fontFamily};
    font-size: ${({ theme: { typography } }) => typography.body.fontSize};
    height: 42px;
    line-height: ${({ theme: { typography } }) => typography.body.lineHeight};
    outline: 0 !important;
    padding: ${({ theme: { spacing } }) => `0 ${spacing(4)}`};
    text-decoration: none;
    transition: color 250ms, background-color 250ms, border-color 250ms;
    touch-action: manipulation;
    will-change: color, background-color, border-color;
    white-space: nowrap;

    &:disabled {
        background-color: ${({ secondary, theme: { palettes } }) =>
            secondary ? palettes.greyScale.lighter.bgColor : palettes.greyScale.main.bgColor};
        border-color: ${({ theme: { palettes } }) => palettes.greyScale.main.bgColor};
        color: ${({ secondary, theme: { palettes } }) =>
            secondary ? palettes.greyScale.main.bgColor : palettes.greyScale.lighter.bgColor};
        pointer-events: none;
    }

    &:hover {
        background-color: ${({ secondary }) => (secondary ? 'rgba(0, 149, 179, 0.1)' : 'rgba(0, 149, 179, 0.8)')};
        border-color: ${({ secondary, theme: { palettes } }) =>
            secondary ? palettes.primary.main.bgColor : 'rgba(0, 149, 179, 0.8)'};
    }

    &:active {
        background-color: ${({ secondary, theme: { palettes } }) =>
            secondary ? 'rgba(5, 102, 121, 0.1)' : palettes.info.dark.bgColor};
        border-color: ${({ theme: { palettes } }) => palettes.info.dark.bgColor};
        color: ${({ secondary, theme: { palettes } }) =>
            secondary ? palettes.info.dark.bgColor : palettes.greyScale.lighter.bgColor};
    }

    ${runCSSGeneratorFunction}
`;

export { Wrapper };
