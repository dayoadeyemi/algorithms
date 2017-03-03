const _choose = {}
function choose(n, r){
    if (n < r) return 0
    const key = n+','+r
    if (_choose[key]) return _choose[key]
    if (r === 0) return 1
    if (r > n/2) return choose(n, n-r)
    return _choose[key] = choose(n-1, r-1) + choose(n-1, r)
}
// E(X) 
// = E(X0+X1+...+X6) 
// = E(X0) + E(X1) + ... + E(X6)        by linearity of expectation
// = 7E(X0)                             by symmetry
// = 7 * probability that a particular color is present
// = 7 * (1- probability that a particular color is absent)
// = 7 * (1 - (# ways to pick 20 avoiding a color)/(# ways to pick 20))
// = 7 * (1 - (60 choose 20)/(70 choose 20))

console.log(7*(1-choose(60,20)/choose(70,20)))