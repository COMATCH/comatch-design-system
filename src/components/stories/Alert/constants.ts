import { AlertSection, ColorSection } from './types';
import palettes from '../../../style/theme/palettes';

const ALERT_MESSAGE =
    'Füllen Sie das kurze Projektbriefing aus. Je mehr Informationen Sie uns über Ihr Projekt geben, umso' +
    'besser können wir Berater auf Ihre Bedürfnisse „matchen".';

const HEADLINE_TEXT = 'Headline for your information';

const SECTIONS: AlertSection[] = [
    {
        title: 'Default',
        subTitle:
            'Default alert conveys information helping the user to understand the context. It`s typically not used in' +
            'response to a user action. The alert appears when the information influences the whole system and not just' +
            'one component. The width and height are adjustable and change according to the container it sits in (width)' +
            'and the amount of text (height). It can exist with (A) and without (B) a headline.',
    },
    {
        title: 'Default with title',
        alertTitle: 'Headline for your information',
    },
    {
        title: 'Inline',
        subTitle: 'Inline alert appears when the information influences a single component.',
        inlineAlert: true,
    },
];

const COLOR_SECTIONS: ColorSection[][] = [
    [
        {
            colorName: 'info-dark',
            colorsRectangle: palettes.primary.dark.bgColor,
            colorIndex: '#056679',
            colorsInfoAlertsLabels: 'info alerts, labels',
        },
        {
            colorName: 'info-light',
            colorsRectangle: palettes.primary.lighter.bgColor,
            colorIndex: '#E7F7F9',
            colorsInfoAlertsLabels: 'info alerts, labels background',
        },
        {
            colorName: 'success-dark',
            colorsRectangle: palettes.success.dark.bgColor,
            colorIndex: '#1B7038',
            colorsInfoAlertsLabels: 'success alerts, labels',
        },
        {
            colorName: 'success-light',
            colorsRectangle: palettes.success.light.bgColor,
            colorIndex: '#F4FFF8',
            colorsInfoAlertsLabels: 'success alerts, labels background',
        },
    ],
    [
        {
            colorName: 'warning-dark',
            colorsRectangle: palettes.warning.dark.bgColor,
            colorIndex: '#B25F01',
            colorsInfoAlertsLabels: 'warning alerts, labels',
        },
        {
            colorName: 'warning-light',
            colorsRectangle: palettes.warning.light.bgColor,
            colorIndex: '#FFFBEE',
            colorsInfoAlertsLabels: 'warning alerts, labels background',
        },
        {
            colorName: 'error-dark',
            colorsRectangle: palettes.error.dark.bgColor,
            colorIndex: '#AD1919',
            colorsInfoAlertsLabels: 'error alerts, labels',
        },
        {
            colorName: 'error-light',
            colorsRectangle: palettes.error.light.bgColor,
            colorIndex: '#FFF8F8',
            colorsInfoAlertsLabels: 'error alerts, labels background',
        },
    ],
];

export { ALERT_MESSAGE, HEADLINE_TEXT, SECTIONS, COLOR_SECTIONS };
