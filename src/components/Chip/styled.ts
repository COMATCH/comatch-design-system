import styled from 'styled-components';
import { runCSSGeneratorFunction, WithCssGeneratorFunction } from '../../core';

const Chip = styled.div<WithCssGeneratorFunction>`
    border-radius: 15px;
    border: 1px solid;
    border-color: ${({ theme: { palettes } }) => palettes.greyScale.main.bgColor};
    display: inline-flex;
    background-color: ${({ theme: { palettes } }) => palettes.greyScale.lighter.bgColor};
    max-width: 200px;
    margin: ${({ theme: { spacing } }) => spacing(1)};
    padding: ${({ theme: { spacing } }) => `0 ${spacing(2)}`};
    font-size: ${({ theme: { typography } }) => typography.body.fontSize};
    text-align: center;

    &.reverse {
        flex-direction: row-reverse;

        .Icon {
            margin-right: 0;
            margin-left: ${({ theme: { spacing } }) => spacing(2)};
        }
    }

    &.disabled {
        background-color: ${({ theme: { palettes } }) => palettes.greyScale.main.bgColor};
        pointer-events: none;
    }

    .Icon {
        margin-right: ${({ theme: { spacing } }) => spacing(2)};
        color: ${({ theme: { palettes } }) => palettes.greyScale.main.bgColor};
    }

    ${({ theme: { breakpoints } }) => breakpoints.lg} {
        max-width: 350px;
    }

    ${runCSSGeneratorFunction}
`;

export { Chip as StyledChip };
