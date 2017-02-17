"use strict";
const cache = {}
/**
 * No of Sums of the form N = m + ... with d digits
 * N = Sum to make
 * d = no of summands
 * m = leading summand
 */
const f = (N, d, m, ind) => {
    // console.log(ind, `f(${N},${d},${m})`);
    let s = 0;
    let key = [N,d,m].join();
    if (d === 1 || d === N) s = 1;
    else if (cache[key]) {
        // console.log(ind, '[cache hit!]')
        s = cache[key]
    }
    else {
        const minX = Math.ceil((N-m)/(d-1));
        const maxX = Math.min(m, (N-m)-d+2);
        // console.log(ind, minX, '<= x <=', maxX)
        for (let x =minX; x <= maxX; x++){
            s += f(N-m, d-1, x, ind+'  ')
        }
        cache[key] = s;
    }
    // console.log(ind, 'res', s)
    return s;
}

function sums(N){
    let _s = 0;
    for (let d=2; d<=N;d++) {
        for (let m=Math.ceil(N/d); m <= N-d+1; m++) {
            _s += f(N, d, m, '')
        }
    }
    return _s;
}

const ans = sums(100);

console.log(ans);