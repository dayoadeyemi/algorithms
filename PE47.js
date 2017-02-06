"use strict";
var NumberTheory = require('./NumberTheory')
var R = require('ramda')
var N = 1000000
var num = 4

var T = new NumberTheory(N)

var _dpf = { 1 : {} }
function dpf(n, i) {
	i = i || (T.primes.length - 1)
	if (_dpf[n]) {
		return _dpf[n]
	}
	if (T.is_prime(n)) {
		_dpf[n] = { [n]: true }
		return _dpf[n]
	}
	while (T.primes[i]*T.primes[i] <= n) {
		let p = T.primes[i]
		if (n % p === 0) {
			let subv = dpf(n/p, i)
			_dpf[n] = R.assoc(p, true, dpf(n/p, i))
			return _dpf[n]
		}
		else i--
	}
	return { [n]: true }
}

for (var n = 5; n<N; n++){
	let found = true;
	for (var i = 0; i < num; i++) {
		if (R.keys(dpf(n-i)).length !== num){
			found = false
			break
		}
	};
	if (found) {
		console.log(n-num+1)
		break
	}
}