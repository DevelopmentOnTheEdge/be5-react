#!/usr/bin/env bash
npm run lib
npm run build
npm run build-min
git add .
npm run coverage