// 'use strict';
// require('./euler')
// const N = 10e3;
// const G = new primeGenerator();

// let p;
// let d = 10;
// let pset = []

// function has_potential(_m){
// 	let m = _m;
// 	let n = 0;
// 	while(m>9 && m%10===0) {
// 		m/=10;
// 		let n_ = m%10;
// 		m-=n_;
// 		if (n_ && !n) n = n_;
// 		else if (n_ && (n!==n_)) return false;
// 	}
// 	return n<2 && n;
// }

// //return console.log(has_potential(3030))

// function test(set) {
// 	for (var i = 0; i < set.length; i++) {
// 		const p = set[i];
// 		for (var j = i+1; j < set.length; j++) {
// 			const q = set[j];
// 			let r = has_potential(q-p);
// 			if (r) {
// 				console.log(r, q-p);
// 				let m = (q-p)/r;
// 			}
// 		}
// 	}
// }

// while ((p = G.next()) < 1100) {
// 	if (p > d) {
// 		d*=10;
// 		test(pset)
// 		pset = new SortedArray();
// 	}
// 	else {
// 		pset.push(p);
// 	}
// }
// process.exit(1);
"use strict";
require('./euler')

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
let PG = new primeGenerator();
const primes = [];
let is_prime = {};
let x;
while((x = PG.next()) < 10**5);
while((x = PG.next()) < 10**6); is_prime[x] = true;
PG = null;

function subsets(n){
	if (n === 0) {
		return [{}, {0:true}]
	} else {
		const ss = subsets(n-1);
		return ss.concat(ss.map(s => Object.assign({ [n]: true }, s)))
	}
}

const subsets6 = subsets(5);
for (let p in is_prime){
	const q = p.toString().join('')
	for (let c of subsets6) {
		for (let i = 0; i < 6; i++){

			let d;
			if (c[i]) continue;
			else if (d === undefined) d = q[i];
			else if (q[i] !== d) break;
		}
		let count = 0;
		for (let d = 0; d < 10; d++) count++;
	}
}

// for (let i = 0; primes[i]; i++){
//     for (let j = 0; j < i; j++){
//         const p = primes[i], q = primes[j];
//         const m = matchable(p, q);
//         if (m) {
//             cache[m] = cache[m] ? cache[m] + 1 : 1;
//             if (cache[m] > 15) {
//                 console.log(m, cache[m]);
//                 max = cache[m];
//                 cache = {};
//             }
//             // if (cache[m] > significant_count) {
//             //     significant_count+=diff++;
//             //     console.log(m, 'n:', cache[m], significant_count);
//             // }
//         }
//     }
// }
