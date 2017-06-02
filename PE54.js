'use strict';
const R = require('ramda');
const data = require('fs').readFileSync('./PE54.dat', 'utf8');
// const data =
// `5H 5C 6S 7S KD 2C 3S 8S 8D TD
// 5D 8C 9S JS AC 2C 5C 7D 8S QH
// 2D 9C AS AH AC 3D 6D 7D TD QD
// 4D 6S 9H QH QC 3D 6D 7H QD QS
// 2H 2D 4C 4D 4S 3C 3D 3S 9S 9D`

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
    const kinds = {1:[],2:[],3:[],4:[]}, k = 1;
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
        if (val[hand[i][0]] !== val[hand[i+1][0]] + 1) return false
    }
    return hand;
}

function flush(hand){
    for (let i = 0; i < hand.length-1; i++) {
        if (hand[i][1] !== hand[i+1][1]) return false
    }
    return hand;
}

function highestHand(hand){
    const _kinds = kinds(hand)
    const _straight = straight(hand)
    const _flush = flush(hand)
    return [
        _straight && _flush,
        _kinds[4][0],
        _kinds[3][0] && _kinds[2][0] && R.concat(_kinds[3][0], _kinds[2][0]),
        _flush,
        _straight,
        _kinds[3][0],
        _kinds[2][0] && _kinds[2][1] && R.concat(_kinds[2][0], _kinds[2][1]),
        _kinds[2][0],
        _kinds[1][0]
    ]
}

function high_card_winner(hand1, hand2){
    const [c1, c2] = R.zip(hand1, hand2)
    .find(([c1, c2], i) => c1[0] !== c2[0]) || []

    if (!c1 || !c2) return 0

    return get_val(c1) > get_val(c2) ? 1 : 2
}
function winner(hand1, hand2){
    const [h1, h2] = R.zip(highestHand(hand1), highestHand(hand2))
    .find(([h1, h2], i) =>  h1 || h2)
    
    if (!h1) return 2
    if (!h2) return 1
    
    return high_card_winner(h1, h2) || high_card_winner(hand1, hand2)
}
function parse_line(line){
    const hand1 = line.split(' ')
    const hand2 = hand1.splice(5, 10)
    return winner(sort(hand1),sort(hand2))
}

const acc = data
.split(/\r?\n/)
.map(parse_line)
.reduce((acc, val) => (acc[val]++, acc), {1:0,2:0})

console.log(acc[1])