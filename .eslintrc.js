module.exports = {
  root: true,
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
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  plugins: ['import', 'react'],
  rules: {
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
      files: ['**/*.svg'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['*.config.js', '.eslintrc.js'],
      env: {
        node: true
      },
      rules: {
        'import/no-unresolved': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',
        'import/namespace': 'off',
        'import/default': 'off',
        'import/no-duplicates': 'off'
      }
    }
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx']
      }
    },
    react: {
      version: 'detect',
    },
  },
};
