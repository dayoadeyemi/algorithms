var R = require('ramda')
var hl = require('highland')
var NumberTheory = require('./NumberTheory')
var n = 1000

var T = new NumberTheory(n)
console.log('got primes')
var ans = 0

// var is_sq_free = [false, true].concat(R.repeat(true, n-2))
// for (var i in primes.list) {
// 	var p = primes.list[i]
// 	var m = p*p
// 	while (m < n) {
// 		is_sq_free[m] = false
// 		m += p*p
// 	}
// }
// console.log('got is squarefree fn')

// for (var x = n; x--;) {
// 	if (is_sq_free[x] && primes.test(x+1)) {
// 		if (!divisors(x)
// 		.filter(y => y*y<=x)
// 		.map(y => y+x/y)
// 		.find(s => !primes.test(s))){
// 			ans += x
// 		}
// 	}
// };

var is_solution = [false, true].concat(R.repeat(true, n-2))
for (var d = 2; d < n; d++) {
	for (var k = 1; k*d < n; k++) is_solution[k*d] = is_solution[k*d] && T.is_prime(k+d)
	if (is_solution[d])  ans += d
};
ans++

console.log(ans)