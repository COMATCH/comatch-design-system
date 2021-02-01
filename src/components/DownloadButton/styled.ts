import styled from 'styled-components';
import { runCSSGeneratorFunction, WithCssGeneratorFunction } from '../../core';

const Wrapper = styled.div<WithCssGeneratorFunction>`
    color: ${({ theme: { palettes } }) => palettes.primary.dark.bgColor};

    &:disabled {
        color: ${({ theme: { palettes } }) => palettes.greyScale.main.bgColor};
    }

    &:hover {
        color: ${({ theme: { palettes } }) => palettes.primary.main.bgColor};
    }

    ${runCSSGeneratorFunction}
`;

export { Wrapper };
