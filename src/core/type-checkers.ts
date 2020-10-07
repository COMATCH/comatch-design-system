import { isValidElement, ReactNode } from 'react';

function isValidReactNode(node: any): node is ReactNode {
    return isValidElement(node) || ['bigint', 'boolean', 'number', 'string'].includes(typeof node);
}

export { isValidReactNode };
