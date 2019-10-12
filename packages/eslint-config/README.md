# @sage/eslint-config

> Custom ESLint config for the Sage project.

## Description

This package contains the ESLint configuration for the Sage project. It uses the [TypeScript ESLint parser][ts-eslint-parser], [Prettier][prettier], and [Standard JS][standard].

## Installation

```sh
# Yarn
yarn add @sage/eslint-config

# npm
npm install @sage/eslint-config
```

## Usage

In your `.eslintrc` file, add `@sage` to the list of extended configurations.

```json
{
  "extends": ["@sage"]
}
```

[ts-eslint-parser]: https://github.com/typescript-eslint/typescript-eslint
[prettier]: https://prettier.io
[standard]: https://standardjs.com
