import styled from 'styled-components';

export default styled.ul`
    border-color: inherit;
    color: inherit;
    display: flex;
    font-size: inherit;
    list-style: none;
    margin: 0;
    padding: 0;

    .UserAction {
        align-items: center;
        color: inherit;
        display: flex;
        font-size: inherit;
        margin: 0;
        padding: 5px;

        /* Will allow for the rotation of icons when needed */
        svg {
            transform: rotate(0deg);
            overflow: hidden;
            transition: all 250ms ease-out;
            will-change: transform;
        }
    }

    button.UserAction {
        background: none;
        border: none;
        cursor: pointer;
        outline: 0 !important;
        touch-action: manipulation;
    }

    .UserAction + .UserAction {
        margin-left: 10px;
    }
`;
