"use strict";
for (var r in require('ramda')){ GLOBAL[r] = require('ramda')[r]}
const N = 100000000
const SS = n => n*(n+1)*(2*n+1)/6
let sol_set = {}
for (let i = 1; i < Math.sqrt(N); i++) {
	for (let j = i+1; SS(j) < N+SS(i-1); j++) {
		let s = SS(j)-SS(i-1)
		let t = parseInt(s.toString().split('').reverse().join(''))
		if (s == t) sol_set[s]=true
	};
};
console.log(keys(sol_set)
	.map(x => parseInt(x))
	.reduce(add))