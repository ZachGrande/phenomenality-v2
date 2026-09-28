import { version as reactVersion } from 'react';

import css from '@eslint/css';
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores([
    '.next/',
    'build/',
    'node_modules/',
    '.firebase/',
    'public/',
    'next-env.d.ts',
  ]),
  {
    files: ['**/*.{js,mjs,cjs,mts,cts,jsx,ts,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.{js,mjs,cjs,mts,cts,jsx,ts,tsx}'],
  })),
  {
    ...pluginReact.configs.flat.recommended,
    files: ['**/*.{js,mjs,cjs,mts,cts,jsx,ts,tsx}'],
  },
  {
    // React 19's automatic JSX runtime; React need not be in scope.
    ...pluginReact.configs.flat['jsx-runtime'],
    files: ['**/*.{js,mjs,cjs,mts,cts,jsx,ts,tsx}'],
  },
  {
    settings: {
      react: {
        version: reactVersion,
      },
    },
  },
  // { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  // { files: ["**/*.jsonc"], plugins: { json }, language: "json/jsonc", extends: ["json/recommended"] },
  // { files: ["**/*.json5"], plugins: { json }, language: "json/json5", extends: ["json/recommended"] },
  // { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
    rules: {
      // Design tokens live in globals.css; other files can't see them.
      'css/no-invalid-properties': ['error', { allowUnknownVariables: true }],
      'css/use-baseline': ['error', { available: 'newly' }],
    },
  },
  {
    // Tailwind's @theme/@source/@utility are not standard CSS at-rules.
    files: ['src/app/globals.css'],
    rules: { 'css/no-invalid-at-rules': 'off' },
  },
  prettierConfig,
  {
    files: ['**/*.{js,mjs,cjs,mts,cts,jsx,ts,tsx}'],
    plugins: { prettier },
    rules: {
      'prettier/prettier': [
        'error',
        { singleQuote: true, trailingComma: 'all' },
      ],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,mts,cts,jsx,ts,tsx}'],
    plugins: { import: pluginImport },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
        },
      ],
    },
  },
]);
