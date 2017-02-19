const T = require('./NumberTheory');
const N = 1e6;
let n = 2, d = 5;

for (let $d = 8; $d <= N; $d++) {
    inner: for (let $n = Math.floor(3*$d/7); $n/$d > n/d ; $n--) {
        // console.log(`${$n}/${$d}`);
        if (T.gcd($d,$n) === 1) {
            // console.log('WIN!')
            n = $n;
            d = $d;
            break inner;
        }
    }
}

console.log(`solved: ${n}/${d}`);

