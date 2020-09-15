import styled from 'styled-components';

import { runCSSGeneratorFunction, WithCssGeneratorFunction } from '../../core';
import { MessageLevel } from './types';

const Wrapper = styled.div<WithCssGeneratorFunction & { level?: MessageLevel }>`
    color: ${({ level, theme: { palettes } }) => {
        switch (level) {
            case 'success':
                return palettes.success.dark.bgColor;

            case 'error':
                return palettes.error.dark.bgColor;

            case 'warning':
                return palettes.warning.dark.bgColor;

            case 'info':
                return palettes.info.dark.bgColor;

            case 'inherit':
                return 'inherit';

            default:
                return palettes.greyScale.dark.bgColor;
        }
    }};
    font-family: inherit;
    font-size: ${({ theme: { typography } }) => typography.label.fontSize};
    line-height: ${({ theme: { typography } }) => typography.label.lineHeight};

    ${runCSSGeneratorFunction}
`;

export { Wrapper };
