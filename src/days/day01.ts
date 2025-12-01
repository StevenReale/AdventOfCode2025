export function part1(input: string): number | string {
  const lines = input.split("\n");
  let dial: number = 50;
  let zeros: number = 0;

  for (let line of lines) {
    dial = turnDial(dial, line);
    if (dial === 0) zeros++
  }
  return zeros;
}

function turnDial(dial: number, line: string): number {
    const direction = line[0];
    const value = Number.parseInt(line.slice(1))
    switch (direction) {
        case 'L':
            return (dial - value) % 100;
        case 'R':
            return (dial + value) % 100;
    }
    throw new Error("Invalid direction");
}

type AdvancedDial = {
    dial: number,
    zeros: number
}

export function part2(input: string): number | string {
  const lines = input.split("\n");
  let dial: number = 50;
  let zeros: number = 0;

  for (let line of lines) {
    const result = turnDialAdvanced(dial, line);
    dial = result.dial;
    zeros += result.zeros;
  }
  return zeros;
}

function turnDialAdvanced(dial: number, line: string): AdvancedDial {
    const direction = line[0];
    const value = Number.parseInt(line.slice(1));
    let rawDial: number;
    let newDial: number;
    let zeros: number;

    switch (direction) {
        case 'L':
            rawDial = (dial - value);
            zeros = Math.abs(Math.floor(rawDial / 100));
            newDial = ((rawDial % 100) + 100) % 100;
            if (newDial === 0) zeros++;
            if (dial === 0) zeros--;
            break;
        case 'R':
            rawDial = (dial + value);
            zeros = Math.abs(Math.floor(rawDial / 100));
            newDial = rawDial % 100;
            break;
        default:
            throw new Error("Invalid direction");
    }
    
    return {dial: newDial, zeros: zeros};    
}
