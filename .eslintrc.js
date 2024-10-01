module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    env: {
      browser: true,
      es2020: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'prettier',
    ],
    plugins: ['@typescript-eslint', 'import'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'react/jsx-key': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-unknown-property': ['error', { ignore: ['xmlns', 'xmlnsXlink'] }],
    },
    overrides: [
      {
        files: ['**/*.tsx', '**/*.ts'],
        rules: {
         '@typescript-eslint/no-unused-vars': 'off',
          'import/no-default-export': 'off',
        },
      },
      {
        files: ['**/*.svg'],
        rules: {
          // Disable all rules for SVG files
          '@typescript-eslint/no-unused-vars': 'off',
          'import/no-default-export': 'off',
        },
      },
    ],
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  };