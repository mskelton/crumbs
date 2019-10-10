module.exports = {
  extends: ['standard', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
      ],
      rules: { '@typescript-eslint/explicit-function-return-type': 'off' },
    },
  ],
  rules: {
    'sort-keys': 'error',
  },
}
