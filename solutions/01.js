(function () {
    const input = document.body.innerText;

    const movements = input.split("\n")
        .filter(line => line.length > 0)
        .map(line => line.replace("L", "-").replace("R", ""))
        .map(str => Number(str));
    
    function partOne() {
        let position = 50;
        let count = 0;
        for (let movement of movements) {
            position = (position + movement + 1000) % 100;
            if (position === 0) {
                count += 1;
            }
        }
        return count;
    }

    function partTwo() {
        let position = 50;
        let count = 0;
        for (let movement of movements) {
            if (movement < 0) {
                const midTurnClicks = Math.floor(-1*movement/100);
                count += midTurnClicks;
                movement += 100 * midTurnClicks;
                let newPos = movement + position;
                if (newPos < 0) {
                    if (position > 0) {
                        count += 1;
                    }
                    newPos += 100;
                }
                position = newPos;
                if (position === 0) count += 1;
            }
            else if (movement > 0) {
                const midTurnClicks = Math.floor(movement/100);
                count += midTurnClicks;
                movement -= 100 * midTurnClicks;
                let newPos = movement + position;
                if (newPos >= 100) {
                    count += 1;
                    newPos -= 100;
                }
                position = newPos;
            }
        }
        return count;
    }

    return {
        partOne: partOne(),
        partTwo: partTwo(),
    }
})()
