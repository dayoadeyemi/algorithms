"use strict";
for (var r in require('ramda')){ GLOBAL[r] = require('ramda')[r]}
GLOBAL.NumberTheory = require('./NumberTheory')
GLOBAL.gcd = NumberTheory.gcd
GLOBAL.boundedProducts = (lst, L) => {
    let prods = [1]
    for (let l of lst){
        let _new = []
        for (let k of l){
            for (let m of prods) {
                if (k*m <= L) {
                	_new.push(k*m)
                }
                else break
            }
        }
        prods = prods.concat(_new)
        prods.sort((a,b)=> a-b)
    }
    return prods
}
class SortedArray extends Array {
    constructor(before){
        super();
        this.before = before ? before : (a,b)=>a<b;
    }
    indexOf(x){
        if (this.length==0) return 0;
        let i = 0
        let j = this.length-1
        let k = this.length-1
        while (j - i > 1) {
            if (this.before(x, this[k])) j = k
            else i = k
            k = Math.floor((i+j)/2)
        }
        if (this.before(x, this[j])) return j;
        else return j+1
    }
    insert(x){
        this.splice(this.indexOf(x), 0, x)
    }
}
GLOBAL.SortedArray = SortedArray
GLOBAL.primeGenerator = (function () {
  function SoEPgClass() {
    this.bi = -1; // constructor resets the enumeration to start...
  }
  SoEPgClass.prototype.next = function () {
    if (this.bi < 1) {
      if (this.bi < 0) {
        this.bi++;
        this.lowi = 0; // other initialization done here...
        this.bpa = [];
        return 2;
      } else { // bi must be zero:
        var nxt = 3 + 2 * this.lowi + 262144; //just beyond the current page
        this.buf = [];
        for (var i = 0; i < 2048; i++) this.buf.push(0); // faster initialization 16 KByte's:
        if (this.lowi <= 0) { // special culling for first page as no base primes yet:
          for (var i = 0, p = 3, sqr = 9; sqr < nxt; i++, p += 2, sqr = p * p)
            if ((this.buf[i >> 5] & (1 << (i & 31))) === 0)
              for (var j = (sqr - 3) >> 1; j < 131072; j += p)
                this.buf[j >> 5] |= 1 << (j & 31);
        } else { // other than the first "zeroth" page:
          if (!this.bpa.length) { // if this is the first page after the zero one:
            this.bps = new SoEPgClass(); // initialize separate base primes stream:
            this.bps.next(); // advance past the only even prime of 2
            this.bpa.push(this.bps.next()); // keep the next prime (3 in this case)
          }
          // get enough base primes for the page range...
          for (var p = this.bpa[this.bpa.length - 1], sqr = p * p; sqr < nxt;
            p = this.bps.next(), this.bpa.push(p), sqr = p * p);
          for (var i = 0; i < this.bpa.length; i++) { //for each base prime in the array
            var p = this.bpa[i];
            var s = (p * p - 3) >> 1; //compute the start index of the prime squared
            if (s >= this.lowi) // adjust start index based on page lower limit...
              s -= this.lowi;
            else { //for the case where this isn't the first prime squared instance
              var r = (this.lowi - s) % p;
              s = (r != 0) ? p - r : 0;
            }
            //inner tight composite culling loop for given prime number across page
            for (var j = s; j < 131072; j += p) this.buf[j >> 5] |= 1 << (j & 31);
          }
        }
      }
    }
    //find next marker still with prime status
    while (this.bi < 131072 && this.buf[this.bi >> 5] & (1 << (this.bi & 31))) this.bi++;
    if (this.bi < 131072) // within buffer: output computed prime
      return 3 + ((this.lowi + this.bi++) * 2);
    else { // beyond buffer range: advance buffer
      this.bi = 0;
      this.lowi += 131072;
      return this.next(); // and recursively loop just once to make a new page buffer
    }
  };
  return SoEPgClass;
})();

module.exports = GLOBAL