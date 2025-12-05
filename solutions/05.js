(function () {
    const input = document.body.innerText.trim();

    function partOne() {
        const [rangeBlock, idBlock] = input.split("\n\n");
        const ranges = rangeBlock.split("\n").map(line => line.split("-").map(Number));
        const ids = idBlock.split("\n").map(Number);
        return ids.filter(id => ranges.some(([a, b]) => a <= id && id <= b)).length;
    }

    function partTwo() {
        const ranges = input
            .split("\n\n")[0]
            .split("\n")
            .map(line => line
                .split("-")
                .map(Number))
            .sort((a, b) => a[0] - b[0] || a[1] - b[1]);

        const combined = [];
        for (let i = 0; i < ranges.length; i += 1) {
            const here = ranges[i];
            const there = ranges[i + 1];
            if (!there) {
                combined.push(here);
            } else if (here[1] >= there[1]) {
                there[0] = here[0];
                there[1] = here[1];
            } else if (here[1] >= there[0]) {
                there[0] = here[0];
            } else {
                combined.push(here);
            }
        }

        return combined.map(([start, end]) => end - start + 1)
            .reduce((sum, x) => sum + x, 0);
    }

    return {
        partOne: partOne(),
        partTwo: partTwo(),
    };
})();
