interface JsonToCsvOptions {
  headers?: string[];
  includeHeaders?: boolean;
  delimiter?: string;
  quote?: string;
  eol?: string;
}

type JsonRow = Record<string, unknown>;

declare function jsonToCsv(
  input: JsonRow | JsonRow[],
  options?: JsonToCsvOptions,
): string;

export { type JsonRow, type JsonToCsvOptions, jsonToCsv };
