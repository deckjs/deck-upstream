#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var tpr = require('./');

tpr(argv._[0], 'placholder', console.log);