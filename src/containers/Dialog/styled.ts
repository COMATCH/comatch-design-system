import styled from 'styled-components';
import { runCSSGeneratorFunction, WithCssGeneratorFunction } from '../../core';

const StyledOverlay = styled.div`
    background-color: rgba(119, 119, 119, 0.25);
    height: 100vh;
    left: 0;
    opacity: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    position: fixed;
    top: 0;
    transition: opacity 250ms ease-in;
    width: 100vw;
    will-change: opacity, z-index;
    z-index: 11;

    &.closed {
        opacity: 0;
        z-index: -1;
    }
`;

const StyledDialog = styled.div<WithCssGeneratorFunction>`
    background-color: ${({ theme: { palettes } }) => palettes.greyScale.lighter.bgColor};
    border-radius: ${({ theme: { shapes } }) => shapes.borderRadius};
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 10px 20px 0 rgba(5, 5, 5, 0.1);
    color: #474747;
    margin: ${({ theme: { spacing } }) => spacing(4)} auto;
    max-width: ${({ theme: { spacing } }) => `calc(100% - ${spacing(8)})`};
    padding: ${({ theme: { spacing } }) => spacing(4)};
    position: relative;
    width: 300px;

    > .CloseDialogAction {
        background: none;
        border: none;
        cursor: pointer;
        outline: 0;
        padding: 0;
        position: absolute;
        right: ${({ theme: { spacing } }) => spacing(4)};
        top: ${({ theme: { spacing } }) => spacing(4)};
        touch-action: manipulation;
        white-space: nowrap;
    }

    > .Header,
    > header {
        font-family: ${({ theme: { typography } }) => typography.headline2.fontFamily};
        font-size: ${({ theme: { typography } }) => typography.headline2.fontSize};
        font-weight: 500;
        line-height: ${({ theme: { typography } }) => typography.headline2.lineHeight};

        .Title {
            font-family: ${({ theme: { typography } }) => typography.headline2.fontFamily};
            font-size: ${({ theme: { typography } }) => typography.headline2.fontSize};
            font-weight: 500;
            line-height: ${({ theme: { typography } }) => typography.headline2.lineHeight};
        }

        > svg {
            margin-right: ${({ theme: { spacing } }) => spacing(2)};
        }

        &.error > svg {
            color: ${({ theme: { palettes } }) => palettes.error.main.bgColor};
        }

        &.info > svg {
            color: ${({ theme: { palettes } }) => palettes.info.main.bgColor};
        }

        &.success > svg {
            color: ${({ theme: { palettes } }) => palettes.success.main.bgColor};
        }

        &.warning > svg {
            color: ${({ theme: { palettes } }) => palettes.warning.main.bgColor};
        }
    }

    > .Content,
    > section {
        margin: ${({ theme: { spacing } }) => spacing(3)} 0;
    }

    > .Footer,
    > footer {
        display: flex;
        flex-direction: column;

        .Button + .Button {
            margin-top: ${({ theme: { spacing } }) => spacing(4)};
        }
    }

    ${({ theme: { breakpoints } }) => breakpoints.lg} {
        width: 550px;

        > footer {
            flex-direction: row;
            justify-content: flex-end;

            .Button + .Button {
                margin-top: 0;
                margin-left: ${({ theme: { spacing } }) => spacing(4)};
            }
        }
    }

    ${runCSSGeneratorFunction}
`;

export { StyledDialog, StyledOverlay };
