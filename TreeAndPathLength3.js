var R = require('ramda')

var g = n => n * (n-1) * (n-2) * (n-3) / 4

var f = N => {
	var graph = [];
	var n = 15;
	while (N > 0, g(n) > 0){
		if (N > g(n)) {
			N -= g(n);
			graph.push(n);
		}
		else n--;
	}
	graph.push(N)
	return graph;
}

console.log(R.map(R.sum, R.map(f, R.range(1,10000))))