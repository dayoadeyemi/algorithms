"use strict";
require('./euler')
const N = 1e12

// const _phi = { 1:1 }
// const phi_inv = {}
// for (let i = 1; i <= N; i++) {
// 	if (_phi[i] != void 0) {
// 		if (phi_inv[_phi[i]] == void 0) phi_inv[_phi[i]] = i
// 		else phi_inv[_phi[i]]+=i
// 		continue
// 	}
// 	if (phi_inv[i-1] == void 0) phi_inv[i-1] = i
// 	else phi_inv[i-1]+=i
// 	let j = i
// 	while (j <= N) {
// 		if (_phi[j] == void 0) _phi[j] = j
// 		_phi[j] *= (i-1)/i
// 		j+=i
// 	}
// }

let solution = 0
const is_prime = n => {
	if (n<2) return false
	if (n<4) return true
	if (n%2==0) return false
	if (n%3==0) return false
	for (var i = 5; i<=Math.floor(Math.sqrt(n)); i+=6) {
		if (n%i==0) return false
		if (n%(i+2)==0) return false
	}
	return true
}

let ham_primes = []
let ham_nos = []
let X = []
for (let p2 = 1; p2 < N; p2*=2) {
	for (let p3 = 1; p2*p3 < N; p3*=3) {
		for (let p5 = 1; p2*p3*p5 < N ; p5*=5) {
			let n = p5*p3*p2
			ham_nos.push(n)
			if (is_prime(n+1) && n+1 > 5) ham_primes.push([n+1])
		}
	}
}

const p = n => {
	let l = []
	for (let q = n; q < N; q*=n ) l.push(q)
	return l;
}


// for (let p of ham_primes){
// 	for (let p5 = 1; p5 <= N/p ; p5*=5) {
// 		for (let p3 = 1; p5*p3 <= N/p; p3*=3) {
// 			for (let p2 = 1; p5*p3*p2 <= N/p; p2*=2) {
// 				solution += p5*p3*p2
// 			}
// 		}
// 	}
// }

solution = boundedProducts([p(2),p(3),p(5)].concat(ham_primes), N).reduce((a,b) => (a+b)%4294967296)


// let K = {}
// for (let i = 0; i <= Math.floor(Math.log(N)/Math.log(5)); i++) {
// 	let t5 = i == 0 ? 1 : Math.pow(5, i-1)*4
// 	let p5 = Math.pow(5, i)
// 	for (let j = 0; j <= Math.floor(Math.log(N/p5)/Math.log(3)); j++) {
// 		let t3 = j == 0 ? 1 : Math.pow(3, j-1)*2
// 		let p3 = Math.pow(3, j)
// 		for (let k = 0; k <= Math.floor(Math.log(N/p5/p3)/Math.log(2)); k++) {
// 			let t2 = k == 0 ? 1 : Math.pow(2, k-1)
// 			let p2 = Math.pow(2, k)
// 			let t = t5*t3*t2
// 			let n = p5*p3*p2
// 			if (K[t] == void 0) K[t] = {}
// 			K[t][n] = true
// 		}
// 	}
// }

// let J = {}
// for (let i = 0; i <= Math.floor(Math.log(N)/Math.log(5)); i++) {
// 	let p5 = Math.pow(5, i)
// 	for (let j = 0; j <= Math.floor(Math.log(N/p5)/Math.log(3)); j++) {
// 		let p3 = Math.pow(3, j)
// 		for (let k = 0; k <= Math.floor(Math.log(N/p5/p3)/Math.log(2)); k++) {
// 			let p2 = Math.pow(2, k)
// 			let n = p5*p3*p2
// 			if (k > 0 && is_prime(n+1) && n+1 > 5) {
// 				for (let _i = i; _i <= Math.floor(Math.log(N)/Math.log(5)); _i++) {
// 					let _p5 = Math.pow(5, _i)
// 					for (let _j = j; _j <= Math.floor(Math.log(N/_p5)/Math.log(3)); _j++) {
// 						let _p3 = Math.pow(3, _j)
// 						for (let _k = k; _k <= Math.floor(Math.log(N/_p5/_p3)/Math.log(2)); _k++) {
// 							let p2 = Math.pow(2, _k)
// 							let _n =  _p5*_p3*p2
// 							J[_n] = J[_n] || []
// 							J[_n].push(n+1)
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// }


// for (let i = 0; i <= Math.floor(Math.log(N)/Math.log(5)); i++) {
// 	let p5 = Math.pow(5, i)
// 	console.log(i)
// 	for (let j = 0; j <= Math.floor(Math.log(N/p5)/Math.log(3)); j++) {
// 		let p3 = Math.pow(3, j)
// 		console.log('~',j)
// 		for (let k = 0; k <= Math.floor(Math.log(N/p5/p3)/Math.log(2)); k++) {
// 			console.log('~~', k)
// 			let p2 = Math.pow(2, k)
// 			let n = p5*p3*p2
// 			K[n] = K[n] || {} 
// 			for (let p of (J[n] || [])) {
// 				for (let m in K[n/(p-1)]) {
// 					m = parseInt(m)
// 					if (m*p<N && m%p !== 0) {
// 						K[n][m*p] = true
// 					}
// 				}
// 			}
// 		}
// 	}
// }

// for (let i in K) {
// 	for (let m in K[i]) solution = (solution+parseInt(m))%4294967296
// };
// console.log(mapObjIndexed((s,i) => [sum(keys(s).map(n => parseInt(n))), phi_inv[i]], K))
// console.log(J[100])
// console.log(mapObj(x => keys(x),K))
console.log(solution)
