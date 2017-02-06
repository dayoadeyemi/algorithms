"use strict";
const N = 50000000
const NumberTheory= require('./NumberTheory')
const T = new NumberTheory(Math.floor(Math.sqrt(N)))

let solset = {}
for(let p, i = T.primes.length; i-- && (p = T.primes[i]) && p*p*p*p < N;) {
	for(let q, j = T.primes.length; j-- && (q = T.primes[j]) && q*q*q + p*p*p*p < N;) {
		for(let r, k = T.primes.length; k-- && (r = T.primes[k]) && r*r + q*q*q + p*p*p*p < N;) {
			// console.log(r,p,q, r*r + q*q*q + p*p*p*p)
			solset[r*r + q*q*q + p*p*p*p] = true
		}
	}
}
console.log(Object.keys(solset).length)