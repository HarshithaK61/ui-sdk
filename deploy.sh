#!/usr/bin/env bash

set -e

# Step 1: Clean previous output
rm -rf .output

# Step 2: Build with correct baseURL
echo "Generating Nuxt static site for GitHub Pages..."
yarn generate:gh

# Step 3: Deploy to GitHub Pages via SSH
cd .output/public
touch .nojekyll

git init
git remote add origin https://github.com/HarshithaK61/ui-sdk.git
git checkout -b gh-pages
git add .
git commit -m "Clean deploy without worker"
git push -f origin gh-pages

# Step 4: Return
cd -
echo "Deployed to https://harshithak61.github.io/ui-sdk/"
