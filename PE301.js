"use strict";
const R = require('ramda')
const N = 64
const X = (a, b, c) => a ^ b ^ c
const bin = dec => (dec >>> 0).toString(2)


for (let n = 0; n<N; n++) {
	if ((n ^ (2*n)  ^ (3*n)) == 0) console.log(bin(n))
	else console.log('~', bin(n))
}

let F=R.repeat(0, 30)
F[0] = 1, F[1] = 2
for (let n = 2; n <= 30; n++){
	F[n] = F[n-1] + F[n-2]
}
console.log(F[30])