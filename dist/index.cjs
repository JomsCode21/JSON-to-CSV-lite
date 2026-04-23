var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  jsonToCsv: () => jsonToCsv
});
module.exports = __toCommonJS(index_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  jsonToCsv
});
//# sourceMappingURL=index.cjs.map