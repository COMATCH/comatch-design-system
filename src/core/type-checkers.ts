import { isValidElement, ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isValidReactNode(node: any): node is ReactNode {
    return isValidElement(node) || ['bigint', 'boolean', 'number', 'string'].includes(typeof node);
}

export { isValidReactNode };
