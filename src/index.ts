import { readInput } from "./utils/input";

async function main() {
  const [, , dayArg = "1", partArg = "1"] = process.argv;

  const day = Number(dayArg);
  const part = Number(partArg);

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
  const solver = (dayModule as any)[`part${part}`] as (input: string) => unknown;

  if (typeof solver !== "function") {
    console.error(`Day ${dayStr} part ${part} not implemented yet.`);
    process.exit(1);
  }

  const input = readInput(day);
  const answer = solver(input);

  console.log(`Day ${dayStr} part ${part}:`, answer);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
