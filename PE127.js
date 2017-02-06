"use strict";
require('./euler')
const N = 120000
const T = new NumberTheory(N)
let rad = repeat(1, N)
for (let p of T.primes) {
	for (let j = 1; p*j < N; j++) {
		rad[p*j]*=p
	};
}

let solution = 0
for (let c = 2; c < N; c++) {
	if (rad[c] == c) continue
	for (let a = 1; a < c/2; a++) {
		let b = c-a
		if (rad[a]*rad[b]*rad[c] < c && gcd(a, b) == 1){
			solution+=c
		}
	};
};
console.log(solution)