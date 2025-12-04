(function () {
    const input = document.body.innerText;

    const deltas = [
        [-1,-1],[-1,0],[-1,1],
        [ 0,-1],       [ 0,1],
        [ 1,-1],[ 1,0],[ 1,1]
    ];
    
    function partOne() {
        const grid = input
            .split("\n")
            .filter(line => !!line)
            .map(line => [...line]);
        let accessibleCount = 0;
        for (let i = 0; i < grid.length; i += 1) {
            for (let j = 0; j < grid[0].length; j += 1) {
                if (grid[i][j] !== "@") {
                    continue;
                }
                let adjacentCount = 0;
                for (let [di,dj] of deltas) {
                    const ii = i + di;
                    const jj = j + dj;
                    if (ii < 0 || ii >= grid.length || jj < 0 || jj >= grid[0].length) {
                        continue;
                    }
                    if (grid[ii][jj] === "@") {
                        adjacentCount += 1;
                    }
                }
                if (adjacentCount < 4) {
                    accessibleCount += 1;
                }
            }
        }
        return accessibleCount;
    }

    function partTwo() {
        const grid = input
            .split("\n")
            .filter(line => !!line)
            .map(line => [...line]);
        let removedCount = 0;
        let removedAny = true;
        while (removedAny) {
            removedAny = false;
            let removables = [];
            for (let i = 0; i < grid.length; i += 1) {
                for (let j = 0; j < grid[0].length; j += 1) {
                    if (grid[i][j] !== "@") {
                        continue;
                    }
                    let adjacentCount = 0;
                    for (let [di,dj] of deltas) {
                        const ii = i + di;
                        const jj = j + dj;
                        if (ii < 0 || ii >= grid.length || jj < 0 || jj >= grid[0].length) {
                            continue;
                        }
                        if (grid[ii][jj] === "@") {
                            adjacentCount += 1;
                        }
                    }
                    if (adjacentCount < 4) {
                        removables.push([i,j]);
                    }
                }
            }
            for (let [i,j] of removables) {
                removedAny = true;
                grid[i][j] = "."
                removedCount += 1;
            }
        }
        return removedCount;
    }

    return {
        partOne: partOne(),
        partTwo: partTwo(),
    }
})()
