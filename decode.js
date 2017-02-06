const fs = require('fs')

const code = fs.readFileSync('./decode.txt','utf8')
		.split(/\s|\n/)
		.map($ => parseInt($)-11)
		.map($ => "abcdefghijklmnopqrstuvwxyhz"[$])

console.log(code)