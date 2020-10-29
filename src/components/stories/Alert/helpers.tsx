import React from 'react';
import { uniqueId } from '../../../core';
import { Alert } from '../..';
import { AlertSection, ColorSection } from './types';
import { ALERT_MESSAGE } from './constants';

const renderAlertSection = (section: AlertSection) => {
    const ALERT_TYPES = ['info' as const, 'success' as const, 'warning' as const, 'error' as const];
    const { title, subTitle, alertTitle, inlineAlert } = section;
    return (
        <li key={uniqueId()}>
            <h3 className="Title">{title}</h3>
            {!!subTitle && <h4 className="SubTitle">{subTitle}</h4>}
            <ul className="Alerts">
                {ALERT_TYPES.map((type) => (
                    <li key={type}>
                        <Alert type={type} title={alertTitle} inline={inlineAlert}>
                            {ALERT_MESSAGE}
                        </Alert>
                    </li>
                ))}
            </ul>
        </li>
    );
};

const renderColorsSection = (section: ColorSection) => {
    const { colorName, colorsRectangle, colorIndex, colorsInfoAlertsLabels } = section;
    return (
        <div key={uniqueId()} className="Section">
            <div className="ColorName">{colorName}</div>
            <div className="ColorsRectangle" style={{ backgroundColor: colorsRectangle }} />
            <div className="ColorIndex">{colorIndex}</div>
            <div className="ColorsInfoAlertsLabels">{colorsInfoAlertsLabels}</div>
        </div>
    );
};

export { renderAlertSection, renderColorsSection };
