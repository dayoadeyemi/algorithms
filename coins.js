"use strict";
const coins = [20, 50]
const mem = { 0: true }
const N = 1000;

for (let n = 1; n <= N; n++) {
	if (coins.find(coin => mem[n-coin])) {
		console.log(n)
		mem[n] = true;
	}
}