"use strict";
var R = require('ramda')
class BigInt{
	constructor(l){
		this.num = l || []
	}
	static from(n, base){
		return new BigInt(n
			.toString()
			.split('')
			.map(d => parseInt(d, base))
			.reverse())
	}
	plus(that){
		let N = Math.max(this.num.length, that.num.length)
		let carry = 0
		let result = []
		for (let i = 0; i < N; i++) {
			let v = (this.num[i]||0) + (that.num[i]||0) + carry
			carry = Math.floor(v/10)
			result.push(v%10)
		}
		if (carry) result.push(carry) 
		return new BigInt(result)
	}
	times(that){
		let result = R.repeat(0, this.num.length+that.num.length)
		for (let i = 0; i < this.num.length; i++) {	
			for (let j = 0; j < that.num.length; j++) {
				result[i+j]+=this.num[i]*that.num[j]
			}
		}
		return new BigInt(result).plus(new BigInt([]))
	}
	valueOf(){
		return this.num.reverse().join('')
	}
}

module.exports = BigInt