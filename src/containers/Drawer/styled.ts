import styled from 'styled-components';
import { runCSSGeneratorFunction, WithCssGeneratorFunction } from '../../core';
import { Overlay as SharedOverlay } from '../shared/styled';
import { ComponentProps } from './types';

function renderDrawerMaxWidth({ maxWidth = [85, '%'] }: Pick<ComponentProps, 'maxWidth'>) {
    if (Array.isArray(maxWidth)) {
        const [value = 400, units = 'px'] = maxWidth;
        return `max-width: ${value}${units};`;
    }

    return `max-width: ${maxWidth}px;`;
}

function renderDrawerWidth({ width }: Pick<ComponentProps, 'width'>) {
    if (typeof width === 'undefined') return '';

    if (Array.isArray(width)) {
        const [value = 400, units = 'px'] = width;
        return `width: ${value}${units};`;
    }

    return `width: ${width}px;`;
}

const Drawer = styled.div<WithCssGeneratorFunction & Pick<ComponentProps, 'maxWidth' | 'width'>>`
    background-color: ${({ theme: { palettes } }) => palettes.greyScale.lighter.bgColor};
    border-radius: ${({ theme: { shapes } }) => shapes.borderRadius};
    box-shadow: ${({ theme: { shadows } }) => shadows[2]};
    color: #474747;
    height: ${({ theme: { spacing } }) => `calc(100% - ${spacing(4)})`};
    margin: 0;
    max-width: 85%;
    padding: ${({ theme: { spacing } }) => `${spacing(4)} ${spacing(4)} 0`};
    position: relative;

    ${renderDrawerMaxWidth}
    ${renderDrawerWidth}

    > .CloseDrawerAction {
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

    ${runCSSGeneratorFunction}
`;

const Overlay = styled(SharedOverlay)`
    display: flex;
    position: fixed;

    ${Drawer} {
        transform: scaleX(1);
        transform-origin: left;
        transition: transform 250ms ease-out;
    }

    &.closed {
        ${Drawer} {
            transform: scaleX(0);
        }
    }
`;

export { Drawer as StyledDrawer, Overlay as StyledOverlay };
