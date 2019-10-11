module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['standard', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: ['react-hooks'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-sort-props': 'error',
    'sort-keys': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
