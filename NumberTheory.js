"use strict";
var R = require('ramda')
class NumberTheory{
	constructor(n){
		this._n = n;
		this._is_prime = new Uint32Array(n)
		for (let i = 2; i <  n; i++) this._is_prime[i] = 1
		for (let i = 2; i <  n; i++) {
			if (!this._is_prime[i]) continue
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
	// # pairs a, b st 1 <= a,b <= N and gcd(a,b) = 1
	static c(N){
		let sqrt_N = ~~(Math.sqrt(N)), indexes = R.range(1, 1+sqrt_N)
		for (let k = sqrt_N; k > 0; k--){
			const N_over_k = ~~(N/k)
			if (indexes[indexes.length-1] !== N_over_k) {
				indexes.push(N_over_k)
			}
		}
		const res = {}
		for (let n of indexes){
			let tmp = n*n
			if (1 < n) {
				const sqrt_n = ~~Math.sqrt(n)
				for (let l = 1; l < sqrt_n+1; l++) {
					tmp -= res[l] * (~~(n / l) - ~~(n/(l+1)))
				}
				for (let d = 2; d < 1 + ~~(n/(1 + sqrt_n)); d++){
					tmp -= res[~~(n / d)]
				}
			}
			res[n] = tmp
		}
		return res[N]
	}
	phi(n, i) {
		this._phi = this._phi || { 1: 1 }
		i = i || (this.primes.length - 1)
		if (this._phi[n]) return this._phi[n]
		for (let p; p = this.primes[i]; i--){
			let pp = 1, k = 0;
			while(n%(pp*p)===0) pp*=p
			if (pp !== 1) {
				return this._phi[n] = (pp-pp/p)*this.phi(n/pp, i)
			}
		}
		throw new Error(`${n},${i}`)
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
	static *farey_function(n, descending){
		let a=0, b=1, c=1, d=n
		let out = [];
		if (descending) {
			a=1
			c=n-1
		}
		yield [a,b]
		while ((c<=n&&!descending)||(a>0&&descending)){
			let k = ~~((n+b)/d), p=a, q=b
			a=c
			b=d
			c=k*c-p
			d=k*d-q
			yield [a,b]
		}
	}
	static exp(x, i, n){
		if (i === 0) return 1
		if (i === 1) return n?x%n:x
		const $ = exp(x, (i-i%2)/2, n);
		const y = ($*$*(i%2?x:1))
		return n?y%n:y
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