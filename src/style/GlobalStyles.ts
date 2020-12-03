import { createGlobalStyle } from 'styled-components';
import RobotoFontFamily from './fonts/Roboto';

export default createGlobalStyle`
    ${RobotoFontFamily}

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

    body {
        font-size: ${({ theme: { typography } }) => typography.body.fontSize};
        line-height: ${({ theme: { typography } }) => typography.body.lineHeight};
    }

    h1 {
        font-size: ${({ theme: { typography } }) => typography.headline1.fontSize};
        line-height: ${({ theme: { typography } }) => typography.headline1.lineHeight};
    }

    h2 {
        font-size: ${({ theme: { typography } }) => typography.headline2.fontSize};
        line-height: ${({ theme: { typography } }) => typography.headline2.lineHeight};
    }

    h3 {
        font-size: ${({ theme: { typography } }) => typography.subHeadline1.fontSize};
        line-height: ${({ theme: { typography } }) => typography.subHeadline1.lineHeight};
    }

    h4 {
        font-size: ${({ theme: { typography } }) => typography.subHeadline2.fontSize};
        line-height: ${({ theme: { typography } }) => typography.subHeadline2.lineHeight};
    }

    label {
        font-size: ${({ theme: { typography } }) => typography.label.fontSize};
        line-height: ${({ theme: { typography } }) => typography.label.lineHeight};
    }

    ol, ul {
      font-size: ${({ theme: { typography } }) => typography.body.fontSize};
      line-height: ${({ theme: { typography } }) => typography.body.lineHeight};
      
      li {
        padding-left: ${({ theme: { spacing } }) => spacing(3)};
      }
    }
    
    html,
    body,
    #root {
        background-color: ${({ theme: { palettes } }) => palettes.greyScale.lighter.bgColor};
        color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
        font-family: ${({ theme: { typography } }) => typography.body.fontFamily};
    }
`;
