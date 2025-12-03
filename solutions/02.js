(function () {
    const input = document.body.innerText;

    // Every number with fewer than 11 digits
    // which consists of a pattern of digits repeated exactly once
    // is divisible by one of these factors.
    // For example, 123123 is divisible by 1001.
    const divisors_partOne = {
        2: [11],
        4: [101],
        6: [1001],
        8: [10001],
        10: [100001],
    }

    // Every number with fewer than 11 digits
    // which consists of a repeated pattern of digits
    // is divisible by at least one of these factors.
    // The negative numbers are to correct for double-counting.
    // For example, 666666 is 666 * 1001 (ie, "666" + "666"),
    // but also 66 * 10101 (ie, "66" + "66" + "66"),
    // so it would be included twice when summing.
    // Since it's also 6 * 111111 (ie, "6" + "6" + "6" + "6" + "6" + "6"),
    // we can check for that and correct the overall sum.
    // My input does not contain any IDs long enough to cause triple-counting.
    const divisors_partTwo = {
        2: [11],
        3: [111],
        4: [101],
        5: [11111],
        6: [1001, 10101, -111111],
        7: [1111111],
        8: [10001],
        9: [1001001],
        10: [100001, 101010101, -1111111111],
    };

    const digitCount = n => 1 + Math.floor(Math.log10(n));

    // Parse "123-456" into { digitCount: 3, start: 123, end: 456 }
    function parseAndNormalizeRanges (rangeString) {
        const [start, end] = rangeString.split("-").map(Number);
        const magStart = digitCount(start);
        const magEnd = digitCount(end);
        if (magStart === magEnd) {
            return { digitCount: magStart, start, end };
        } else {
            // This range crosses a number-of-digits boundary and must be split.
            // For example, 87-133 becomes two ranges: 87-99 and 100-133
            // My input does not contain any single ranges crossing 2 boundaries
            const boundary = Math.pow(10, magStart);
            return [
                { digitCount: magStart, start, end: boundary - 1 },
                { digitCount: magEnd, start: boundary, end },
            ];
        }
    }

    // Compute the sum of all numbers between start and end (inclusive)
    // which are multiples of the given divisor
    function sumOfMultiplesBetween (divisor, start, end) {
        const min = Math.ceil(start / divisor);
        const max = Math.floor(end / divisor);
        if (max < min) {
            return 0;
        } else if (max === min) {
            return divisor * min;
        } else {
            return divisor * ((max * (max + 1)) - ((min - 1) * min)) / 2;
        }
    }

    // Solve. Use a precomputed table of which divisors indicate repetition
    function sumOfInvalidIds (divisorTable) {
        return input
            .split(",")
            .flatMap(parseAndNormalizeRanges)
            .flatMap((range) => (divisorTable[range.digitCount] ?? [])
                .map(div => div > 0
                    ? sumOfMultiplesBetween(div, range.start, range.end)
                    : -sumOfMultiplesBetween(-div, range.start, range.end)
                 )
            )
            .reduce((sum, x) => sum + x, 0);
    }

    return {
        partOne: sumOfInvalidIds(divisors_partOne),
        partTwo: sumOfInvalidIds(divisors_partTwo)
    }
})()
