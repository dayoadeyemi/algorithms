"use strict";
const N = 10000000
let count = 0

for (var n = 2*N/10+N/100; n>=2*N/10;n-=1) {
	if (n%10==0) continue
	if (n%100!=9) continue //
	let m = n + parseInt(n.toString().split('').reverse().join(''))
	if (m.toString().split('').map(d => parseInt(d)%2==1).reduce((x,y)=>x&&y)){
		console.log(n)
		count++
	}
}

console.log(count)

// const solve_inner = (digits, carry) => {
// 	if (digits == 0) return 1 - carry
// 	if (digits == 1) return carry ? 5 : 1
// 	if (digits == 2) return carry ? 0 : 30
// 	return solve(digits-2, 1)*30
// }

// console.log(solve(4, 0))

// for (let a = 0; a<10; a++){
// 	for (let b =0; b<10; b++){
// 			if (a+b>=10 && (a+b)%2==0) {
// 				console.log(a +b*100, a+b +(a+b)*100+101)
// 				count++
// 			}
// 	}
// }
// console.log(count)