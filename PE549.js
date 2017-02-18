const R = require('ramda')
const T = require('./NumberTheory');
const N = 1e4;
const Tn = new T(N);

function S(n){
    let res = 0
    for(let i = 2; i <= n; i++) res+=s(i)
    return res
}

function s(n){
    return  Math.max.apply(this,max_powers(n).map($ => s_for_prime_power($[0], $[1])))
}

function max_powers(n){
    let p, $n =n, res = [];
    for (let i = Tn.primes.length -1; p = Tn.primes[i], i >= 0  && p * p <= n; i--){
        let e = 0;
        while ($n % p === 0) {
            e++;
            $n/=p;
        }
        if (e) res.push([p, e]);
    }
    if ($n !== 1) res.push([$n, 1])
    return res;
}
function s_for_prime_power(p, e){
    k = 0;
    while (e > p) {
        k += p;
        e -= p + 1;
        for (let t = k; (t /= p) % p == 0;)--e;
    }
    return (k + Math.max(0, e)) * p;
}
console.log(S(N*N))