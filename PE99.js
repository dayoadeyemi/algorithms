const file = require('fs').readFileSync('./p099_base_exp.txt','utf8')
.split(/\n/g)
.map(($, i) => $.split(',')
    .map($ => parseInt($))
    .concat([i+1]))
.sort((a,b) => Math.log2(b[0])*b[1]-Math.log2(a[0])*a[1])

console.log(file[0])