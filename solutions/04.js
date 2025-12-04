(function () {
    const input = document.body.innerText.trim();

    const deltas = [
        [-1,-1],[-1,0],[-1,1],
        [ 0,-1],       [ 0,1],
        [ 1,-1],[ 1,0],[ 1,1]
    ];

    function locations (grid) {
        return [...new Array(grid.length)].flatMap(
            (_, i) => [...new Array(grid[i].length)].map(
                (_, j) => [i, j]
            )
        );
    }
    
    function adjacentValues (grid, [i, j]) {
        return deltas.map(([di, dj]) => [i + di, j + dj])
            .filter(([ii, jj]) =>
                ii >= 0 &&
                ii < grid.length &&
                jj >= 0 &&
                jj < grid[ii].length
            )
            .map(([ii, jj]) => grid[ii][jj]);
    }

    function removableLocations (grid) {
        return locations(grid)
            .filter(([i, j]) =>
                grid[i][j] === "@" &&
                adjacentValues(grid, [i, j])
                    .filter(c => c === "@")
                    .length < 4
           );
    }

    function partOne () {
        const grid = input.split("\n").map(line => [...line])
        return removableLocations(grid).length;
    }

    function partTwo () {
        const grid = input.split("\n").map(line => [...line])
        let removedCount = 0;
        let removedAny = false;
        do {
            const removable = removableLocations(grid);
            removedAny = removable.length > 0;
            removedCount += removable.length;
            for (let [i, j] of removable) {
                grid[i][j] = ".";
            }
        } while (removedAny);
        return removedCount;
    }

    return {
        partOne: partOne(),
        partTwo: partTwo(),
    }
})()
