"use strict";
for (var r in require('ramda')){ GLOBAL[r] = require('ramda')[r]}
const N = 1000000000000
const nums = {}
const BigInt = require('./BigInt')

let solution = BigInt.from(1)
for (let b = 2; b*b+b+1<N; b++){
	for (let n = b*b+b+1; n<N; n=b*n+1){
		if (!nums[n]) {
			nums[n] = true
			solution=solution.plus(BigInt.from(n))
		}
	}
}

console.log(solution)