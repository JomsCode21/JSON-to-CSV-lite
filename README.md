# json-to-csv-lite

A lightweight and dependency-free JSON to CSV converter for Node.js.

Use it as:

- A library in your Node.js application
- A CLI tool for quick terminal conversions

## Features

- Converts a JSON object or array of objects into CSV
- Auto-infers headers from your data
- Supports custom header order
- Escapes commas, quotes, and line breaks correctly
- Handles nested values by JSON-stringifying objects
- Works with CommonJS projects
- Includes built-in TypeScript declarations

## Installation

Install in your project:

```bash
npm install json-to-csv-lite
```

For local development in this repo:

```bash
npm install
```

## Quick Start (Library)

```js
const { jsonToCsv } = require("json-to-csv-lite");

const data = [
  { name: "Ana", age: 24, city: "Cebu" },
  { name: "Ben", age: 28, city: "Davao" },
];

const csv = jsonToCsv(data);
console.log(csv);
```

Output:

```csv
name,age,city
Ana,24,Cebu
Ben,28,Davao
```

## Quick Start (TypeScript)

```ts
import { jsonToCsv, type JsonToCsvOptions } from "json-to-csv-lite";

const data = [
  { name: "Ana", age: 24, city: "Cebu" },
  { name: "Ben", age: 28, city: "Davao" },
];

const options: JsonToCsvOptions = {
  headers: ["name", "age", "city"],
};

const csv = jsonToCsv(data, options);
console.log(csv);
```

## API Reference

### jsonToCsv(input, options)

Converts JSON data into a CSV string.

Parameters:

- `input` (`Object | Object[]`): A single object or an array of objects
- `options` (`Object`, optional): Conversion settings

Options:

- `headers` (`string[]`): Custom header order
- `includeHeaders` (`boolean`, default `true`): Include header row in output
- `delimiter` (`string`, default `,`): Field separator
- `quote` (`string`, default `"`): Quote character
- `eol` (`string`, default `\n`): End-of-line sequence

Returns:

- `string`: CSV output

Throws:

- `TypeError` when input is not an object/array of objects

## Guided Examples

### 1. Custom Header Order

```js
const { jsonToCsv } = require("json-to-csv-lite");

const data = [
  { name: "Ana", age: 24, city: "Cebu" },
  { name: "Ben", age: 28, city: "Davao" },
];

const csv = jsonToCsv(data, {
  headers: ["city", "name", "age"],
});

console.log(csv);
```

### 2. No Header Row

```js
const { jsonToCsv } = require("json-to-csv-lite");

const data = [
  { name: "Ana", age: 24 },
  { name: "Ben", age: 28 },
];

const csv = jsonToCsv(data, { includeHeaders: false });
console.log(csv);
```

### 3. Semicolon Delimiter

```js
const { jsonToCsv } = require("json-to-csv-lite");

const data = [{ name: "Ana", note: "Likes, commas" }];

const csv = jsonToCsv(data, { delimiter: ";" });
console.log(csv);
```

## CLI Usage

After installation, you can use the CLI command:

```bash
json-to-csv-lite --help
```

### Pass JSON directly (Bash)

```bash
json-to-csv-lite '[{"name":"Ana","age":24},{"name":"Ben","age":28}]'
```

### Pipe JSON from stdin (recommended)

```bash
cat data.json | json-to-csv-lite
```

### PowerShell-friendly usage

```powershell
'[{"name":"Ana","age":24},{"name":"Ben","age":28}]' | json-to-csv-lite
```

## Behavior Notes

- `null` and `undefined` values are converted to empty CSV cells
- Nested objects and arrays are converted with `JSON.stringify`
- Header inference is based on first-seen key order across rows
- Empty array input returns an empty string

## Error Handling Example

```js
const { jsonToCsv } = require("json-to-csv-lite");

try {
  const csv = jsonToCsv("invalid");
  console.log(csv);
} catch (error) {
  console.error(error.message);
}
```

## Scripts (This Repository)

```bash
npm start
npm test
```

## License

MIT
