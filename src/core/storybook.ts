import styled from 'styled-components';
import { runCSSGeneratorFunction } from './helpers';
import { WithCssGeneratorFunction } from './types';

const PageWrapper = styled.div<WithCssGeneratorFunction>`
    padding: 30px 100px;
    ${runCSSGeneratorFunction}
`;

export { PageWrapper };
