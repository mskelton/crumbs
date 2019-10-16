# Script locations
PACKAGE_MANAGER = yarn
TRANSPILER = $(PACKAGE_MANAGER) babel
TRANSPILER_OPTS = --source-maps --config-file ../../babel.config.js
LINTER = $(PACKAGE_MANAGER) eslint
LINTER_OPTS = --ext .ts,.tsx,.js,.jsx
TEST_RUNNER = $(PACKAGE_MANAGER) jest

# Directories
PKG_SRCDIR := src
PKG_LIBDIR := lib
PKG_TESTDIR := test
SCRIPTS_DIR := scripts
PKG_TSBUILDINFO := tsconfig.tsbuildinfo
