import styled from 'styled-components';
import { runCSSGeneratorFunction } from '../../core/helpers';
import { WithCssGeneratorFunction } from '../../core/types';

const Wrapper = styled.div<WithCssGeneratorFunction>`
    background-color: ${({ theme: { palettes } }) => palettes.greyScale.lighter.bgColor};
    border-radius: ${({ theme: { shapes } }) => shapes.borderRadius};
    box-shadow: ${({ theme: { shadows } }) => shadows[1]};

    ${runCSSGeneratorFunction}
`;

export { Wrapper };
