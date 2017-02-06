"use strict";
var R = require('ramda')
class NumberTheory{
	constructor(n){
		this._is_prime = [false, false].concat(R.repeat(true, n-2))
		this._divisors = { 1 : [1] }
		var i = 1,j
		while (i < Math.sqrt(n)) {
			i++
			if (!this._is_prime[i]) continue
			j = i*i
			while (j < n) {
				this._is_prime[j] = false;
				j+=i
			}
		}

		this.primes = SortedArray ? new SortedArray((a, b) => a > b) : []
		for (var k = this._is_prime.length; k--;) {
			if (this._is_prime[k]) this.primes.push(k)
		}
	}
	is_prime(p) {
		return this._is_prime[p]
	}
	divisors(n) {
		i = i || (this.primes.length - 1)
		if (_divisors[n]) {
			return _divisors[n]
		}
		if (primes.test(n)) {
			_divisors[n] = [n, 1]
			return _divisors[n]
		}
		while (this.primes[i]*this.primes[i] <= n) {
			var p = this.primes[i]
			if (n % p === 0) {
				_divisors[n] = R.chain(d => [d*p, d], divisors(n/p, i))
				return _divisors[n]
			}
			else i--
		}
		return [n, 1]
	}
	static gcd(a, b) {
		if (a < 0) return NumberTheory.gcd(-a, b)
		if (b < 0) return NumberTheory.gcd(a, -b)
		if (a < b) return NumberTheory.gcd(b, a)
		if (!b) return a
		return NumberTheory.gcd(b, a % b)
	}
	static prime_test(n){
		const lucasLehmerTest = require('lucas-lehmer-test');
		return lucasLehmerTest(n);
	}
}

module.exports = NumberTheory