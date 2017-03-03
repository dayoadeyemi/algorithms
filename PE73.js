const T = require('./NumberTheory')

let ans = 0, d = 0
for (let pq of T.farey_function(12000)) {
    let p = pq[0], q = pq[1]
    if (p===1 && q===2) break
    ans+=d
    if (p===1 && q===3) d=1
}
console.log(ans)