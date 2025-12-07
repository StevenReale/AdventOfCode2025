type Interval = [number, number];
const freshIngredients: number[][] = []; 

export function part1(input: string): number | string {
    const lines = input.trimEnd().split(/\r?\n/);
    const ranges: Interval[] = [];
    let allRangesParsed = false;
    let totalFresh = 0;
    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (line === '') {
            allRangesParsed = true;
            continue;
        }
        if (!allRangesParsed) {
            ranges.push(parseInterval(line));
        } else {
            if (isFresh(Number(line), ranges))
                totalFresh++
        }
    }
    return totalFresh;
}

function parseInterval(range: string): Interval {
    const [start, end] = range.split('-');
    return [Number(start), Number(end)];
} 

function isFresh(ingredient: number, ranges: Interval[]): boolean {
    for (const [start, end] of ranges) {
        if (ingredient >= start && ingredient <= end)
            return true;
    }
    return false;
}

export function part2(input: string): number | string {
    const lines = input.trimEnd().split(/\r?\n/);

    let intervals: Interval[] = [];

    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (line === '')
            break;
        const boundaries = parseInterval(line);
        intervals.push(boundaries);
    }

    const merged = mergeIntervals(intervals);

    let totalFresh = 0;
    for (const [start, end] of merged) {
        totalFresh += end - start + 1;    
    }

    return totalFresh;
}

function mergeIntervals(intervals: Interval[]): Interval[] {
    const merged = intervals.sort((a,b) => a[0] - b[0]);
    const result: Interval[] = [];
    let current = merged[0];

    for (let i = 1; i < merged.length; i++) {

        const next = merged[i];

        if (next[0] > current[1]) {
            result.push(current);
            current = next;

        }

        else {
            current[1] = Math.max(current[1], next[1]);
        }
    }

    result.push(current);

    return result;
}

//deprecated. Refactored to merge instead
function insert(intervals: Interval[], newInterval: number[]): Interval[] {
    const result: Interval[] = [];
    let [newStart, newEnd] = newInterval;
    let addedNew = false;
    
    for(let i=0; i<intervals.length; i++) {
        if (addedNew) { 
            result.push(intervals[i]); 
            continue; 
        }

        const [curStart, curEnd] = intervals[i];
    
        if(newStart > curEnd) 
            result.push(intervals[i]);
        else if(newEnd < curStart) {
            if(!addedNew) {
                addedNew = true;
                result.push([newStart, newEnd]);
            }
            result.push(intervals[i]);
         }
        else {
            newStart = Math.min(curStart, newStart);
            newEnd = Math.max(curEnd, newEnd);
        }
    }
 
    if (!addedNew)
    result.push([newStart, newEnd]);
    
    return result;
 }