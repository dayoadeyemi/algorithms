const choose = require('./Combinatorics').choose
const F = require('./Fraction')
const N = 33
const E = new Array(N)
E[0] = new F(0,1)

for (let n = 1; n < N; n++){
    E[n]=new F(Math.pow(2,n),Math.pow(2,n)-1)
    for(let k = 0; k < n; k++){
        E[n]=E[n].plus(E[k].times(new F(choose(n, k), Math.pow(2,n)-1)))
    }
}
console.log(E)
