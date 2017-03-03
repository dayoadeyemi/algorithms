const Matrix = require('matrixmath/Matrix')

const origin = new Matrix(3,1).setData(0,0,1)
const ans = require('fs')
.readFileSync('./p102_triangles.txt', 'utf8')
.split('\n').map($ => $.split(',').map($ => parseInt($)))
.map($ => (new Matrix(3,3)).setData(
    $[0],$[2],$[4],
    $[1],$[3],$[5],
    1,1,1
).invert())
.map($ => Matrix.multiply($, origin).getData())
.map($ => $[0] > 0 && $[1] > 0 && $[2] > 0 ? 1 : 0)
.reduce((a,b) => a+b)

console.log(ans)