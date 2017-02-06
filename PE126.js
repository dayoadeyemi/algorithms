"use strict";
const f = (n,a,b,c) => 2*(a*b+b*c+a*c)+4*(n-1)*(a+b+c) + 4*(n-1)*(n-2)
const N = 1000

const C = n => {
	let count = 0
	for(let m = 1; f(m,1,1,1) <= n; m++){
		for(let a = 1; f(m,a,1,1)<=n; a++) {
			for(let b = a; f(m,a,b,1)<=n; b++) {
				for(let c = b; f(m,a,b,c)<=n; c++) {
					if (f(m,a,b,c)==n) count++
				}
			}
		}
	}
	return count
}

let solution = 2
while (C(solution) != 1000) solution+=2, console.log(solution, C(solution))
console.log(solution)