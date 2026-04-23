export interface JsonToCsvOptions {
  headers?: string[];
  includeHeaders?: boolean;
  delimiter?: string;
  quote?: string;
  eol?: string;
}

export type JsonRow = Record<string, unknown>;

export declare function jsonToCsv(
  input: JsonRow | JsonRow[],
  options?: JsonToCsvOptions,
): string;
