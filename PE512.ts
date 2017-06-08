import { phi_array } from './NumberTheory'
import { range, map, sum, add } from 'ramda'
import * as Long from 'long'

const g = N => {
    const phi = phi_array(N+1)
    let ans = Long.fromInt(0);
    for (var n = 1; n < N; n+=2) {
        ans = ans.add(phi[n])
    }
    return ans.toString()
}

console.log(g(5*10**8))