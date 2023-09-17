import typescript from 'rollup-plugin-typescript2';
import path from 'path';
//代码压缩工具
import terser from "@rollup/plugin-terser";

import alias from '@rollup/plugin-alias';

export default {
    input: 'src/index.ts',
    external: [
        path.resolve(__dirname, 'test/index.ts')
    ],
    exclude: ['test/**'],
    output: {
        file: 'lib/index.js',
        format: 'umd',
        name: 'MyLibrary',
    },
    plugins: [
        alias({
            entries: [
                { find: '@', replacement: 'src' },
            ]
        }),
        typescript(),
        terser(),
    ]
};