#!/bin/sh
cd src
node constands.js > ../glconstants.js
node constands.js -d > ../glconstants.h
