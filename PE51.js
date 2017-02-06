'use strict';
require('./euler')
const N = 10e3;
const G = new primeGenerator();

let p;
let d = 10;
let pset = []

function has_potential(_m){
	let m = _m;
	let n = 0;
	while(m>9 && m%10===0) {
		m/=10;
		let n_ = m%10;
		m-=n_;
		if (n_ && !n) n = n_;
		else if (n_ && (n!==n_)) return false;
	}
	return n<2 && n;
}

//return console.log(has_potential(3030))

function test(set) {
	for (var i = 0; i < set.length; i++) {
		const p = set[i];
		for (var j = i+1; j < set.length; j++) {
			const q = set[j];
			let r = has_potential(q-p);
			if (r) {
				console.log(r, q-p);
				let m = (q-p)/r;
			}
		}
	}
}

while ((p = G.next()) < 1100) {
	if (p > d) {
		d*=10;
		test(pset)
		pset = new SortedArray();
	}
	else {
		pset.push(p);
	}
}