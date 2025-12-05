(function () {
    const input = document.body.innerText.trim();

    function parse (input) {
        const [rangeBlock, idBlock] = input.split("\n\n");
        const ranges = rangeBlock.split("\n")
            .map(line => line.split("-").map(Number));
        const ids = idBlock.split("\n").map(Number);
        return { ranges, ids };
    }

    function rangeContains ([start, end], point) {
        return start <= point && point <= end;
    }
    
    function partOne() {
        const { ranges, ids } = parse(input);
        return ids.filter(id => ranges.some(r => rangeContains(r, id))).length;
    }

    function byStartThenByEnd (rangeA, rangeB) {
        return rangeA[0] - rangeB[0] || rangeA[1] - rangeB[1];
    }

    function * combinedRanges (ranges) {
        ranges.sort(byStartThenByEnd);

        for (let i = 1; i < ranges.length; i += 1) {
            const range = ranges[i];
            const prevRange = ranges[i - 1];
            if (prevRange[1] >= range[1]) {
                // This range is entirely covered by the previous
                range[0] = prevRange[0];
                range[1] = prevRange[1];
            } else if (prevRange[1] >= range[0]) {
                // This range partially overlaps the previous
                range[0] = prevRange[0];
            } else {
                // This range is separate from the previous
                yield prevRange;
            }
        }

        yield ranges.at(-1);
    }
    
    function partTwo() {
        const ranges = parse(input).ranges;
        return Array.from(combinedRanges(ranges))
            .map(([start, end]) => end - start + 1)
            .reduce((sum, x) => sum + x, 0);
    }

    return {
        partOne: partOne(),
        partTwo: partTwo(),
    };
})();
