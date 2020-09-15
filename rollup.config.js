import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

import bundleSize from 'rollup-plugin-bundle-size';
import cleaner from 'rollup-plugin-cleaner';
import { eslint } from 'rollup-plugin-eslint';
import svgr from '@svgr/rollup';
import typescript from 'rollup-plugin-typescript2';
import url from 'rollup-plugin-url';

import packageJson from './package.json';

export default {
    input: 'src/index.ts',
    external: [...Object.keys(packageJson.dependencies || {})],
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        eslint({
            throwOnError: true,
            exclude: ['src/**/*.ttf', 'src/**/*.svg'],
        }),
        cleaner(),
        resolve({
            customResolveOptions: {
                moduleDirectory: 'node_modules',
            },
        }),
        commonjs(),
        typescript({
            useTsconfigDeclarationDir: true,
        }),
        url({
            include: ['**/*.ttf', '**/*.woff', '**/*.woff2'],
            limit: Infinity,
        }),
        svgr(),
        bundleSize(),
    ],
};
