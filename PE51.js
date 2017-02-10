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
process.exit(1);
"use strict";
const primes = require('./primes.json');

function matchable(p, q){
    let x, y, d = 1, ret = '';
    while(p > q){
        let u = p%10, v = q%10, e = u;
        if (u !== v) {
            if (!Number.isInteger(x)) {
                x = u;
                y = v;
            } else if (x !== u || y !== v) {
                return false;
            }
            e = '*';
        }
        ret=e+ret;
        p = (p-u)/10;
        q = (q-v)/10;
        d*=10;
    }
    return p ? p+ret : ret;
}
let cache = {};
let max = 0;
for (let i = 0; primes[i]; i++){
    for (let j = 0; j < i; j++){
        const p = primes[i], q = primes[j];
        const m = matchable(p, q);
        if (m) {
            cache[m] = cache[m] ? cache[m] + 1 : 1;
            if (cache[m] > max) {
                console.log(m, cache[m]);
                max = cache[m];
                cache = {};
            }
            // if (cache[m] > significant_count) {
            //     significant_count+=diff++;
            //     console.log(m, 'n:', cache[m], significant_count);
            // }
        }
    }
}
