import styled from 'styled-components';
import { runCSSGeneratorFunction } from './helpers';
import { WithCssGeneratorFunction } from './types';

const PageWrapper = styled.div<WithCssGeneratorFunction>`
    ${({ theme: { breakpoints } }) => breakpoints.lg} {
        padding: 30px 100px;
    }

    ${runCSSGeneratorFunction}
`;

export { PageWrapper };
