/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'styled-components';
import { Theme } from '../src/style';

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
