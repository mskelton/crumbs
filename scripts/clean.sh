#!/bin/sh

# Clean project root
rm -rf node_modules
rm -rf coverage
rm -f yarn-error.log

# Clean all packages
rm -rf packages/*/coverage
rm -rf packages/*/node_modules
rm -rf packages/*/lib
rm -f packages/*/tsconfig.tsbuildinfo
rm -f packages/*/yarn-error.log
