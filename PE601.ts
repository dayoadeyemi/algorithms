// PE601.ts
import { gcd } from './NumberTheory.js'
import { range } from 'ramda'
import * as bignum from 'bignum'

const lcm_first_s = s => range(1, s+1).reduce((lcm, val) => lcm * val / gcd(lcm, val))

const Q = (s, N) => Math.floor((N-1)/lcm_first_s(s))

const P = (s, N) => Q(s, N) - Q(s+1, N)

const R = i => {
    const N_2 = bignum.pow(4, i).sub(2)
    return N_2.div(lcm_first_s(i)).sub(N_2.div(lcm_first_s(i+1)))
}
console.log(range(1, 32).reduce((total, i) => total.add(R(i)), new bignum(0)))