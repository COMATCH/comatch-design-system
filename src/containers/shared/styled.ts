import styled, { keyframes } from 'styled-components';
import { runCSSGeneratorFunction, WithCssGeneratorFunction } from '../../core';

const appear = keyframes`
    0% { opacity: 0; z-index: -1 }
    1% { opacity: 0 }
    50% { opacity: 0.5 }
    100% { opacity: 1 }
`;

const disappear = keyframes`
    0% { opacity: 1 }
    50% { opacity: 0.5 }
    99% { opacity: 0 }
    100% { opacity: 0; z-index: -1 }
`;

const Overlay = styled.div<WithCssGeneratorFunction>`
    animation: ${appear} 500ms forwards ease-out;
    background-color: rgba(119, 119, 119, 0.25);
    height: 100%;
    left: 0;
    overflow-y: scroll;
    position: absolute;
    top: 0;
    transition: opacity 500ms ease-in;
    width: 100%;
    z-index: 11;

    &.closed {
        animation: ${disappear} 500ms forwards ease-out;
    }

    ${runCSSGeneratorFunction}
`;

export { Overlay };
