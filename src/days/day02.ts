export function part1(input: string): number | string {
  const ids = input.split(",");
  let result: number = 0;
  for (const id of ids) {
    result += getInvalidIds(id, 1);
  }
  return result;
}

export function part2(input: string): number | string {
  const ids = input.split(",");
  let result: number = 0;
  for (const id of ids) {
    result += getInvalidIds(id, 2);
  }
  return result;
}

function getInvalidIds(id: string, part: number): number {
    const isInvalidId: Function = part === 1 ? isInvalidIdBasic : isInvalidIdAdvanced;
    const idArray = id.split('-');
    const first: number = Number.parseInt(idArray[0]);
    const last: number = Number.parseInt(idArray[1]);
    let result: number = 0;
    for (let i = first; i <= last; i++) {
        if (isInvalidId(i))
            result += i;
    }
    return result;
}

const isInvalidIdBasic = (id: number): boolean => {
    const idAsString = id.toString();
    const stringLength = idAsString.length;
    if (stringLength % 2 === 1) return false;
    const idMidpoint = idAsString.length / 2;
    const firstHalf = idAsString.substring(0, idMidpoint);
    const secondHalf= idAsString.substring(idMidpoint);
    return firstHalf === secondHalf;
}

const isInvalidIdAdvanced = (id: number): boolean => {
    const idAsString = id.toString();
    const stringLength = idAsString.length;

    if (stringLength === 1) return false;

    const idMidPoint = Math.ceil(idAsString.length / 2);

    for (let i = 1; i <= idMidPoint; i++ ) {
        let hasNonDuplicate = true;
        if ( stringLength % i === 0 ) {
            hasNonDuplicate = false;
            const baseString = idAsString.substring(0, i);
            for (let j=i; j<stringLength; j += i) {
                const testString = idAsString.substring(j, j+i)
                if (testString!== baseString) {
                    hasNonDuplicate = true;
                    break;
                }
            }
        }
        if (!hasNonDuplicate) return true;
    }
    return false;
}