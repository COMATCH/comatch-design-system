/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import classnames from 'classnames';
import { WithClassAndId } from './types';

/**
 * A helper function which will simplify the usage of `generateCss` function/prop.
 *
 * NOTE: The function/prop is usually exposed via the `WithCssGeneratorFunc` interface.
 *
 * @param props The component's current props
 */
function runCSSGeneratorFunction(props: any = {}) {
    const { generateCss = () => '', ...rest } = props;
    return generateCss(rest);
}

/**
 * A helper function which can be used to construct "complex" CSS identifiers for a component.
 *
 * @param param0 `className` and `id` props from the component
 * @param componentClassNames An optional list of classnames (NPM package) to be appended
 */
function buildComponentIdAndClassNameFromProps(
    { className, id }: WithClassAndId,
    ...componentClassNames: Parameters<typeof classnames>
) {
    return {
        ...(id && { id }),
        className: classnames(...componentClassNames, className),
    };
}

/**
 * A helper function which does nothing. It is useful when assigning as a default value for a component's prop.
 *
 * @param args Literally anything...
 */
function noop(...args: any[]) {}

const uniqueIds = [];

/**
 * A helper function which can generate a unique id. (inspired by `lodash/uniqueId`)
 *
 * @param prefix An optional prefix for the ID
 */
function uniqueId(prefix = '') {
    const nextId = uniqueIds.length;
    uniqueIds[nextId] = nextId;
    return `${prefix}${nextId}`;
}

export { buildComponentIdAndClassNameFromProps, noop, runCSSGeneratorFunction, uniqueId };
