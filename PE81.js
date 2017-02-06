"use strict";
const fs = require('fs')
for (var r in require('ramda')){ GLOBAL[r] = require('ramda')[r]}
// let mat = fs.readFileSync('./PE81.dat', 'utf8')
// 	.split('\n')
// 	.map(line => line.split(',')
// 		.map(x => parseInt(x)))
// mat.pop()
let mat = [
	[131,673,234,103,18],
	[201,96,342,965,150],
	[630,803,746,442,111],
	[537,699,497,121,956],
	[805,732,524,37,331]
]
const n = mat.length
for (var row in mat) {
	for (var col in mat[row]) {
		let up = Infinity, left = Infinity
		if (row == 0 && col == 0) up = 0, left = 0
		if (row > 0) up = mat[row-1][col]
		if (col > 0) left = mat[row][col-1]
		mat[row][col] = min(up, left)+mat[row][col]
	};
};
console.log(mat[n-1][n-1])

// function mat_min(mat, i, j){
// 	var oldmin;
// 	if (i == 0) {
// 		if (j == 0) oldmin = 0
// 		else oldmin = mat_min(mat, 0, j-1)
// 	} else {
// 		if (j == 0) oldmin = mat_min(mat, i-1, 0)
// 		else oldmin = min(
// 			mat_min(mat, i-1, j),
// 			mat_min(mat, i, j-1)
// 		)
// 	}
// 	console.log(i,j,oldmin + mat[i][j])
// 	return oldmin + mat[i][j]
// }

// console.log(mat_min(mat, n-1, n-1))