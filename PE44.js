"use strict";
var R = require('ramda')
var P = n => n*(3*n-1)/2
var Q = x => Math.sqrt(2*x/3+1/36)+1/6
var is_pent = n => Q(n) % 1 === 0

// fast 
// let i = 2
// let done = false
// while (!done){
// 	let j = i-1
// 	while (j>0){
// 		if (is_pent(P(i)+P(j)) && is_pent(P(i)-P(j))) {
// 			done = true;
// 			console.log(Q(P(i)-P(j)), j, i)
// 		}
// 		j--
// 	}
// 	i++
// }

// slow
let i = 1
let done = false
while (!done){
	console.log(i)
	let k = i + 1
	while (!done && P(k) - P(k-1) < P(i)){
		let j = Q(P(k)-P(i))
		if (j % 1 === 0 && Q(P(j)+P(k)) % 1 === 0) {
			console.log(P(i))
			done = true;
		}
		k++
	}
	i++
}