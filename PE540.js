"use strict";
require('./euler')
const N =  3141592653589793
// const T = new NumberTheory(Math.floor(Math.sqrt(N)))
// for (let p of T.primes) {
// 	let q = p-1
// 	for (let k = 1; q*k < Math.floor(Math.sqrt(N)); k++) {
// 			[i]
// 	};
// 	// while (q < Math.floor(Math.sqrt(N)){
// 	// 	// let k = 1
// 	// 	// while k = 1
// 	// 	phi[q]*=p
// 	// }
// }
// console.log(T.primes.length)n
let _ppt = {}
function ppt(N){
	if (_ppt[N] != void 0) return _ppt[N]
	let s = 0
	const maxm = Math.floor(Math.sqrt(2*N-1))
	for (let m = maxm+(maxm%2)-1 ; m>=3; m-=2){
		const maxn = min(Math.floor(Math.sqrt(2*N-m*m)), m-1)
		s += Math.ceil(maxn/2)
		// for (let n = maxn+(maxn%2)-1; n>=1; n-=2) {
		// 	// let a=(m*m-n*n)/2, b = m*n, c = (m*m+n*n)/2
		// 	if (gcd(m,n)===1) solution++
		// 	else ts[gcd(m,n)]++
		// }
	}
	for (let d = 3; d < Math.sqrt(N); d+=2) {
		let memo = ppt(Math.floor(N/(d*d)))
		if (memo == 0) break
		else s -= memo
	};
	_ppt[N] = s
	return s
}
console.log(ppt(N))
// let solution = 0
// let q = [[[1,1],[2,3]]]
// while(q.length){
// 	let m = q.pop()
// 	let x = m[0][1], y = m[1][1]
// 	// let a = 2*m[0][0]*m[1][0]
// 	// let b = m[0][1]*m[1][1]
// 	let c = m[1][0]*m[1][1]-m[0][0]*m[0][1]
// 	if (c<=N) {
// 		// if (c%100) console.log(c)
// 		solution++
// 		q.push([[y-x, x],[y, y+y-x]], [[x, y],[x+y,x+x+y]],[[y, x],[y+x,x+y+y]])
// 	}
// }
// console.log(solution)