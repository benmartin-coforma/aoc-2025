(function () {
    const input = document.body.innerText;

    function maxJoltage (bank, digitCount) {
        if (digitCount === 1) return bank.reduce((max, x) => max > x ? max : x);
        const maxFirstDigit = bank.slice(0, -digitCount + 1)
            .reduce((max, x) => max > x ? max : x);
        const index = 1 + bank.indexOf(maxFirstDigit);
        const placeValue = Math.pow(10, digitCount - 1) * maxFirstDigit;
        return placeValue + maxJoltage(bank.slice(index), digitCount - 1);
    }
  
    function partOne() {
        return input.split("\n").filter(line => !!line)
            .map(line => [...line].map(Number))
            .map(bank => maxJoltage(bank, 2))
            .reduce((sum, x) => sum + x, 0);
    }

    function partTwo() {
        return input.split("\n").filter(line => !!line)
            .map(line => [...line].map(Number))
            .map(bank => maxJoltage(bank, 12))
            .reduce((sum, x) => sum + x, 0);
    }

    return {
        partOne: partOne(),
        partTwo: partTwo(),
    }
})()
