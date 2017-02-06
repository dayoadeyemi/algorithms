"use strict";
const hl = require('highland')
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
// 	[630,803,746,422,111],
// 	[537,699,497,121,956],
// 	[805,732,524,37,331]
// ]
const n = mat.length
const options = (i,j) => [[i+1, j], [i, j+1], [i-1, j], [i, j-1]]
const get_case = (i,j, visited) => options(i,j)
		.map(dest => !!visited[dest[0] + n*dest[1]])
		.reduce((memo, val) => memo*2+val)

let _mat_ = times(row => times(col => repeat(Infinity, 16),n),n)
function mat_min(mat, i, j, _visited, callback){
	let from = get_case(i,j,_visited)
	function end(ans){
		_mat_[i][j][from] = ans
		setTimeout(() => callback(null, _mat_[i][j][from]), 0)
		
	}
	if (_mat_[i][j][from] < Infinity) return end(_mat_[i][j][from])
	let visited = clone(_visited)
	visited[i+n*j] = true;
	let oldmin;
	if (i == 0 && j == 0) {
		return end({
			valueOf(){ return mat[0][0] },
			path: [0, 0, mat[0][0]]
		})
	} else {
		setTimeout(()=>{
			hl(options(i,j))
				.flatMap(hl.wrapCallback((dest, cb) => {
					if (!visited[dest[0] + n*dest[1]] &&
						dest[0] >= 0 && dest[0] < n &&
						dest[1] >= 0 && dest[1] < n) {
						return mat_min(mat, dest[0], dest[1], visited, cb)
					} else cb(null, {
						valueOf(){ return Infinity },
						path: [i,j, mat[i, j]]
					})
				}))
				.reduce1((x,y) => min(x, y))
				// .tap(console.log)
				.each(oldmin => end({
					valueOf(){ return oldmin + mat[i][j] },
					path: oldmin.path.concat([[i,j, mat[i, j]]])
				}))
		},0)
	}
}

mat_min(mat, n-1, n-1, {}, (err, val) => console.log(val))