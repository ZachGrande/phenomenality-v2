import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { version as reactVersion } from 'react';

export default defineConfig([
  globalIgnores(['.next/']),
  {
    files: ['**/*.{js,mjs,cjs,mts,cts,jsx,ts,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
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
  // { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
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
]);
