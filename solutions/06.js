(function () {
    const input = document.body.innerText;

    /* Split the input by all-space columns.
     * Example:
     *   `qwe rty uio         [["qwe", "asd", "zx "],
     *    asd fgh jkl    =>    ["rty", "fgh", "cv "],
     *    zx  cv  bn `         ["uio", "jkl", "bn "]]
     */
    function * splitIntoProblems (input) {
        const lines = input.split("\n").filter(line => !!line);
        const length = lines[0].length;
        let prevIndex = 0;
        for (let i = 0; i < length; i += 1) {
            if (lines.every(line => line[i] === " ")) {
                yield lines.map(line => line.substring(prevIndex, i));
                prevIndex = i + 1;
            }
        }
        yield lines.map(line => line.substring(prevIndex));
    }

    /* Read numbers left-to-right, top-to-bottom.
     * Example:
     * ["123","45 ","67 "] => [123, 45, 67]
     */
    function extractNumbers_partOne (numberStrings) {
        return numberStrings.map(Number);
    }

    /* Read numbers top-to-bottom, left-to-right.
     * Example:
     * ["123","45 ","67 "] => [146, 257, 3]
     */
    function extractNumbers_partTwo (numberStrings) {
        return [...new Array(numberStrings[0].length)]
            .map((_, i) => Number(numberStrings.map(ns => ns[i]).join("")))
    }

    /* Determine the correct callback for `.reduce()`
     */
    function operation (operatorString) {
        return { "+": SUM, "*": PRODUCT }[operatorString.trim()];
    }
    const PRODUCT = (product, x) => product * x;
    const SUM = (sum, x) => sum + x;

    /* How are these cephalapods ever going to learn
     * if we keep doing their homework for them?
     */
    function homework (numberExtractor) {
        return [...splitIntoProblems(input)]
            .map(problemLines =>
                numberExtractor(problemLines.slice(0, -1))
                .reduce(operation(problemLines.at(-1)))
            )
            .reduce(SUM);
    }
    
    return {
        partOne: homework(extractNumbers_partOne),
        partTwo: homework(extractNumbers_partTwo),
    };
})();
