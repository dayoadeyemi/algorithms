"use strict";
require('./euler')
const N = 100000
const T = new NumberTheory(N)
let rad = repeat(1, N+1)
for (let p of T.primes) {
	for (let j = 1; p*j <= N; j++) {
		rad[p*j]*=p
	};
}

let solution = 0
let E = rad.map((r, n) => [r, n]).sort((a, b) => a[0]==b[0]?a[1]-b[1]:a[0]-b[0]).map(prop(1))
console.log(E[10000])