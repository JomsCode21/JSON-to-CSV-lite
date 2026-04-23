#!/usr/bin/env node
"use strict";

let jsonToCsv;

try {
  ({ jsonToCsv } = require("../dist/index.cjs"));
} catch {
  ({ jsonToCsv } = require("./index"));
}

function printHelp() {
  process.stdout.write(
    [
      "json-to-csv-lite",
      "",
      "Usage:",
      "  cat input.json | json-to-csv-lite",
      "  json-to-csv-lite '[{\"name\":\"Ana\",\"age\":24}]'",
      "",
      "Input can be either:",
      "  1) A JSON string passed as an argument",
      "  2) JSON piped through stdin",
    ].join("\n") + "\n"
  );
}

function parseInput(raw) {
  const parsed = JSON.parse(raw);

  if (Array.isArray(parsed) || (typeof parsed === "object" && parsed !== null)) {
    return parsed;
  }

  throw new Error("JSON input must be an object or an array of objects.");
}

async function readStdin() {
  return new Promise((resolve, reject) => {
    let data = "";

    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", reject);
  });
}

(async function main() {
  try {
    const arg = process.argv[2];

    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }

    const rawInput = arg !== undefined ? arg : (await readStdin()).trim();

    if (!rawInput) {
      throw new Error("No input provided. Use --help for usage.");
    }

    const data = parseInput(rawInput);
    const csv = jsonToCsv(data);

    process.stdout.write(csv + "\n");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write("Error: " + message + "\n");
    process.exit(1);
  }
})();
