"use strict";
require('./euler')
const N = 1e12
function s(k){
	let d = 1
	let out = 0;
	while (d*d<k){
		d++;
		if (k % (d*d) == 0) {
			let _k = k;
			let S = k
			while ((_k*=(d-1)/d)%1==0) {
				S+=_k
			}
			out = max(out, S)
		}
	}
	return out
}
let Ks = new SortedArray((a,b) => a[1] < b[1])

const insert = (K) => {
			ops++
			// console.log(K)
			// console.log('k', m*k, '| S', m*S, s(m*k))
			let x = Ks.indexOf(K)
			let y = x
			// console.log('above', Ks[x])
			if (Ks[x] && Ks[x][0] <= K[0]) return;
			while (Ks[y-1] && Ks[y-1][0] >= K[0]) {
				// console.log('below', Ks[x-1])
				y--
			}
			Ks.splice(x,0,K)
			Ks.splice(y,x-y)
			// console.log(Ks.slice(y,x))
}
let ops = 0;
for (let t = 2; Math.pow(2,t)<=N; t++){
	for (let n = 2; Math.pow(n,t)<=N; n++){
		let k = Math.pow(n,t)
		let S = Math.pow(n,t+1)-Math.pow(n-1,t+1)
		insert([k,S])
		// for (let m = 1; m*k <= N; m++) insert([m*k, m*S])
	}
}
console.log(ops)
// Ks.reduce((memo, K) => {
// 	let T = memo.T
// 	if((K[0] - memo.last[0])%2 != 0) {

// 	}
// 	return { T, last: K }
// }, {
// 	T:0,
// 	last: [0, 0]
// })
// console.log(s(108))
// range(1,1001).map(i=> console.log('best', i, s(i)))
const S = (n, d, k) => {
	let out = 0;
	for (let i = k+1; i--;) out += Math.pow(d-1, i)*Math.pow(d, k-i)
	return out
} 
// for (let LSF = 2; LSF <= Math.sqrt(N); LSF++){
// 	for (let m = 1; m < LSF=)
// 	let n2 = Math.pow(LSF,2);
// 	let n3 = Math.pow(LSF,3);
// 	Ks.insert([n2, S(n2, LSF, 2)])
// 	if (n3 <= N) Ks.insert([n3, S(n3, LSF, 3)])
// }
console.log(Ks.length)

let TT = Ks[Ks.length-1][1]*(1 - 2*(Ks[Ks.length-1][0]%2))
for (let j = Ks.length; --j;) {
	if ((Ks[j][0] - Ks[j-1][0])%2==1) {
		TT+= Ks[j-1][1]*(1 - 2*(Ks[j-1][0]%2))
	}
};

console.log(TT)