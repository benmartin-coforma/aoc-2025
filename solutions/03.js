(function () {
    const input = document.body.innerText;

    function maxJoltageForBank (bank, digitCount) {
        let total = 0;
        while (digitCount > 0) {
            const availableBatteries = digitCount > 1
                ? bank.slice(0, -digitCount + 1)
                : bank;
            const max = availableBatteries.reduce((m, x) => m > x ? m : x);
            total = 10 * total + max;
            digitCount -= 1;
            bank = bank.slice(1 + bank.indexOf(max));
        }
        return total;
    }

    function maxJoltage (digitCount) {
        return input.split("\n").filter(line => !!line)
            .map(line => [...line].map(Number))
            .map(bank => maxJoltageForBank(bank, digitCount))
            .reduce((sum, x) => sum + x, 0);
    }
    
    return {
        partOne: maxJoltage(2),
        partTwo: maxJoltage(12),
    }
})()
