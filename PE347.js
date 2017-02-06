"use strict";
require('./euler')
const N = 10000000
const T = new NumberTheory(N)

const M = (p, q, N) => {
	let ret = 0
	for (let r = Math.floor(Math.log(N)/Math.log(p)); r > 0;r--) {
		let s = Math.floor(Math.log(N/Math.pow(p, r))/Math.log(q))
		if (s > 0) {
			let val = Math.pow(p, r)*Math.pow(q, s)
			ret = ret > val ? ret : val
		}
	}
	return ret
}

const S = N => {
	let total = 0
	for (let i = T.primes.length; i-- && T.primes[i] <= N/2;) {
		for (let j = T.primes.length; j-- && T.primes[i]*T.primes[j] <= N && j>i;) {
			total += M(T.primes[i],T.primes[j],N)
		}
	}
	return total
}
// 2^6 * 3
// 2^5 * 3
// console.log(M(2,3,100)) // 96 = 2^5*3
// console.log(M(2,73,100)) // 0
console.log(S(N)) // 2262