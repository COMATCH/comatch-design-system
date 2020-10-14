import styled from 'styled-components';
import { runCSSGeneratorFunction, WithCssGeneratorFunction } from '../../core';
import { ProgressBar } from './types';

const StepLabel = styled.div`
    align-items: center;
    border: 1px solid;
    border-color: ${({ theme: { palettes } }) => palettes.primary.main.bgColor};
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    font-size: ${({ theme: { typography } }) => typography.label.fontSize};
    height: 20px;
    justify-content: center;
    line-height: ${({ theme: { typography } }) => typography.label.lineHeight};
    text-align: center;
    width: 20px;

    svg {
        width: 10px;
        height: 10px;
    }
`;

const StepTitle = styled.div`
    color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    padding: ${({ theme: { spacing } }) => spacing(2)};
    text-align: center;
`;

const UserProgress = styled.li<ProgressBar>`
    background-color: ${({ theme: { palettes } }) => palettes.greyScale.main.bgColor};
    height: ${({ vertical, length = 0 }) => (vertical ? `${length}px` : '2px')};
    left: ${({ x = 0 }) => `${x}px`};
    position: absolute;
    top: ${({ y = 0 }) => `${y}px`};
    width: ${({ vertical, length = 0 }) => (vertical ? '2px' : `${length}px`)};

    &::after {
        background-color: ${({ theme: { palettes } }) => palettes.primary.main.bgColor};
        content: '';
        height: ${({ progress = 0, vertical, length = 0 }) => (vertical ? `${progress * length}px` : '2px')};
        left: 0;
        position: absolute;
        top: 0;
        transition: ${({ vertical }) => (vertical ? 'height 250ms' : 'width 250ms')};
        width: ${({ progress = 0, vertical, length = 0 }) => (vertical ? '2px' : `${progress * length}px`)};
    }
`;

const Step = styled.li`
    align-items: center;
    display: flex;
    flex-direction: column;

    ${StepLabel} {
        background-color: ${({ theme: { palettes } }) => palettes.greyScale.lighter.bgColor};
        color: ${({ theme: { palettes } }) => palettes.primary.main.bgColor};
        margin: ${({ theme: { spacing } }) => `0 0 ${spacing(2)} 0`};
        transition: background-color 250ms ease-in, border-color 250ms ease-in, color 250ms ease-in;
        will-change: background-color, border-color, color;
    }

    ${StepTitle} {
        font-weight: inherit;
        transition: font-weight 250ms ease-in;
        will-change: font-weight;
    }

    &.vertical {
        flex-direction: row;
        ${StepLabel} {
            margin: ${({ theme: { spacing } }) => `0 ${spacing(2)} 0 0`};
        }
    }

    &.completed,
    &.selected {
        ${StepLabel} {
            background-color: ${({ theme: { palettes } }) => palettes.primary.main.bgColor};
            color: ${({ theme: { palettes } }) => palettes.greyScale.lighter.bgColor};
        }

        ${StepTitle} {
            font-weight: bold;
        }
    }

    &.disabled {
        pointer-events: none;

        ${StepLabel} {
            background-color: ${({ theme: { palettes } }) => palettes.greyScale.main.bgColor};
            border-color: ${({ theme: { palettes } }) => palettes.greyScale.dark.bgColor};
            color: ${({ theme: { palettes } }) => palettes.greyScale.dark.bgColor};
        }
    }

    &:hover:not(.completed):not(.disabled):not(.selected) ${StepLabel} {
        background-color: ${({ theme: { palettes } }) => palettes.primary.lighter.bgColor};
        color: ${({ theme: { palettes } }) => palettes.primary.main.bgColor};
    }

    &.completed:hover ${StepLabel}, &.selected:hover ${StepLabel} {
        background-color: ${({ theme: { palettes } }) => palettes.info.dark.bgColor};
        border-color: ${({ theme: { palettes } }) => palettes.info.dark.bgColor};
        color: ${({ theme: { palettes } }) => palettes.greyScale.lighter.bgColor};
    }
`;

const Stepper = styled.ul<WithCssGeneratorFunction>`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;

    ${Step} {
        flex: 1;
        z-index: 1;
    }

    &.vertical {
        flex-direction: column;
    }

    ${runCSSGeneratorFunction}
`;

export { StepLabel, StepTitle, Step as StyledStep, Stepper as StyledStepper, UserProgress };
