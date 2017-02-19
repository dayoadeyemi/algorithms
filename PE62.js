function solve(PERM_COUNT) {
    for(let scale = 10000000, i = 215, group_size = {};;i++) {
        const cube = i*i*i
        if (cube > scale) scale*=10, group_size = {}
        const group = cube.toString().split('').sort().join('')
        if (group_size[group]) group_size[group][0] = group_size[group][0]+1
        else group_size[group] = [1, cube]
        if (group_size[group][0] === PERM_COUNT) return group_size[group][1]
    }
}
console.log(solve(5))