#!/usr/bin/env bash
npm run coverage
npm run lib
git add .
git commit -m "build"
