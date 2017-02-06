"use strict";
require('./euler')
const N = 1e6
const T = new NumberTheory(N)

let r; 
for (let i = T.primes.length;i--;){
	let n = T.primes.length-i
	let p = T.primes[i]
	if ((n%2==0?2:2*n*p)%(p*p)>1e10) {
		console.log(n);
		break
	}
}