import { readInput } from "./utils/input";

type SolverFn = (input: string, isSample?: boolean) => unknown;

async function main() {
  const [, , dayArg = "1", partArg = "1", dataArg = "input"] = process.argv;

  const day = Number(dayArg);
  const part = Number(partArg);
  const useSample = dataArg === "sample" || dataArg === "s";

  if (!Number.isInteger(day) || day < 1 || day > 25) {
    console.error("Usage: npm run dev -- <day 1-25> [part 1|2]");
    process.exit(1);
  }
  if (part !== 1 && part !== 2) {
    console.error("Part must be 1 or 2");
    process.exit(1);
  }

  const dayStr = day.toString().padStart(2, "0");
  const modulePath = `./days/day${dayStr}`;

  const dayModule = await import(modulePath);
  const solver = (dayModule as any)[`part${part}`] as SolverFn;

  if (typeof solver !== "function") {
    console.error(`Day ${dayStr} part ${part} not implemented yet.`);
    process.exit(1);
  }

  const input = readInput(day, useSample ? "sample" : "input" );
  const answer = solver(input, useSample);

  console.log(`Day ${dayStr} part ${part}:`, answer);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
