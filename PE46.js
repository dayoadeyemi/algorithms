"use strict";
var N = 6000
var NumberTheory = require('./NumberTheory')
var T = new NumberTheory(N)

let i = 7
inner: while(i < N){
	i+=2
	if (T.is_prime(i)) continue
	let j = T.primes.length-1
	let solved = true
	while (T.primes[j] < i) {
		let k = Math.sqrt((i - T.primes[j])/2)
		if (k % 1 === 0) {
			// console.log(i +  '=' + T.primes[j] + ' + 2 *' + k + '^2')
			solved = false
			break
		}
		j--
	}
	if (solved) {
		console.log(i)
		break
	}
}