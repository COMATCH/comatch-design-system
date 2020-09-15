import styled from 'styled-components';
import { StyledPaper } from '../Paper';

const Title = styled.div`
    align-items: center;
    cursor: pointer;
    display: flex;
    font-family: ${({ theme: { typography } }) => typography.subHeadline1.fontFamily};
    font-size: ${({ theme: { typography } }) => typography.subHeadline1.fontSize};
    line-height: ${({ theme: { typography } }) => typography.subHeadline1.lineHeight};
    justify-content: space-between;
    padding: 0;

    /* Will allow for the rotation of icons when needed */
    svg {
        margin-right: ${({ theme: { spacing } }) => spacing(2)};
        overflow: hidden;
        transform: rotate(0deg);
        transition: all 250ms ease-out;
        will-change: transform;
    }
`;

const Content = styled.div`
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    margin: 0;
    transition: all 250ms;
`;

const Wrapper = styled(StyledPaper)`
    padding: ${({ theme: { spacing } }) => spacing(3)};

    &.isOpen {
        ${Title} {
            padding-bottom: ${({ theme: { spacing } }) => spacing(3)};

            svg {
                transform: rotate(180deg);
            }
        }

        ${Content} {
            max-height: 100%;
            opacity: 1;
            margin-top: ${({ theme: { spacing } }) => spacing(2)};
        }
    }

    ${({ theme: { breakpoints, spacing } }) => `
        ${breakpoints.lg} {
            padding: ${spacing(4)};

            &.isOpen {
                ${Title} {
                    padding-bottom: ${spacing(4)};
                }
            }
        }
    `}
`;

export { Content, Title, Wrapper };
