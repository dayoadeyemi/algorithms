var R = require('ramda')
var cp = (N, n) => R.range(1, n+1).map(x => x*N).join('')
var toArray = n => n.toString().split('')

testpan = str => {
	var checked = 0
	for (var i = 1; i <= str.length; i++) {
		checked += !!str.match('' + i)
	};
	return checked == 9
}

for (var i = 9999; i--;) {
	var candidate = cp(i, 2)
	if (testpan(candidate)) {
		console.log(candidate)
		break
	}
};

// console.log(check(9273, 2))
// console.log(cp(9, 5))