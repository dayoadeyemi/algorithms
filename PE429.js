const N = 1e8
const Q = 1000000009
const T = require('./NumberTheory')
const gen = new T.SoEPgClass()
let ans = 1
for (let i; (i = gen.next()) <= N;) {
    let $ = mulmod(i,i,Q)
    for (let j = 2*i; j <= N; j += i) {
        let ii = i
        while (j%(ii*i)===0) ii*=i
        $=mulmod(mulmod($,ii,Q),ii,Q)
    }
    ans=mulmod(ans,(1+$),Q)
}

function mulmod(a, b, mod){
    if (b === 0) return 0
    return (mulmod(a, (b-b%2)/2, mod)*2 + a*(b%2))%mod
}

console.log(ans)