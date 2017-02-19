// https://oeis.org/A007676/b007676.txt
const solution = '6963524437876961749120273824619538346438023188214475670667'
    .split('')
    .map(x => parseInt(x))
    .reduce((a,b)=>a+b)
console.log(solution)