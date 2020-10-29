import { ReactNode } from 'react';

export type AlertSection = { title: ReactNode; subTitle?: ReactNode; alertTitle?: ReactNode; inlineAlert?: boolean };

export type ColorSection = {
    colorName: ReactNode;
    colorsRectangle: string;
    colorIndex: ReactNode;
    colorsInfoAlertsLabels: ReactNode;
};
