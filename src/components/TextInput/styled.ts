import styled from 'styled-components';
import { userInteractions, FormFieldContainer } from '../shared';

const Input = styled.input``;

const Wrapper = styled(FormFieldContainer)`
    input,
    textarea {
        border-radius: inherit;
        color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
        flex: 1;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        outline: 0;
    }

    input {
        border: none;
        height: 100%;
        margin: 0;
        padding: ${({ theme: { spacing } }) => `0 ${spacing(2)}`};
    }

    textarea {
        ${userInteractions.border}
        margin: -1px;
        padding: ${({ theme: { spacing } }) => `calc(${spacing(2)} - 2px)`};
        transition: border-color 250ms ease-in;
        will-change: border-color;
    }

    &.disabled input,
    &.disabled textarea {
        background-color: rgba(220, 226, 226, 0.2);
    }

    &.multi,
    &.multi .Field {
        border: none !important;
    }
`;

export { Input, Wrapper };
