'use strict';
const R = require('ramda');
// const data = require('fs').readFileSync('./PE54.dat', 'utf8');
const data =
`5H 5C 6S 7S KD 2C 3S 8S 8D TD
5D 8C 9S JS AC 2C 5C 7D 8S QH
2D 9C AS AH AC 3D 6D 7D TD QD
4D 6S 9H QH QC 3D 6D 7H QD QS
2H 2D 4C 4D 4S 3C 3D 3S 9S 9D`

const val = {
    1:1, 2:2, 3:3,
    4:4, 5:5, 6:6,
    7:7, 8:8, 9:9,
    T:10, J:11, Q:12,
    K:13, A:14 }
const get_val = card => val[card[0]]

Array.prototype.flatMap = function flatMap(fn){
    return R.chain(fn, this)
}

function sort(hand){
    return R.sort((a,b) => val[b[0]] - val[a[0]], hand);
}
function kinds(hand){
    const kinds = [[],[],[],[],[]], k = 1;
    for (let i=0, j=1; j <= hand.length; j=j+1) {
        if (j === hand.length || hand[i][0] !== hand[j][0]) {
            kinds[j-i].push(hand.slice(i,j))
            i=j;
        }
    }
    return kinds;
}

function straight(hand){
    for (let i = 0; i < hand.length-1; i++) {
        if (val[hand[i][0]] + 1 !== val[hand[i+1][0]]) return false
    }
    return true;
}

function flush(hand){
    for (let i = 0; i < hand.length-1; i++) {
        if (val[hand[i][1]] !== val[hand[i+1][1]]) return false
    }
    return true;
}

function is_of_a_kind(n){
    return hand => kinds(hand)[n]
}

function highestHand(hand){
    const _kinds = kinds(hand)
    const _straight = straight(hand)
    const _flush = flush(hand)
    return [
        (_straight && _flush),
        _kinds[4][0],
        _kinds[3][0] && _kinds[2][0],
        _flush,
        _straight,
        _kinds[3][0],
        _kinds[2][0] && _kinds[2][1],
        _kinds[2][0],
        _kinds[1][0]
    ]
}

function* zip(g1, g2) {
    while(!g1.done && !g2.done){
        yield [g1.next().value, g2.next().value]
    }
}

function winner(hand1, hand2){
    const [h1, h2] = R.zip(highestHand(hand1), highestHand(hand2))
    .find(([h1, h2], i) => console.log(i, h1, h2) || h1 || h2)
    console.log('---------', h1, h2)

    if (!h1) return 2
    if (!h2) return 1
    
    const [c1, c2] = R.zip(hand1, hand2)
    .find(([c1, c2]) => get_val(c1) === get_val(c2)) || []

    return c1 > c2 ? 1 : 2
}
function parse_line(line){
    const hand1 = line.split(' ')
    const hand2 = hand1.splice(5, 10)
    return winner(hand1,hand2)
}

const acc = data.split(/\n/g).map(parse_line) //.reduce((acc, val) => (acc[val]=(acc[val]||0) + 1, acc), {})
console.log(acc)
