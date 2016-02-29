import math from './src/math.js';
var repl = require("repl");
var context = repl.start("$ ").context;
context.math = math;