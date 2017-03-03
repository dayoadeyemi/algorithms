function *generate_triples([x, y, z], n){
    if (x+y+z>n) return
    yield [x,y,z]
    yield* generate_triples([
        1*x-2*y+2*z,
        2*x-1*y+2*z,
        2*x-2*y+3*z
    ], n)
    yield* generate_triples([
        1*x+2*y+2*z,
        2*x+1*y+2*z,
        2*x+2*y+3*z
    ], n)
    yield* generate_triples([
        -1*x+2*y+2*z,
        -2*x+1*y+2*z,
        -2*x+2*y+3*z
    ], n)
}
const N = 1500000
const count = new Uint8Array(N+1)

for (let [x,y,z, ind] of generate_triples([3,4,5], N)){
    const L = x+y+z
    for (let i = L; i <= N; i+=L) count[i]++
}

let ans = 0
for (let c of count) if (c===1) ans++
console.log(ans)