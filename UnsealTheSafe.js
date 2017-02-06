var edges = [[7],[2,4],[1,3,5],[2,6],[1,5,7],[2,4,6,8],[3,5,9],[4,8,0],[5,7,9],[6,8]]
var R = require('ramda')

var f = n => {
	var _ = R.repeat(1,10);
	console.log(_)
	for (var i = 1; i < n; i++) {
		_ = edges
		.map(R.map(j => _[j]))
		.map(R.sum)
	};
	return _
}

var g = _ => R.sum(f(_))
console.log(R.range(0,30).map(g))