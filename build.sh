#!/bin/sh
rm -rf build
mkdir build
cp strto.js package.json README.md CHANGES.md LICENSE build
cd build
uglifyjs strto.js -c -m > strto.min.js
cd ..
tar czf strto.tgz build/*
