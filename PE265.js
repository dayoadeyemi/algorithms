var f = (n, xs) => {
	var fin = xs.length == Math.pow(2, n);
	var ys = fin ? xs + xs.slice(0, n-1) : xs
	for (var i = ys.length - n, mem = {}, slice; i >= 0; i--) {
		slice = ys.slice(i, i+n);
		if (mem[slice]) return 0;
		mem[slice] = true;
	};
	return fin ? parseInt(xs, 2) : f(n, xs + '0') + f(n, xs + '1');
}
console.log(f(5, '000001'))