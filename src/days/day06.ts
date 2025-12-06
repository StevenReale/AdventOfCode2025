export function part1(input: string): number | string {
    const lines = input.trimEnd().split(/\r?\n/);
    return calculateProblemsBasic(lines);
}

export function part2(input: string): number | string {
    const lines = input.trimEnd().split(/\r?\n/);
    return calculateProblemsAdvanced(lines);
}

function calculateProblemsBasic(lines: string[]): number {
    const operatorLine = lines[lines.length - 1];
    const valueLines = lines.slice(0, -1);

    const results: number[] = parseLine(lines[0])
    const operators = operatorLine.split(' ').filter(e => e.trim());

    for (let i = 1; i < valueLines.length; i++) {
        const current = parseLine(valueLines[i]);
        for (let j = 0; j < results.length; j++) {
            results[j] = operators[j] === '*' ? current[j] * results[j] : current[j] + results [j];
        }
    }

    return results.reduce((a, b) => a + b, 0);
}

function parseLine(line: string): number[] {
  if (!line.trim()) return [];
  return line
    .trim()
    .split(/\s+/)
    .map(Number);
}

function calculateProblemsAdvanced(lines: string[]): number {
    const operatorLine = lines[lines.length - 1];
    const valueLines = lines.slice(0, -1);

    let result = 0;
    let buffer : number[] = [];
    for (let i = lines[0].length - 2; i >= 0; i--) {
        let current = 0;
        for (let j = 0; j < valueLines.length; j++) {
            const thisChar = lines[j].charAt(i);
            if (thisChar == ' ') continue;
            current = 10 * current + Number(thisChar);
        }
        buffer.push(current);

        const operator = operatorLine.charAt(i).trim();
        if (operator) {
            const isMultiply = operator === '*';
            const initial = isMultiply ? 1 : 0;

            const calculation = buffer.reduce((a, b) => (isMultiply ? a * b : a + b), initial);
            result += calculation;
            buffer = [];
            i--; // Skip the blank spacer column immediately to the left of each operator.

        }
    }
    return result;
}