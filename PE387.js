"use strict"
const T = require('./NumberTheory')
const Tn = new T(1e7)

function* _harshad(n){
    if (n === 1) for (let i = 1; i<10;i++) yield [i, i]
    else for (let h of _harshad(n-1)) for (let i = 0; i<10;i++) if ((h[0]*10+i)%(h[1]+i) === 0) yield [h[0]*10+i, h[1]+i]
}
function* harshad(n){
    for (let i = 1; i<=n;i++) yield* _harshad(i)
}
function* strong_harshad(n){
    for (let h of harshad(n)) if (is_prime(h[0]/h[1])) yield h
}
function* harshad_primes(n){
    for (let h of strong_harshad(n-1)) for (let i of [1,3,7,9]) if (is_prime(h[0]*10+i)) yield h[0]*10+i
}

const _is_prime = Tn._is_prime
const primes = Tn.primes.reverse()
const is_prime = p => {
    if (p < 1e7) return _is_prime[p]
    for (let q of primes){
        if (q*q > p) break
        else if (p%q===0) return false
    }
    if (p < 1e14) return true
    else throw new Error('undecidable')
}

let res = 0
for (let h of harshad_primes(14)) {
    res+=h
}
console.log(res)