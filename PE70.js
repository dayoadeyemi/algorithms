const N = 1e7
const phi = new Uint32Array(N);
for (let i = 1; i < N; i++) phi[i] = i;

for (let i = 2; i < N; i++) {
    if (phi[i] !== i) continue;
    for (let j = i; j < N; j += i) phi[j] = phi[j] / i * (i - 1);
}

const perm_class = x =>  x.toString().split('').sort().join('')

let ans = 87109
for (let n = N/10; n < N; n++){
    if (perm_class(n) === perm_class(phi[n]) &&
        n*phi[ans] < ans*phi[n]) ans = n
}

console.log(ans, phi[ans])