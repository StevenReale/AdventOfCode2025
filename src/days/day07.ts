export function part1(input: string): number {
    const lines = input.trimEnd().split(/\r?\n/);
    return tachyonsSplit(lines);
}

export function part2(input: string): number {
    const lines = input.trimEnd().split(/\r?\n/);
    return quantumTachyonsSplit(lines);
}

function tachyonsSplit(lines: string[]): number {
    let count = 0;
    const lineLen = lines[0].length;
    const tachyons = new Array<boolean>(lineLen).fill(false);
    for (const line of lines) {
        count += processLine(line, tachyons);
    }
    return count;
}

function processLine(line: string, tachyons: boolean[], onlyReturnStartIndex: boolean = false): number {
    let timesSplit = 0;
    for (let i = 0; i < line.length; i++) {
        if (line[i] === 'S') {
            tachyons[i] = true;
            return onlyReturnStartIndex ? i : timesSplit;
        }

        if (line[i] === '^' && tachyons[i]) {
            timesSplit++;
            tachyons[i] = false;
            if (i > 0) tachyons[i - 1] = true;
            if (i < tachyons.length - 1) tachyons[i + 1] = true;
        }
    }
    return timesSplit;
}

function quantumTachyonsSplit(lines: string[]): number {
    let currentTach = processLine(lines[0], [], true);
    return quantumTachLine(lines, 1, currentTach, new Map<string, number>());
}

function quantumTachLine(lines: string[], currentLine: number, currentTach: number, nodeMap: Map<string, number>): number {
    if (currentTach < 0 || currentTach >= lines[currentLine].length) return 0;
    if(!lines[currentLine]) return 1;
    
    if(lines[currentLine][currentTach] === '^') {
        const address = `${currentLine},${currentTach}`;
        if (nodeMap.has(address)) return nodeMap.get(address)!;
        const result =  quantumTachLine(lines, currentLine + 1, currentTach - 1, nodeMap) + quantumTachLine(lines, currentLine + 1, currentTach + 1, nodeMap);
        nodeMap.set(address, result);
        return result;
    }
    return quantumTachLine(lines, currentLine + 1, currentTach, nodeMap);
}