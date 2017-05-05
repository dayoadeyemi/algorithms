'use strict';
const R = require('ramda');
const val = {
    1:1, 2:2, 3:3,
    4:4, 5:5, 6:6,
    7:7, 8:8, 9:9,
    T:10, A:11, J:12,
    Q:13, K:14 }

function sort(hand){
    return R.sort((a,b) => val[a[0]] - val[b[0]], hand);
}
function of_a_kind(hand){
    let i=0, j=1, k=1, sets = null;
    function update(){
        if (j-i>k) sets = hand.slice(i,j);
    }
    while (j < hand.length) {
        if (hand[i][0] === hand[j][0]) {
            j=j+1;
        } else {
            update()
            i=j;
            j=j+1
        }
    }
    update()
    return sets;
}

function straight(hand){
    for (let i = 0; i < hand.length-1; i++) {
        if (val[hand[i][0]] + 1 !== val[hand[i+1][0]]) return [];
    }
    return [hand];
}

console.log(of_a_kind(sort('4S 3H 5H 2D 2S'.split(' '))))