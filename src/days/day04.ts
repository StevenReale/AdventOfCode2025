export function part1(input: string): number | string {
    const lines = input.split("\n");
    return basicRollCount(lines);
}

export function part2(input: string): number | string {
    const lines = input.split("\n");
    return advancedRollCount(lines);
}

function basicRollCount(lines: string[]): number {
    let result = 0;
    for(let i = 0; i<lines.length; i++) {
        for (let j = 0; j<lines[i].length; j++) {
            if (lines[i][j] !== '@')
                continue;
            const count = countAdjacentRolls(lines, i, j);

            if (count < 4)
                result++;
        }
    }
    return result;
}

type Coordinate = {
    i: number,
    j: number
}

function advancedRollCount(lines: string[]): number {
    let result = 0;
    let removable: Coordinate[] = [];
    while(true){
        for(let i = 0; i<lines.length; i++) {
            for (let j = 0; j<lines[i].length; j++) {

                if (lines[i][j] !== '@')
                    continue;
                const count = countAdjacentRolls(lines, i, j);

                if (count < 4) {
                    result++;
                    removable.push({i: i, j: j});
                }
            }
        }
        if (removable.length > 0) {
            lines = removeRolls(lines, removable);
            removable = [];
        } else {
            break;
        }
    }
    return result;
}

function countAdjacentRolls(lines: string[], i: number, j:number) {
    let count = 0;
    //NW
    if (
        i > 0 && 
        j > 0 &&
        lines[i-1][j-1] === '@'
    )
        count++;
    //N
    if (
        i > 0 &&
        lines[i-1][j] === '@'
    )
        count++;
    //NE
    if (
        i > 0 &&
        j < lines[i].length - 1 &&
        lines[i-1][j+1] === '@'
    )
        count++;
    //W
    if (j > 0 &&
        lines[i][j-1] === '@'
    )
        count++;
    //E
    if (j < lines[i].length - 1 &&
        lines[i][j+1] === '@'
    )
        count++;
    //SW
    if (i < lines.length - 1 &&
        j > 0 &&
        lines[i+1][j-1] === '@'
    )
        count++;
    //S
    if (i < lines.length - 1 &&
        lines[i+1][j] === '@'
    )
        count++;
    //SE
    if (i < lines.length - 1 &&
        j < lines[i].length - 1 &&
        lines[i+1][j+1] === '@'
    )
        count++;

    return count;
}

function removeRolls(lines: string[], removable: Coordinate[]): string[] {
    for (let coord of removable) {
        const row = lines[coord.i].split('');
        row[coord.j] = '.';
        lines[coord.i] = row.join('');
    }
    return lines;
}