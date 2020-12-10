import { createGlobalStyle } from 'styled-components';
import { CSSGeneratorFunction, runCSSGeneratorFunction, WithCssGeneratorFunction } from '../core';
import RobotoFontFamily from './fonts/Roboto';

const generateGeneralOverwrites: CSSGeneratorFunction = () => `
    select:-moz-focusring {
        /* This will remove the focus dotted outline appearing */
        /* only on Firefox achieving cross browser uniformity */
        color: transparent;
        text-shadow: 0 0 0 #000;
    }

    hr,
    input[type='search'] {
        box-sizing: border-box;
    }
`;

const generateTextStyling: CSSGeneratorFunction = ({ theme: { spacing, typography } }) => `
    body {
        font-size: ${typography.body.fontSize};
        line-height: ${typography.body.lineHeight};
    }

    h1 {
        font-size: ${typography.headline1.fontSize};
        line-height: ${typography.headline1.lineHeight};
    }

    h2 {
        font-size: ${typography.headline2.fontSize};
        line-height: ${typography.headline2.lineHeight};
    }

    h3 {
        font-size: ${typography.subHeadline1.fontSize};
        line-height: ${typography.subHeadline1.lineHeight};
    }

    h4 {
        font-size: ${typography.subHeadline2.fontSize};
        line-height: ${typography.subHeadline2.lineHeight};
    }

    label {
        font-size: ${typography.label.fontSize};
        line-height: ${typography.label.lineHeight};
    }

    ol.TextList,
    ul.TextList {
        font-size: ${typography.body.fontSize};
        line-height: ${typography.body.lineHeight};
    
        > li {
            padding-left: ${spacing(3)};
        }
    }
`;

const generateRootStyling = (rootElementSelector = '#root'): CSSGeneratorFunction => ({
    theme: { palettes, typography },
}) => `
    html,
    body,
    ${rootElementSelector} {
        background-color: ${palettes.greyScale.lighter.bgColor};
        color: ${palettes.greyScale.darker.bgColor};
        font-family: ${typography.body.fontFamily};
    }
`;

export { generateGeneralOverwrites, generateRootStyling, generateTextStyling };
export default createGlobalStyle<WithCssGeneratorFunction & { rootElementSelector?: string }>`
    ${RobotoFontFamily}

    ${generateGeneralOverwrites}
    ${generateTextStyling}
    ${(props) => generateRootStyling(props.rootElementSelector || '#root')(props)}

    ${runCSSGeneratorFunction}
`;
