import styled from 'styled-components';
import { PageWrapper as DefaultPageWrapper } from '../../../core/storybook';
import { StyledAlert } from '../..';

const IntroTitle = styled.h1<{ main?: boolean }>`
    color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
    font-size: ${({ main = false }) => (main ? '72px' : '32px')};
    font-weight: bold;
    margin-bottom: 30px;

    & + *,
    * + & {
        margin-top: 50px;
    }
`;

const AlertSections = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;

    > li {
        margin-top: 50px;
    }

    > li > .Title {
        margin: 0;

        font-size: 32px;
        font-weight: bold;
        color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
    }

    > li > .SubTitle {
        margin: 0;

        font-size: 18px;
        font-weight: normal;
        color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
    }

    .Alerts {
        padding: 0;
        margin: 0;
        margin-top: 40px;
        list-style: none;
        display: flex;
        flex-wrap: wrap;

        li {
            flex: 50% 0;

            &:nth-child(odd) ${StyledAlert} {
                margin-left: 0;
            }

            &:nth-child(even) ${StyledAlert} {
                margin-right: 0;
            }
        }
    }
`;

const ColorSections = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;

    > li {
        flex: 50% 0;
    }

    .Section {
        flex-direction: row;
        display: flex;
    }

    .Section > .ColorName {
        width: 86px;

        font-size: 14px;
        font-weight: bold;
        color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
        margin: 10px;
    }

    .Section > .ColorsRectangle {
        width: 30px;
        height: 30px;
        border: solid 1px ${({ theme: { palettes } }) => palettes.greyScale.main.bgColor};
        margin: 10px;
    }

    .Section > .ColorIndex {
        width: 57px;

        font-size: 14px;
        font-weight: bold;
        color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
        margin: 10px;
    }

    .Section > .ColorsInfoAlertsLabels {
        width: 211px;

        font-size: 14px;
        color: ${({ theme: { palettes } }) => palettes.greyScale.darker.bgColor};
        margin: 10px;
    }
`;

const PageWrapper = styled(DefaultPageWrapper)`
    ${StyledAlert} {
        margin: ${({ theme: { spacing } }) => spacing(3)};
    }
`;

export { AlertSections, ColorSections, IntroTitle, PageWrapper };
