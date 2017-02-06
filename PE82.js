"use strict";
const fs = require('fs')
for (var r in require('ramda')){ GLOBAL[r] = require('ramda')[r]}
let mat = fs.readFileSync('./PE81.dat', 'utf8')
	.split('\n')
	.map(line => line.split(',')
		.map(x => parseInt(x)))
mat.pop()
// let mat = [
// 	[131,673,234,103,18],
// 	[201,96,342,965,150],
// 	[630,803,746,442,111],
// 	[537,699,497,121,956],
// 	[805,732,524,37,331]
// ]
const n = mat.length
let _mat_ = times(() => times(() => ({top:Infinity, bot:Infinity, right: Infinity}),n),n)
function mat_min(mat, i, j, from){
	if (_mat_[i][j][from] < Infinity) return _mat_[i][j][from]
	if (from === 'right') {
		_mat_[i][j]['right'] = min(mat_min(mat, i, j, 'top'), mat_min(mat, i, j, 'bot'))
	return _mat_[i][j]['right']
	}
	var oldmin;
	if (j == 0) {
		oldmin = {
			valueOf(){ return 0 },
			path: []
		}
	} else {
		oldmin = mat_min(mat, i, j-1, 'right')
		if (i > 0 && from != 'top') oldmin = min(
			oldmin,
			mat_min(mat, i-1, j, 'bot')
		)
		if (i < n-1 && from != 'bot') oldmin = min(
			oldmin,
			mat_min(mat, i+1, j, 'top')
		)
	}
	// console.log(oldmin)
	_mat_[i][j][from] = {
		valueOf(){ return oldmin + mat[i][j] },
		path: oldmin.path.concat([[i,j]])
	}
	return _mat_[i][j][from]
}


let solution = Infinity
for (var i = n-1; i >= 0; i--) {
	solution = min(solution, mat_min(mat, i, n-1, 'right'))
};

console.log(solution)

// mat_min(mat, n-1, n-1, 'right')
// console.log(_mat_.map(row=>row.map(vals=> vals.right.valueOf())))