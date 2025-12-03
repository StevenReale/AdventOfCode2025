export function part1(input: string): number | string {
  const lines = input.split("\n");
  let result = 0;
  for (const line of lines) {
    result += getMaxJoltageBasic(line.trim());
  }  
  return result;
}

export function part2(input: string): number | string {
  const lines = input.split("\n");
  let result = 0;
  for (const line of lines) {
    result += getMaxJoltageAdvanced(line.trim());
  }  
  return result;
}

function getMaxJoltageBasic(input: string): number {
    const len = input.length;
    let max = 0;
    let secondMax = 0;

    for (let i = 0; i < len; i++) {
        const current = Number(input[i]);
        if (current > max && i < len - 1) {
            max = current;
            secondMax = Number(input[i+1]);
        } else if (current > secondMax) {
            secondMax = current;
        }
    }

    return  (10 * max) + secondMax;
}

function getMaxJoltageAdvanced(input: string): number {
    const DIGITS = 12;
    const maxIndexes = new Array(DIGITS).fill(0);
    const len = input.length;

    let nextStartIndex = 0;
    for (let i = 0; i < DIGITS; i++) {
        let localMax = -1;
        const lastAllowed = len - (DIGITS - i);
        for (let j = nextStartIndex; j <= lastAllowed; j++) {
            const current = Number(input[j]);
            if (current > localMax) {
                localMax = current;
                maxIndexes[i] = j;
            }
        }
        nextStartIndex = maxIndexes[i] + 1;
    }
    let result = 0;
    for (let i = 0; i < DIGITS; i++) {
        result = (10 * result) + Number(input[maxIndexes[i]]);
    }
    return result;
}