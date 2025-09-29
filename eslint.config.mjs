 // @ts-check
 import js from '@eslint/js';

 /** @type {import('eslint').Linter.FlatConfig[]} */
 export default [
   { ignores: ['node_modules/**', 'dist/**', 'coverage/**'] },
   js.configs.recommended,
   {
     languageOptions: {
       ecmaVersion: 2021,
       sourceType: 'commonjs',
       globals: {
         require: 'readonly',
         module: 'readonly',
         console: 'readonly',
         process: 'readonly',
       },
     },
     linterOptions: { reportUnusedDisableDirectives: true },
     rules: {
       'no-unused-vars': ['warn', { args: 'none' }],
       'no-undef': 'error',
       semi: ['error', 'always'],
     },
   },
 ];
