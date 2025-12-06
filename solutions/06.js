(function () {
    const input = document.body.innerText;

    function parse1 (input) {
        const lines = input.split("\n").filter(line => !!line);
        const length = lines.map(line => line.length).reduce((m,x)=>m<x?m:x);
        const groups = [...new Array(lines.length)].map(_ => []);
        let lastSplitIndex = 0;
        for (let i = 0; i < length; i += 1) {
            if (lines.every(line => line[i] === " ")) {
                for (let j = 0; j < lines.length; j += 1) {
                    groups[j].push(lines[j].substring(lastSplitIndex, i));
                }
                lastSplitIndex = i + 1;
            }
        }
        for (let j = 0; j < lines.length; j += 1) {
            groups[j].push(lines[j].substring(lastSplitIndex));
        }
        return groups;
    }
    
    function partOne() {
        const groups = parse1(input);
        const numbers = groups.slice(0, -1)
            .map(line => line.map(part => Number(part.trim())));
        const operators = groups.at(-1).map(part => part.trim());
        
        return [...new Array(operators.length)].map((_, i) => {
                const operands = numbers.map(ns => ns[i]);
                const operator = operators[i];
                const func = {
                    "+": (sum, x) => sum + x,
                    "*": (prod, x) => prod * x,
                }[operator];
                return operands.reduce(func);
            })
            .reduce((sum, x) => sum + x);
    }
    
    function partTwo() {
        const groups = parse1(input);
        const numbers = groups.slice(0, -1);
        const operators = groups.at(-1);

        return [...new Array(operators.length)]
            .map((_, i) => {
                const operator = operators[i];
                const operands = [];
                for (let j = operator.length - 1; j >= 0; j -= 1) {
                    const str = numbers.map(ns => ns[i][j]).join("").replaceAll(" ", "");
                    if (str.length > 0)
                        operands.push(Number(str));
                }
                const func = {
                    "+": (sum, x) => sum + x,
                    "*": (prod, x) => prod * x,
                }[operator.trim()];
                return operands.reduce(func);
            })
            .reduce((sum, x) => sum + x);
    }

    return {
        partOne: partOne(),
        partTwo: partTwo(),
    };
})();
