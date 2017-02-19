const R = require('ramda')
const T = require('./NumberTheory');
const N = 1e1;
const Tn = new T(N);

function S(n){
    let res = 0
    for(let i = 2; i <= n; i++) res+=s(i)
    return res
}

function s(n){
    let res = 1;
    for (let $ of max_powers(n)) {
        Math.max(res, s_for_prime_power($[0], $[1]))
    }
    return res;
}

function* max_powers(n){
    let p, $n =n, res = [];
    for (let i = Tn.primes.length -1; p = Tn.primes[i], i >= 0  && p * p <= n; i--){
        let e = 0;
        while ($n % p === 0) {
            e++;
            $n/=p;
        }
        if (e) yield [p, e]
    }
    if ($n !== 1) yield [$n, 1]
}

let $s = {}
function s_for_prime_power(p, e){
    if ($s[p+':'+e]) return $s[p+':'+e];
    let k = 0, _e = e;
    while (e > p) {
        k += p;
        e -= p + 1;
        for (let t = k; (t /= p) % p == 0;)--e;
    }
    return $s[p+':'+_e] = (k + Math.max(0, e)) * p;
}
console.log(S(N*N), $s)