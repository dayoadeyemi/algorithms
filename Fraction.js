"use strict";
const NT = require('./NumberTheory')
const BI = require('./BigInt')
class Fraction {
	constructor(num, den){
		const cd = NT.gcd(num, den)
		this.num = num/cd
		this.den = den/cd
	}
	plus(that){
		const num = this.num*that.den+this.den*that.num
		const den = this.den*that.den
		return new Fraction(num, den)
	}
	times(that){
		const num = this.num*that.num
		const den = this.den*that.den
		return new Fraction(num, den)
	}
	dividedBy(that){
		const num = this.num*that.den
		const den = this.den*that.num
		return new Fraction(num, den)
	}
	toString(){
		return this.num + "/" + this.den
	}
	valueOf(){
		return this.num / this.den
	}
}
module.exports = Fraction