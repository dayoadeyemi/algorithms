
const e = require('./PE60-edges.json');
// const T = require('./NumberTheory')
// const Tn = new T(1e4)
// const primes = Tn.primes
// console.log('generated primes')

// for (let p, i = primes.length; p = primes[--i];){
//     e[p] = {}
//     for (let q, pq, qp, j = i; q = primes[++j];){
//         if (Tn.is_prime(parseInt(p+''+q)) && Tn.is_prime(parseInt(q+''+p))){
//             e[p][q] = e[q][p] = true
//         }
//     }
// }
// console.log('generated edges')
// require('fs').writeFileSync('PE60-edges.json',JSON.stringify(e),'utf8');
console.log(solve(5))

function solve(N){
    let res = Infinity
    for (let c of build_cliques(5)){
        res = Math.min(c.items.map(n => parseInt(n)).reduce((a,b) => a+b))
    }
    return res;
}

function* build_cliques(k) {
    if (k === 1){
        for (let p in e){
            yield { items: [p], neighbourhood: e[p] }
        }
        return
    }
    for (let us of build_cliques(k-1)) {
        for (let v in us.neighbourhood) {
            yield { items: [v].concat(us.items), neighbourhood: intersect(e[v], us.neighbourhood) }
        }
    }
}

function intersect(s, S){
    const res = {}
    for (let x in s) if (S[x]) res[x] = true
    return res
}
// const gen = new T.SoEPgClass(); gen.next()//ignore 2

// for(let p = gen.next(); p < 1000; p = gen.next()){
//     const string_p = p.toString();
//     e[string_p] = {};
//     for (let i = 1; i < string_p.length; i++){
//         const s1 = string_p.substring(0, i)
//         const s2 = string_p.substring(i)
//         if (e[s1] && e[s2]) {
//             e[s1][s2] = e[s2][s1] = e[s2][s1] === 0 ? 1 : 0  
//         }
//     }
// }

// for(let p1 in e){
//     const arr = [];
//     for (let p2 in e[p1]) if (e[p1][p2]) arr.push(parseInt(p2))
//     e[p1] = arr.sort((a,b) => a-b)
//     // console.log(e[p1])
// }
// console.log('sorted neighbour lists')
// for (let p of intersect_sorted(e['3'], intersect_sorted(e['673'], e['109']))){
//     console.log(p)
// }
// function solve(N){
//     let ans = Infinity
//     for(let _p1 in e){
//         const p1 = parseInt(_p1)
//         if (p1 > ans) break
//         if (e[p1].length < N) continue;
//         const s1 = e[p1]
//         for (let p2 of s1) {
//             if (p2 > ans) break
//             if (p1 === p2 || e[p2].length < N) continue;
//             const s12 = intersect_sorted(e[p1], e[p2])
//             for (let p3 of s12) {
//                 if (p3 > ans) break
//                 if (p3 === p1 || p3 === p2 || e[p3].length < N) continue;
//                 const s123 = intersect_sorted(s12, e[p3])
//                 for (let p4 of s12) {
//                     if (p4 > ans) break
//                     if (p4 === p1 || p4 === p2 || p4 === p4 || e[p4].length < N) continue;
//                     const s1234 = intersect_sorted(s123, e[p4])
//                     for (let p5 of s123) {
//                         if (p5 > ans) break
//                         if (p5 === p1 || p5 === p2 || p5 === p3 || p5 === p4 || e[p4].length < N) continue;
//                         if (p1+p2+p3+p4+p5 <= ans) {
//                             ans = p1+p2+p3+p4+p5
//                             console.log(ans, p1,p2,p3,p4,p5)
//                         }
//                         // const it = [e[p1],e[p2],e[p3],e[p4]].reduce(intersect_sorted);
//                         // for(let x in it){
//                         //     conosole.log(x)
//                         // }
//                     }
//                 }
//             }
//         }
//     }
// }
// function is_subset(s, S){
//     const res = {}
//     for(let u of s) if (S[u]) return res[u] = true
//     return res
// }
// function* intersect_sorted(_s, _t) {
//     const s = _s[Symbol.iterator](), t = _t[Symbol.iterator]()
//     let i = s.next(), j = t.next()
//     while (!i.done && !j.done) {
//         if (i.value < j.value) i = s.next()
//         else if (i.value > j.value) j = t.next()
//         else {
//             yield i.value
//             i = s.next()
//             j = t.next()
//         }
//     }
// }
// for(let p of intersect_sorted([1,2,3,4], intersect_sorted([1,2,3,4,5], [2,4,5,6,7,8]))){
//     console.log(p)
// }