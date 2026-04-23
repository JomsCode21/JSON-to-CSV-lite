// src/index.ts
function jsonToCsv(input, options = {}) {
  const {
    headers,
    includeHeaders = true,
    delimiter = ",",
    quote = '"',
    eol = "\n"
  } = options;
  if (!Array.isArray(input) && (typeof input !== "object" || input === null)) {
    throw new TypeError("Input must be an object or an array of objects.");
  }
  const rows = Array.isArray(input) ? input : [input];
  if (rows.some((row) => typeof row !== "object" || row === null || Array.isArray(row))) {
    throw new TypeError("Each row must be a plain object.");
  }
  if (rows.length === 0) {
    return "";
  }
  const resolvedHeaders = Array.isArray(headers) && headers.length > 0 ? headers : inferHeaders(rows);
  const lines = [];
  if (includeHeaders) {
    lines.push(resolvedHeaders.map((h) => escapeCsvValue(h, delimiter, quote)).join(delimiter));
  }
  for (const row of rows) {
    const line = resolvedHeaders.map((header) => escapeCsvValue(normalizeValue(row[header]), delimiter, quote)).join(delimiter);
    lines.push(line);
  }
  return lines.join(eol);
}
function inferHeaders(rows) {
  const seen = /* @__PURE__ */ new Set();
  const result = [];
  for (const row of rows) {
    for (const key of Object.keys(row)) {
      if (!seen.has(key)) {
        seen.add(key);
        result.push(key);
      }
    }
  }
  return result;
}
function normalizeValue(value) {
  if (value === null || value === void 0) {
    return "";
  }
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
}
function escapeCsvValue(value, delimiter, quote) {
  const mustQuote = value.includes(delimiter) || value.includes("\n") || value.includes("\r") || value.includes(quote);
  const escaped = value.split(quote).join(quote + quote);
  return mustQuote ? quote + escaped + quote : escaped;
}
export {
  jsonToCsv
};
//# sourceMappingURL=index.mjs.map