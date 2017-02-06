var fs = require('fs')
var R = require('ramda')
var hl = require('highland')
var hungarian = require('hungarian-on3')
var data = fs.readFileSync('./PE345.dat', 'utf8')
// var data = fs.readFileSync('./PE345_0.dat', 'utf8')
var matrix = data.split('\r\n').map(l => l.split(' ').filter(x => x !== '').map(x => -parseInt(x)))

function max(mat, sub_choice){
	for (var i = 0; i < mat.length; i++) {
		mat[i]
	};
}

function sum(mat, choice){
	return R.sum(mat.map((row, i) => row[choice[i]]))
}

var solution = hungarian(matrix).map(x => x[1])


console.log(-sum(matrix, solution))