const Heap = require('heap')
const T = require('./NumberTheory')

class Layers {
    /**
     * @param {number} level
     */
    constructor(n){
        this.sorted = new Heap((a,b) => a.cost - b.cost)
        this.add()
        this.count = 0
        this.ans = 1
        this.n = n
        this.primes = []
        const gen = new T.SoEPgClass()
        while (this.primes.length <= n) this.primes.push(gen.next())
    }
    add(){
        let cost = 2
        for (let i = 0; i < this.sorted.size(); i++) cost = cost*cost
        this.sorted.push({
            prime_index: 0,
            level: this.sorted.size(),
            cost: cost
        })
    }
    iterate(){
        this.count++
        const layer = this.sorted.pop()
        this.ans = (this.ans*layer.cost)%500500507
        layer.cost = this.primes[++layer.prime_index]
        for (let i = 0; i < layer.level; i++) layer.cost = layer.cost*layer.cost
        this.sorted.push(layer)
        if (layer.prime_index === 1) this.add()
    }
    solve(){
        while (this.count < this.n) this.iterate();
        delete this.primes
        return this.ans
    }
}

console.log(new Layers(500500).solve())