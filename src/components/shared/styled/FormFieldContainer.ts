import styled from 'styled-components';
import { runCSSGeneratorFunction, WithCssGeneratorFunction } from '../../../core';
import { border, color, disabled } from './user-interactions';

/**
 * A container/wrapper which can be used to provide a common structure
 * for all of our `field` components - text, select, date, etc.
 *
 * `NOTE:` Make sure to take advantage of the `classNames` expected by
 * the wrapper - `Label`, `HelperText`, & `Label`
 */
export default styled.div<WithCssGeneratorFunction>`
    ${border}
    ${color}
    ${disabled}
    font-family: ${({ theme: { typography } }) => typography.body.fontFamily};
    font-size: ${({ theme: { typography } }) => typography.body.fontSize};
    line-height: ${({ theme: { typography } }) => typography.body.lineHeight};
    transition: border-color 250ms ease-in, color 250ms ease-in;
    will-change: border-color, color;

    > .Label + *,
    > * + .HelperText {
        margin-top: ${({ theme: { spacing } }) => spacing(1)};
    }

    > .Label {
        color: inherit;
        will-change: color;
    }

    > .Field {
        border: 1px solid;
        border-color: inherit;
        border-radius: ${({ theme: { shapes } }) => shapes.borderRadius};
        color: inherit;
        display: flex;
        font-family: inherit;
        font-size: inherit;
        height: 38px; /* not 40 because of the border */
        line-height: inherit;
        margin: 0;
        width: calc(100% - 2px);
        will-change: border-color, color;
    }

    > .Field > .FieldIcon {
        align-items: center;
        display: flex;
        justify-content: center;
        margin: ${({ theme: { spacing } }) => spacing(2)};
    }

    .FieldIcon.ErrorIndicator,
    .FieldIcon.ErrorIndicator svg {
        color: ${({ theme: { palettes } }) => palettes.error.dark.bgColor};
    }

    ${runCSSGeneratorFunction}
`;
