import styled from 'styled-components';
import { FormFieldContainer } from '../shared';

const CheckboxInput = styled.div`
    background-color: ${({ theme: { palettes } }) => palettes.greyScale.lighter.bgColor};
    border: 1px solid;
    border-color: inherit;
    border-radius: 1px;
    height: 15px;
    margin-top: 2px;
    position: relative;
    width: 15px;

    & ~ *,
    * ~ & {
        margin-right: 10px;
    }

    .CheckboxInput__tick {
        color: ${({ theme: { palettes } }) => palettes.primary.main.bgColor};
        position: absolute;
        left: 50%;
        top: 50%;
        transform: scale(0) translate3d(-50%, -50%, 0);
        transform-origin: top left;
        transition: transform 400ms cubic-bezier(0.45, 1.8, 0.5, 0.75);
    }
`;

const Wrapper = styled(FormFieldContainer)`
    align-items: center;
    cursor: pointer;
    display: inline-flex;
    position: relative;

    input {
        display: none;

        /*
         *  When actually input has state :checked
         *  make the tick of the pseudo-checkbox show up
         */
        &:checked ~ ${CheckboxInput} .CheckboxInput__tick {
            transform: scale(1) translate3d(-50%, -50%, 0);
        }
    }

    &.disabled ${CheckboxInput} {
        background-color: rgba(220, 226, 226, 0.2);
    }
`;

export { CheckboxInput, Wrapper };
