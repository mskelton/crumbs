# Sage

[![Build Status][build-badge]][repo]

> Shared component and utility library.

## Setup

Run the following command to install dependencies for all packages.

```sh
yarn
```

## Commands

In the following commands, `<package>` should be replaced with the name of the package you want to run the command for.

### Building outputs

Outputs will be built from files in the `src` directory of the package and will be placed in the `lib` directory of the package.

```sh
# Build outputs for all packages.
yarn build
```

### Testing

Tests should be placed in a directory named `test` in the root of the package they apply to. Packages without tests will be ignored.

```sh
# Run tests for all packages.
yarn test

# Run tests for a single package.
cd packages/<package>
yarn test
```

### Cleaning

```sh
# Deletes outputs for all packages and deletes all node_modules directories.
yarn clean
```

### Linting

Linting the project or a package will search for all applicable files regardless of location. Only files and directories that are ignored will be skipped when linting.

The following file extensions will be linted:

- `.ts`
- `.tsx`
- `.js`
- `.jsx`

```sh
# Lint the entire project.
yarn lint

# Lint the entire project and fix any auto-fixable errors.
yarn lint --fix

# Lint a specific package.
cd <package>
yarn lint
```

### Creating a new package

The following script will create a new package in the `packages` directory using the code from the `template` directory. The package name will be used for the test file as well as the README and the package name in `package.json`.

```sh
yarn new <package>
```

[build-badge]: https://github.com/markypython/sage/workflows/Build/badge.svg
[repo]: https://github.com/markypython/sage/actions
