import del from "rollup-plugin-delete";
import terser from "@rollup/plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import banner from 'rollup-plugin-banner';
import json from "@rollup/plugin-json";

import pkg from './package.json';

/*
const config = {
    input: 'src/turtle.js', // 進入點
    plugins: [
        commonjs(),
        resolve(),
        del({
            targets: 'dist'
        }),
        terser(),
        globals(),
        builtins()
    ], // 插件
    external: [], // 外部插件
    onwarn(warning, warn) { // 自定義警告
        // do something...
    },
    treeshake: true, // 刪除沒用到的程式碼
    output: [
        {
            file: pkg.main, // 會去讀取 package.json 的 main 欄位
            format: 'cjs', // Common JS
            sourcemap: true,
        }, {
            file: pkg.module, // 會去讀取 package.json 的 module 欄位
            format: 'es', // ES Module
            sourcemap: true,
        }, {
            file: 'dist/turtle.bundle.umd.js',
            format: 'umd',
            name: 'turtle'
        }, { // 輸出檔案
            name: 'bundle', // 全域名稱
            file: 'dist/turtle.bundle.js', // 輸出檔案
            format: 'iife', // 輸出格式
            // sourcemap: true // 是否產生 sourcemap
        }]
}
        */

// export default config;

export default [
    {
        input: ['src/turtle.js'],
        output: {
            name: 'turtle',
            file: pkg.main,
            format: 'umd',
            exports: 'default'
        },
        plugins: [
            resolve(), // so Rollup can find `ms`
            commonjs({
                exports: 'default'
            }), // so Rollup can convert `ms` to an ES module
            del({ targets: 'dist' }),
            banner(`Siyu1017 (c) ${new Date().getFullYear()}\nAll rights reserved.\nturtle.umd.js v${pkg.version}>`),
            terser(),
            globals(),
            json(),
            builtins()
        ]
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    {
        input: 'src/turtle.js',
        output: [
            { name: 'turtle', file: pkg.module, format: 'es' }
        ],
        plugins: [
            resolve(),
            terser(),
            banner(`Siyu1017 (c) ${new Date().getFullYear()}\nAll rights reserved.\nturtle.esm.js v${pkg.version}`),
            globals(),
            json(),
            builtins()
        ]
    }
]