"use strict"; 
require('./euler')
const N = 201
let m = repeat(0, N)
let mm = [0].concat(times(i=> Math.floor(Math.log2(i+1)), N-1))
m[0] = 0, m[1] = 0
let p = repeat(null, N)
let q = [[1]]
while (q.length) {
	let set = q.shift()
	let parent = set[0]
	for (let i = set.length; i-- && parent+set[i]<N;){
		let n = set[i] + parent
		if (!m[n]) {
			// console.log('~~',n, set)
			m[n] = set.length
		}
		// else console.log('xx',n, set)
		if (set.length === m[n]) q.push([n].concat(set))
	}
}
// const f = n => {
// 	if (n < 2) return 0
// 	let l2n = Math.log2(n)
// 	if (l2n%1==0) return l2n
// 	return Math.floor(l2n)+f(n - Math.pow(2, Math.floor(l2n))) + 1
	
// }

// const F = n => {
// 	if (n == 0) return []
// 	if (n == 1) return []
// 	let l2n = Math.floor(Math.log2(n))
// 	let hp2 = Math.pow(2,l2n)
// 	let n_ = n - hp2
// 	console.log(n, init(F(n_)), [hp2], F(hp2/2))
// 	if (n == hp2) return times(i => Math.pow(2, l2n-i-1), l2n)
// 	return init(F(n_)).map(add(hp2)).concat([hp2], F(hp2))
	
// }
// let mmm = zip(m, mm).map(d => d[0]-d[1])

// let mmmm = repeat(null, N)
// mmmm[0] = [], mmmm[1] = []
// for (let n = 1; n<N;n++){
// 	if (mmmm[n]) continue
// 	let l2n = Math.floor(Math.log2(n))
// 	let hp2 = Math.pow(2,l2n)
// 	if (n == hp2) {
// 		mmmm[n] = times(i => Math.pow(2, l2n-i), l2n+1)
// 		for (let x of mmmm[n]) {
// 			console.log(n+x)
// 			if (x+n < N)mmmm[n+x] = [n+x].concat(mmmm[n])
// 		}
// 	}
// }
// let mmmm = times(n=> F(n), N)
console.log(m.reduce(add))
// console.log(mmmm)
// console.log(F(20))
// console.log(p[15])