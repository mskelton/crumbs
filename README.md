# Crumbs

[![Build Status][build-badge]][repo]

> Shared component and utility library.

## Purpose

The purpose of this repository is to provide a set of small, reusable, "crumbs" to simplify development of React applications. Each package, or "crumb", is individual published to allow applications to pick and choose crumbs as needed.

## Setup

Run the following command to install dependencies for all crumbs.

```sh
yarn
```

## Commands

In the following commands, `<crumb>` should be replaced with the name of the crumb you want to run the command for.

### Building outputs

Outputs will be built from files in the `src` directory of the crumb and will be placed in the `lib` directory of the crumb.

```sh
# Build outputs for all crumbs.
yarn build
```

### Testing

Tests should be placed in a directory named `test` in the root of the crumb they apply to. Crumbs without tests will be ignored.

```sh
# Run tests for all crumbs.
yarn test

# Run tests for a single crumb.
cd packages/<crumb>
yarn test
```

### Cleaning

```sh
# Deletes outputs for all crumbs and deletes all node_modules directories.
yarn clean
```

### Linting

Linting the project or a crumb will search for all applicable files regardless of location. Only files and directories that are ignored will be skipped when linting.

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

# Lint a specific crumb.
cd packages/<crumb>
yarn lint
```

### Creating a new crumb

The following script will create a new crumb in the `packages` directory using the code from the `template` directory. The crumb name will be used for the test file as well as the README and the crumb name in `crumb.json`.

```sh
yarn new <crumb>
```

[build-badge]: https://github.com/markypython/crumb/workflows/Build/badge.svg
[repo]: https://github.com/markypython/crumb/actions
