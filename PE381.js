const T = require('./NumberTheory');
const ip = T.inverse_mod_p;

function S(p){
    return (-3*ip(p,8)%p+p)%p
}

function solve(n){
    const gen = new T.SoEPgClass()
    gen.next()//2
    gen.next()//3
    let res = 0
    for (let p = gen.next(); p < n; p = gen.next()) res+= S(p)
    return res
}
console.log(solve(1e8))