import styled from 'styled-components';
import { runCSSGeneratorFunction, WithCssGeneratorFunction } from '../../core';
import { Overlay as SharedOverlay } from '../shared/styled';
import { ComponentProps } from './types';

const Drawer = styled.div<WithCssGeneratorFunction & Pick<ComponentProps, 'width'>>`
    background-color: ${({ theme: { palettes } }) => palettes.greyScale.lighter.bgColor};
    border-radius: ${({ theme: { shapes } }) => shapes.borderRadius};
    box-shadow: ${({ theme: { shadows } }) => shadows[2]};
    color: #474747;
    height: ${({ theme: { spacing } }) => `calc(100% - ${spacing(4)})`};
    margin: 0;
    padding: ${({ theme: { spacing } }) => `${spacing(4)} ${spacing(4)} 0`};
    position: relative;
    width: ${({ width = [400, 'px'] }) => {
        if (Array.isArray(width)) {
            const [value = 400, units = 'px'] = width;
            return `${value}${units}`;
        }

        return `${width}px`;
    }};

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

    ${({ theme: { breakpoints } }) => breakpoints.lg} {
        width: ${({ width = [600, 'px'] }) => {
            if (Array.isArray(width)) {
                const [value = 600, units = 'px'] = width;
                return `${value}${units}`;
            }

            return `${width}px`;
        }};
    }

    ${runCSSGeneratorFunction}
`;

const Overlay = styled(SharedOverlay)`
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
