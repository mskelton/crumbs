#!/bin/sh

# Clean project root
rm -rf node_modules
rm -rf coverage

# Clean all packages
lerna run clean
