#!/bin/sh

if [ $# -eq 0 ]; then
  echo "Package name is required"
  exit 1
fi

# Copy the template directory
cp -R template packages/$1

# Rename the test file
mv packages/$1/test/template.spec.jsx packages/$1/test/$1.spec.jsx

# Replace {{template}} with the package name
files=(package.json README.md)
for file in "${files[@]}"; do
  sed -i '' 's/{{template}}/$file/g' packages/$1/package.json
done
