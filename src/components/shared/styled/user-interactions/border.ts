import { css } from 'styled-components';

export default css`
    border-color: ${({ theme: { palettes } }) => palettes.greyScale.main.bgColor};

    &:hover {
        border-color: ${({ theme: { palettes } }) => palettes.greyScale.dark.bgColor};
    }

    &.hasError {
        border-color: ${({ theme: { palettes } }) => palettes.error.dark.bgColor};
    }

    &.isFocused:not(.hasError),
    &.isFocused:not(.hasError):hover {
        border-color: ${({ theme: { palettes } }) => palettes.primary.main.bgColor};
    }
`;
