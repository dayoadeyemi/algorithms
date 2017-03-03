const N = 1e7

const phi = new Uint32Array(N+1);
for (let i = 1; i <= N; i++) phi[i] = i;
phi[0] = 0

for (let i = 2; i <= N; i++) {
    if (phi[i] !== i) continue;
    for (let j = i; j <= N; j += i) phi[j] = phi[j] / i * (i - 1);
}

const T = require('./NumberTheory')
const M = new Array(N)
for (let i = 2; i <= N; i++) M[i] = [1]

for (let i = 2; i <= N; i++) {
    if (M[i].length === 1) {
        for (let j = 2*i; j <= N; j += i) {
            let ii = i
            while (j%(ii*i)===0) ii*=i
            M[j] = M[j].concat(M[j].map($ => $*ii))
        }
    }
    let $max = 1
    for(let j = 1; j < M[i].length-1; j++){
        let k = M[i][j]
        $max = Math.max($max, i/k * T.exp(i/k, phi[k]-1, k))
    }
    M[i] = $max
}

let ans = 0
for (let i = 2; i <= N; i++) ans+=M[i]
console.log(ans)