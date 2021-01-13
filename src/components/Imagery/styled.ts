import styled from 'styled-components';
import { runCSSGeneratorFunction, WithCssGeneratorFunction } from '../../core';
import { ComponentProps } from './types';
import { SIZES } from './constants';

type CustomProps = Pick<ComponentProps, 'alt' | 'badgePosition' | 'inline' | 'size' | 'src'>;

function getSize({ size }: CustomProps) {
    const presetSize = SIZES[size as keyof typeof SIZES];

    if (presetSize) {
        return `
            height: ${presetSize}px;
            width: ${presetSize}px;
        `;
    }

    const { height, width } =
        typeof size === 'object'
            ? size
            : {
                  height: size || SIZES.sm,
                  width: size || SIZES.sm,
              };

    return `
        height: ${height}px;
        width: ${width}px;
    `;
}

function getBadgePositioning({ badgePosition }: CustomProps) {
    switch (badgePosition) {
        case 'bottom-left':
            return 'bottom: 0; left: 0; transform: translateX(-50%);';

        case 'bottom-right':
            return 'bottom: 0; right: 0; transform: translateX(50%);';

        case 'top-left':
            return 'top: 0; left: 0; transform: translateX(-50%);';

        case 'top-right':
            return 'top: 0; right: 0; transform: translateX(50%);';

        default:
            return 'bottom: 0; right: 0; transform: translateX(50%);';
    }
}

const Imagery = styled.div<WithCssGeneratorFunction & CustomProps>`
    display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url('${({ src }) => src}');
    margin: ${({ theme: { spacing } }) => spacing(4)};
    position: relative;

    ${getSize}

    &.avatar {
        border-radius: 50%;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.15);
        display: inline-block;
        min-height: 45px;
        min-width: 45px;
        will-change: box-shadow;
        transition: box-shadow 250ms ease-in;

        &:hover {
            box-shadow: 0px 0px 15px 8px rgba(0, 149, 179, 0.45);
        }
    }

    > .Badge {
        height: 50%;
        position: absolute;
        ${getBadgePositioning}

        > * {
            height: 100%;
        }
    }

    ${runCSSGeneratorFunction}
`;

export { Imagery as StyledImagery };
