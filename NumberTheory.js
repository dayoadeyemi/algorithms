"use strict";
var R = require('ramda')
class NumberTheory{
	constructor(n){
		this._n = n;
		this._is_prime = Uint8Array(n)
		for (let i = 2; i <  n; i++) this._is_prime[i] = 1
		for (let i = 2; i <  n; i++) {
			if (!this._is_prime[i])
			for (let j = 2*i; j <  n; j+=i) {
				this._is_prime[j] = 0
			}
		}
		this._divisors = { 1 : [1] }

		this.primes = global.SortedArray ? new SortedArray((a, b) => a > b) : []
		for (var k = this._is_prime.length; k--;) {
			if (this._is_prime[k]) this.primes.push(k)
		}
	}
	is_prime(p) {
		if (p < this._n) return this._is_prime[p];
		else for (let q of this.primes) {
			if (p % q === 0) {
				return false
			}
		}
		if (p < this._n*this._n ) return true
		throw new Error('Cannot efficently decide primality') 
	}
	divisors(n, i) {
		i = i || (this.primes.length - 1)
		if (this._divisors[n]) {
			return this._divisors[n]
		}
		else if (this._is_prime[n]) {
			return this._divisors[n] = [n, 1]
		}
		var result = [1];
		while (this.primes[i]*this.primes[i] <= n) {
			var p = this.primes[i], ps = [1], pn = p;
			while (n % pn === 0) {
				ps.push(pn);
				pn *= p
			}
			if (ps.length > 1) {
				return this._divisors[n] = R.chain(d => ps.map(ppow => d*ppow), this.divisors(n/pn*p, i))
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
	static extended_gcd(a, b) {
		let flipped = false;
		if (a < b) {
			let $mem = a
			a = b
			b = $mem
			flipped = true
		}
		let m = [0,1,b], old_m = [1,0,a]
		while(m[2] !== 0){
			const q = ~~(old_m[2] / m[2])
			const $m = R.zip(m,old_m).map(xs => xs[1] - q*xs[0])
			old_m = m;
			m = $m;
		}
		return { gcd:old_m[2], quotients:flipped ? [old_m[1], old_m[0]] : [old_m[0], old_m[1]] }
	}
	static inverse_mod_p(p, n) {
		return NumberTheory.extended_gcd(p , n).quotients[1]
	}
	static prime_test(n){
		const lucasLehmerTest = require('lucas-lehmer-test');
		return lucasLehmerTest(n);
	}
	static *it_primes(n){
		const gen = new NumberTheory.SoEPgClass();
		while(true) yield gen.next();
	}
	static get SoEPgClass(){
		function SoEPgClass() {
			this.bi = -1; // constructor resets the enumeration to start...
		}
		SoEPgClass.prototype.next = function () {
			if (this.bi < 1) {
				if (this.bi < 0) {
					this.bi++;
					this.lowi = 0; // other initialization done here...
					this.bpa = [];
					return 2;
				} else { // bi must be zero:
					var nxt = 3 + 2 * this.lowi + 262144; //just beyond the current page
					this.buf = [];
					for (var i = 0; i < 2048; i++) this.buf.push(0); // faster initialization 16 KByte's:
					if (this.lowi <= 0) { // special culling for first page as no base primes yet:
						for (var i = 0, p = 3, sqr = 9; sqr < nxt; i++, p += 2, sqr = p * p)
						if ((this.buf[i >> 5] & (1 << (i & 31))) === 0)
							for (var j = (sqr - 3) >> 1; j < 131072; j += p)
								this.buf[j >> 5] |= 1 << (j & 31);
					} else { // other than the first "zeroth" page:
						if (!this.bpa.length) { // if this is the first page after the zero one:
							this.bps = new SoEPgClass(); // initialize separate base primes stream:
							this.bps.next(); // advance past the only even prime of 2
							this.bpa.push(this.bps.next()); // keep the next prime (3 in this case)
						}
						// get enough base primes for the page range...
						for (var p = this.bpa[this.bpa.length - 1], sqr = p * p; sqr < nxt;
							p = this.bps.next(), this.bpa.push(p), sqr = p * p);
						for (var i = 0; i < this.bpa.length; i++) { //for each base prime in the array
						var p = this.bpa[i];
						var s = (p * p - 3) >> 1; //compute the start index of the prime squared
						if (s >= this.lowi) // adjust start index based on page lower limit...
							s -= this.lowi;
						else { //for the case where this isn't the first prime squared instance
							var r = (this.lowi - s) % p;
							s = (r != 0) ? p - r : 0;
						}
						//inner tight composite culling loop for given prime number across page
						for (var j = s; j < 131072; j += p) this.buf[j >> 5] |= 1 << (j & 31);
						}
					}
				}
			}
			//find next marker still with prime status
			while (this.bi < 131072 && this.buf[this.bi >> 5] & (1 << (this.bi & 31))) this.bi++;
			if (this.bi < 131072) // within buffer: output computed prime
				return 3 + ((this.lowi + this.bi++) * 2);
			else { // beyond buffer range: advance buffer
				this.bi = 0;
				this.lowi += 131072;
				return this.next(); // and recursively loop just once to make a new page buffer
			}
		};
		return SoEPgClass
	}
}


module.exports = NumberTheory