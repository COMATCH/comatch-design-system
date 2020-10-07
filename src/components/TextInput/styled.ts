import styled from 'styled-components';
import { FormFieldContainer } from '../shared';

const Input = styled.input``;

const Wrapper = styled(FormFieldContainer)`
    input {
        border: none;
        border-radius: ${({ theme: { shapes } }) => shapes.borderRadius};
        color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
        flex: 1;
        height: 100%;
        margin: 0;
        padding: ${({ theme: { spacing } }) => `0 ${spacing(2)}`};
        outline: 0;
    }

    &.disabled input {
        background-color: rgba(220, 226, 226, 0.2);
    }
`;

export { Input, Wrapper };
