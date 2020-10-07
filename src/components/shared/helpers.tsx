import React, { ReactNode } from 'react';

import { isValidReactNode } from '../../core';
import HelperText from '../HelperText';
import Label from '../Label';
import { LabelWithProps, MessageWithProps } from './types';

/**
 * A helper function to simplify (and automate) rendering a label for a given component.
 *
 * @param labelProp A react node or a tuple with props to be applied to the `label`.
 * @param name A string representing for which `element` the `label` will be.
 */
function renderLabel(labelProp: ReactNode | LabelWithProps, name: string) {
    if (!isValidReactNode(labelProp) && !Array.isArray(labelProp)) {
        return null;
    }

    if (Array.isArray(labelProp) && !isValidReactNode(labelProp[1])) {
        const [node, props] = labelProp as LabelWithProps;
        return (
            <Label htmlFor={name} {...props}>
                {node}
            </Label>
        );
    }

    return <Label htmlFor={name}>{labelProp}</Label>;
}

/**
 * A helper function to simplify (and automate) rendering some helper text for a given component.
 *
 * @param messageProp A react node or a tuple with props to be applied to the `helper text`.
 * @param hasError A flag to indicate whether or not the text should be forced as an `error` type/level.
 */
function renderMessage(messageProp: ReactNode | MessageWithProps, hasError: boolean) {
    if (!isValidReactNode(messageProp) && !Array.isArray(messageProp)) {
        return null;
    }

    if (Array.isArray(messageProp) && !isValidReactNode(messageProp[1])) {
        const [node, { level, ...props }] = messageProp as MessageWithProps;
        return (
            <HelperText level={hasError ? 'error' : level} {...props}>
                {node}
            </HelperText>
        );
    }

    return <HelperText {...(hasError && { level: 'error' })}>{messageProp}</HelperText>;
}

export { renderLabel, renderMessage };
