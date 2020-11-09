import { css } from 'styled-components';

export default css`
    color: ${({ theme: { palettes } }) => palettes.greyScale.dark.bgColor};

    .Placeholder {
        color: ${({ theme: { palettes } }) => palettes.greyScale.dark.bgColor};
    }

    &:hover {
        color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
    }

    &.hasError {
        color: ${({ theme: { palettes } }) => palettes.error.dark.bgColor};

        &:hover {
            .FieldIcon:not(.ErrorIndicator),
            .FieldIcon:not(.ErrorIndicator) svg {
                color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
            }
        }

        .FieldIcon:not(.ErrorIndicator),
        .FieldIcon:not(.ErrorIndicator) svg {
            color: ${({ theme: { palettes } }) => palettes.greyScale.dark.bgColor};
        }
    }

    &.isFocused:not(.hasError),
    &.isFocused:not(.hasError):hover {
        .Label {
            color: ${({ theme: { palettes } }) => palettes.primary.main.bgColor};
        }
    }
`;
