import globals from 'globals';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

export default [
  stylistic.configs.recommended,
  pluginJs.configs.recommended,
  {
    files: ['**/*.js'],
  },
  {
    ignores: ['dist/', 'node_modules/'],
  },
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        sourceType: 'module',
      },
    },
  },
];
