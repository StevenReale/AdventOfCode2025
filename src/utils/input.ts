import { readFileSync } from "fs";
import { resolve } from "path";

export function readInput(
  day: number,
  variant: "input" | "sample" = "input"
): string {
  const dayStr = day.toString().padStart(2, "0");
  const filename = variant === "sample" ? "sample.txt" : "input.txt";

  const filePath = resolve(
    __dirname,
    "..",
    "..",
    "inputs",
    `day${dayStr}`,
    filename
  );

  return readFileSync(filePath, "utf8").trimEnd();
}
