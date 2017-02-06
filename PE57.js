"use strict";
const Fraction = require('./Fraction')
const F = (a,b) => new Fraction(a,b)

let sqrt2 = F(3,2)
const one = F(1,1)

let solution = 0
for (var i = 1; i < 1000; i++) {
	sqrt2 = one.plus(one.dividedBy(one.plus(sqrt2)))
	solution+=(sqrt2.num.toString().length > sqrt2.den.toString().length)
	if (sqrt2.num.toString().length > sqrt2.den.toString().length) console.log (""+sqrt2, sqrt2.num*sqrt2.num/sqrt2.den/sqrt2.den)
};

console.log(solution)