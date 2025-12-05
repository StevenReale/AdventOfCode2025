const freshIngredients: number[][] = []; 

export function part1(input: string): number | string {
    const lines = input.split("\n");
    let allRangesParsed = false;
    let totalFresh = 0;
    for (let line of lines) {
        if (line.trim() === '') {
            allRangesParsed = true;
            continue;
        }
        if (!allRangesParsed) {
            parseRange(line);
        } else {
            if (isFresh(Number(line)))
                totalFresh++
        }
    }
    return totalFresh;
}

function parseRange(range: string): void {
    const boundaries = range.split('-');
    const entry: number[] = [];
    entry[0] = Number(boundaries[0]);
    entry[1] = Number(boundaries[1]);
    freshIngredients.push(entry);
} 

function isFresh(ingredient: number): boolean {
    for (const range of freshIngredients) {
        if (ingredient >= range[0] && ingredient <= range[1])
            return true;
    }
    return false;
}

let intervals: number[][] = [];
export function part2(input: string): number | string {
    const lines = input.split("\n");
    let totalFresh = 0;
    for (const line of lines) {
        if (line.trim() === '')
            break;
        const boundaries = line.split('-');
        const entry = [Number(boundaries[0]), Number(boundaries[1])];
        insert(entry);
    }

    for (const interval of intervals) {
        totalFresh += interval[1] - interval[0] + 1;    
    }
    return totalFresh;
}

function insert(newInterval: number[]): void {
 const result = [];
 let addedNew = false;
 
 for(let i=0; i<intervals.length; i++) {
 if (addedNew) { 
 result.push(intervals[i]); 
 continue; 
 }
 
 if((newInterval[0] > intervals[i][1])) 
 result.push(intervals[i]);
 else if((newInterval[1] < intervals[i][0])) {
 if(!addedNew) {
 addedNew = true;
 result.push(newInterval);
 }
 result.push(intervals[i]);
 }
 else {
 newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
 newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
 }
 }
 
 if (!addedNew)
 result.push(newInterval);
 
 intervals = result;
 }