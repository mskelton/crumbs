# Sage

[![Build Status][build-badge]][repo]

Shared component and utility library.

## Setup

Run the following command to install all dependencies and build all packages.

```sh
make
```

## Commands

In the following commands, `<package>` should be replaced with the name of the package you want to run the command for. For example, `make test-use-debounce`.

### Building outputs

Outputs will be built from files in the `src` directory of the package and will be placed in the `lib` directory of the package.

Packages without a `src` directory will be ignored but this should only be used for specific cases such as `eslint-config`.

```sh
# Build outputs for all packages
make packages

# Build outputs for a specific package
make <package>
```

### Cleaning

```sh
# Deletes outputs for all packages and deletes all node_modules directories.
make clean

# Deletes outputs for all packages and package-level node_modules directories
# but does NOT delete the root level node_modules directory.
make clean-packages

# Deletes outputs and node_modules for a specific package.
make clean-<package>
```

### Testing

Tests should be placed in a directory named `test` in the root of the package they apply to. Packages without tests will be ignored.

```sh
# Run tests for all packages.
make test

# Delete outputs and node_modules for a specific package.
make test-<package>
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
make lint

# Lint a specific package.
make lint-<package>
```

## Thanks

- [Mark Feltner](https://github.com/feltnerm) for the project which inspired this ([monorepo-es6-dev](https://github.com/feltnerm/monorepo-es6-dev))

[build-badge]: https://github.com/markypython/sage/workflows/Build/badge.svg
[repo]: https://github.com/markypython/sage/actions
