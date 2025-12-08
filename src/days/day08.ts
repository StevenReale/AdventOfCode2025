export function part1(input: string, isSample: boolean): number {
    const lines = input.trimEnd().split(/\r?\n/);
    const maxDistancesToProcess = isSample ? 10 : 1000;
    return countClosestJunctionBoxes(lines, maxDistancesToProcess);
}

export function part2(input: string): number {
    const lines = input.trimEnd().split(/\r?\n/);
    return findFinalConnection(lines);
}

function countClosestJunctionBoxes(lines: string[], maxDistancesToProcess: number): number {
    const {sortedDistances, distancesMap} = getSortedDistances(lines);
    const {junctionGraph, lastEntry} = getJunctionGraph(distancesMap, sortedDistances, lines.length, maxDistancesToProcess);
    
    const networkSizes: number[] = [];
    for (const value of junctionGraph.values()) {
        networkSizes.push(value.length);
    }
    const sortedNetworkSizes = networkSizes.sort((a, b) => b - a);
    return sortedNetworkSizes[0] * sortedNetworkSizes[1] * sortedNetworkSizes[2];
}

function findFinalConnection(lines: string[]): number {
    const {sortedDistances, distancesMap} = getSortedDistances(lines);
    const {junctionGraph, lastEntry} = getJunctionGraph(distancesMap, sortedDistances, lines.length, null);
    return Number(lastEntry[0].split(',')[0]) * Number(lastEntry[1].split(',')[0]);
}

function getSortedDistances(lines: string[]) {
    const distancesMap = new Map<number, string>();
    const distances: number[] = [];
    for (let i = 0; i < lines.length - 1; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            const distance = getDistance(lines[i], lines[j]);
            distancesMap.set(distance, `${lines[i]}.${lines[j]}`);
            distances.push(distance);
        }
    }
    const sortedDistances = distances.sort((a, b) => a - b);
    return {sortedDistances, distancesMap};
}

function getDistance(pointA: string, pointB: string): number {
    const Acoords = pointA.split(',');
    const Bcoords = pointB.split(',');
    return Math.sqrt(
        (Number(Acoords[0]) - Number(Bcoords[0])) ** 2 + 
        (Number(Acoords[1]) - Number(Bcoords[1])) ** 2 +
        (Number(Acoords[2]) - Number(Bcoords[2])) ** 2
    );
} 

type JunctionGraph = Map<string, string[]>;

type JunctionResult = {
  junctionGraph: JunctionGraph;
  lastEntry: [string, string];
};

function getJunctionGraph(
    distancesMap: Map<number,string>, 
    sortedDistances: number[], 
    totalLines: number, 
    maxDistancesToProcess: number | null = null
): JunctionResult {
    const junctionGraph = new Map<string, string[]>();
    const parentNodes = new Map<string, string>();
    let first: string = "";
    let second: string = "";
    for (let i = 0; i < (maxDistancesToProcess ?? sortedDistances.length); i++) {
        [first, second] = distancesMap.get(sortedDistances[i])?.split('.')!;
        if (!parentNodes.has(first) && !parentNodes.has(second)) {
            parentNodes.set(first, first);
            parentNodes.set(second, first);
            junctionGraph.set(first, [first, second]);
        } else if (parentNodes.get(first) === parentNodes.get(second)){
            continue;
        } else if (!parentNodes.has(first) && parentNodes.has(second)) {
            const root = parentNodes.get(second)!;
            parentNodes.set(first, root);
            junctionGraph.get(root)!.push(first);
        } else if (!parentNodes.has(second) && parentNodes.has(first)) {
            const root = parentNodes.get(first)!;
            parentNodes.set(second, root);
            junctionGraph.get(root)!.push(second);
        } else {
            const fromMerge = junctionGraph.get(parentNodes.get(second)!)!;
            const oldParent = parentNodes.get(second)!;
            const toMerge = parentNodes.get(first)!;
            for (const node of fromMerge) {
                parentNodes.set(node, toMerge);
                junctionGraph.get(toMerge)!.push(node);
            }
            junctionGraph.delete(oldParent);
        }

        if (!maxDistancesToProcess && junctionGraph.size === 1 && parentNodes.size === totalLines) {
            break;
        }
    }
    return {junctionGraph, lastEntry: [first, second]};
}