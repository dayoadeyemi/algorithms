const T = require('./NumberTheory')

// #{ reduced proper fractions a/b with b <= N}
// = { (a,b): gcd(a,b) = 1  and  1 <= a < b <= n}
// = 1/2 * #( { (a,b): gcd(a,b) = 1  and  1 <=  a,b  <= n} - {(1,1)} )
// = 1/2 * (c(N)-1)
console.log((T.c(1e6)-1)/2)