st = performance.now();
(function () {
    const input = document.body.innerText;
    // const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

    // Every number (up to 10^10) consisting of a repeated pattern of digits is divisible by one of these factors.
    // If it exists (for numbers with an even number of digits), the "one repeat" divisor is listed first.
    // For example, 123123 is 123 * 1001, so 1001 is listed first on row 6 below.
    // The negative numbers are to correct for overcounting.
    // For example, 666666 is 666 * 1001, but also 66 * 10101. Since it's also 6 * 111111, we know it's been counted twice.
    // We wouldn't need to worry about triple-counting until we got an ID with a magnitude with three coprime factors.
    // Which is to say, a 30-digit ID (length divisible by 2, 3, and 5). Which our input does not include.
    const mults = [
        /*  0 */ [],
        /*  1 */ [],
        /*  2 */ [11],
        /*  3 */ [111],
        /*  4 */ [101],
        /*  5 */ [11111],
        /*  6 */ [1001, 10101, -111111],
        /*  7 */ [1111111],
        /*  8 */ [10001],
        /*  9 */ [1001001],
        /* 10 */ [100001, 101010101, -1111111111],
    ];
    
    const mag = n => 1 + Math.floor(Math.log10(n));

    const check1 = id => mag(id) % 2 === 0 && id % mults[mag(id)][0] === 0;

    const check2 = id => mults[mag(id)].some(m => id % m === 0);

    function sumInvalidPatterns (isInvalid) {
        return input.split(",")
            .map(s => s.split("-").map(Number))
            .flatMap(([start, end]) => Array
                .from(new Array(Math.floor(end - start + 1)))
                .map((_, i) => start + i))
            .filter(isInvalid)
            .reduce((sum, x) => sum + x, 0);
    }

    function parseAndSplitRanges(rangeString) {
        const [start, end] = rangeString.split("-").map(Number);
        const magStart = mag(start);
        const magEnd = mag(end);
        if (magStart === magEnd) {
            return { length: magStart, start, end };
        } else {
            // This range crosses a number-of-digits boundary and must be split.
            // For example, 87-133 becomes two ranges: 87-99 and 100-133
            const boundary = Math.pow(10, magStart);
            return [
                { length: magStart, start, end: boundary - 1 },
                { length: magEnd, start: boundary, end },
            ];
        }
    }
    
    function sumOfMultiplesBetween (m, start, end) {
        const min = Math.ceil(start / m);
        const max = Math.floor(end / m);
        if (max < min) {
            return 0;
        } else if (max === min) {
            return m * min;
        } else {
            return m * ((max * (max + 1)) - (min * (min - 1))) / 2;
        }
    }
    
    function foo (multiplesToCheck) {
        return input
            .split(",")
            .flatMap(parseAndSplitRanges)
            .flatMap(({ length, start, end }) => {
                return multiplesToCheck[length]
                    .map(m => {
                        if (m < 0) return -sumOfMultiplesBetween(-m, start, end)
                        else return sumOfMultiplesBetween(m, start, end);
                     })
                }
            )
            .reduce((sum, x) => sum + x, 0);
    }

    // console.log(foo());
    
    return {
        // partOne: sumInvalidPatterns(check1), // 16793817782
        partOne: foo(mults.map((ms, i) => i % 2 === 0 ? ms.slice(0,1) : [])),
        // partTwo: sumInvalidPatterns(check2), // 27469417404
        partTwo: foo(mults)
    }
})()
// console.log(performance.now() - st)
