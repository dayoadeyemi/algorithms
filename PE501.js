"use strict";
require('./euler')
const N = 1e12;
const T = new NumberTheory(Math.floor(Math.sqrt(N)));

function f1(n){
	let i = T.primes.indexOf(Math.pow(n, 1/7))
	// console.log(i, T.primes[i])
	return T.primes.length - i
}

function f2(n){
	let p, q, cnt = 0, i = T.primes.indexOf(Math.pow(n, 1/3));
	let size = 1;
	for (q of generatorFn(n/8)){
		if (q > Math.pow(10, size)) {
			size++;
			console.log(size)
		}
		for (let j = T.primes.length; j-- && j >= i && Math.pow(T.primes[j], 3)*q < n;){
			p = T.primes[j]
			// console.log(p +'^3', q)
			if (p != q) {
				cnt++
				// console.log(p*p*p*q, p , q)
			}
		}
	}
	return cnt;
}

function f3(n){
	let p, q, r, pqs = [], cnt = 0;
	for (let i = T.primes.length; i-- &&  Math.pow(T.primes[i], 3) < n;) {
		p = T.primes[i];
		for (let j = i; j-- && Math.pow(T.primes[j], 2)*p < n;) {
			q = T.primes[j];
			pqs.push([p,q])
		}
	}
	console.log('done first part')
	let size = 1;

	for (r of generatorFn(n/6)){
		if (r > Math.pow(10, size)) {
			size++;
			console.log(size)
		}
		cnt += pqs
		.map(_ =>  r > _[1] && _[0] * _[1] * r < n)
		.map((_, i) => {
			if (_) console.log(pqs[i][0]*pqs[i][1]*r, pqs[i][0], pqs[i][1], r)
			return _;
		})
		.reduce(add, 0)
	}
	return cnt;
}

function* generatorFn (n) {
	let g = new primeGenerator(), p;
	while ((p = g.next()) < n){
		yield p;
	}
}

console.log(f3(N))