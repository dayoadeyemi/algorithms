import { chain, range, of, concat, reduce, map, repeat, apply, equals, tap } from 'ramda'

const primes = [2,3,5,7]//,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97]

const toVector = n =>
    primes.map(p => {
        let e_p = 0
        while (n % p === 0) {
            n/=p
            e_p++
        }
        return e_p
    })

const vectorAdd = (v1: number[], v2: number[]) =>
    v1.map((v, i) => v+v2[i])

const step = headmax => tailval =>
    range(0, headmax + 1)
    .map(i => [
        concat([i], tailval[0]),
        concat([headmax-i], tailval[1])
    ])

function* values(input){
    if (input.length === 0) return yield [[],[]]
    else for (let tailval of values(input.slice(1))){
        yield* step(input[0])(tailval)
    }
}

const divisors =
    reduce((memo: number, _: number) => memo*(_+1), 1)

const fact_as_vector = n =>
    range(1, n+1)
    .map(toVector)
    .reduce(vectorAdd)

const C_of_vector = xs => {
    let ans = 0
    for (let val of values(xs)) {
        if (apply(equals, map(divisors, val))) ans++
    }
    return ans/2
}
const dd = (i: number, j: number, k: number, u: number) =>
    k === 0 ? i === 1 && j === 1 ? 1 : 0 :
    range(0, u+1)
    .reduce((m, d) => m + 
        (i%(d+1)===0 && j%(u - d + 1) === 0 ?
            dd(i/(d+1), j/(u - d + 1), k-1, u) : 0), 0)

const c = (i: number, j: number, k: number, v: number[]) => {

    const cache = [{ ['1,1']: 1 }]

    const _c = (i: number, j: number, k: number) =>
       ( i < j ? cache[k][i+','+j] : cache[k][i+','+j] ) ||
        range(0, v[k]+1)
        .reduce((m, d) => m + 
            (i%(d+1)===0 && j%(v[k] - d + 1) === 0 ?
                _c(i/(d+1), j/(v[k] - d + 1), k-1) : 0), 0)
    
    return v.length === k ? (i === 1 && j === 1 ? 1 : 0) :
    range(0, v[k]+1)
    .reduce((m, d) => m + 
        (i%(d+1)===0 && j%(v[k] - d + 1) === 0 ?
            c(i/(d+1), j/(v[k] - d + 1), k+1, v) : 0), 0)
}

class Cache extends Object {
    private _data = {}
    add(i,j,Cij){
        const pair = i+','+j
        this._data[pair] = (this._data[pair] || 0) + Cij
        return this
    }
    *[Symbol.iterator](){
        for (let $ in this._data){
            yield $.split(',').map(_ => parseInt(_)).concat(this._data[$])
        }
    }
    next(u: number){
        const _cache = new Cache()
        for (let [i, j, Cij] of this){
            for (let d = 0; d <= u; d++) {
                _cache.add(i*(d+1), j*(u-d+1), Cij)
            }
        }
        return _cache
    }
    diagWith(cache: Cache){
        let res = 0
        for (let [i, j, Cij] of this){
            for (let [_i, _j, _Cij] of cache){
                if (i*_i === j*_j) {
                    res += Cij*_Cij
                }
            }
        }
        return res/2
    }
}
function* it(cache){
    for (let $ in cache){
        yield $.split(',').map(_ => parseInt(_)).concat(cache[$])
    }
}

const rect = (v: number[]) => {
    let cache = new Cache().add(1, 1, 1)
    for (var k = 0; k < v.length; k++) {
        cache = cache.next(v[k])
    }
    return cache
}

console.log(rect([8, 4]).diagWith(rect([2, 1])))

// const C_of_vector2 = v =>
//     range(1, max).reduce((m, i) => m + c(i, i, 0, v), 0)/2

// const max = divisors([4, 4, 2, 1])

// for (let val of values([8, 4, 2, 1]))
//     if (apply(equals, map(divisors, val)))
//         console.log(val, map(divisors, val))

// console.log(C_of_vector2([8, 4, 2, 1]))

// const C_of_n_factorial = n => 
//     C_of_vector(fact_as_vector(n))

// for (let val of values(fact_as_vector(30))) console.log(map(divisors, val))