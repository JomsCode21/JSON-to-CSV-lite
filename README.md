# json-to-csv-lite

Fast, lightweight JSON-to-CSV converter for Node.js and CLI use.

- Zero runtime dependencies
- Works as a library and command-line tool
- Supports CommonJS and ESM imports
- Includes TypeScript declarations

## Installation

```bash
npm install @jomscode21/json-to-csv-lite
```

## Library Usage

### CommonJS

```js
const { jsonToCsv } = require("@jomscode21/json-to-csv-lite");

const data = [
  { name: "Ana", age: 24, city: "Cebu" },
  { name: "Ben", age: 28, city: "Davao" },
];

const csv = jsonToCsv(data);
console.log(csv);
```

### ESM

```js
import { jsonToCsv } from "@jomscode21/json-to-csv-lite";

const data = [
  { name: "Ana", age: 24, city: "Cebu" },
  { name: "Ben", age: 28, city: "Davao" },
];

console.log(jsonToCsv(data));
```

### TypeScript

```ts
import { jsonToCsv, type JsonToCsvOptions } from "@jomscode21/json-to-csv-lite";

const data = [
  { name: "Ana", age: 24, city: "Cebu" },
  { name: "Ben", age: 28, city: "Davao" },
];

const options: JsonToCsvOptions = {
  headers: ["city", "name", "age"],
  includeHeaders: true,
  delimiter: ",",
  quote: '"',
  eol: "\n",
};

console.log(jsonToCsv(data, options));
```

## API

### `jsonToCsv(input, options?)`

Converts a JSON object or array of objects into CSV.

**Parameters**

- `input` (`Record<string, unknown> | Record<string, unknown>[]`)
- `options` (`JsonToCsvOptions`, optional)

**Options**

- `headers?: string[]`  
  Use a custom header order. If omitted, headers are inferred from first-seen keys across rows.
- `includeHeaders?: boolean` (default: `true`)  
  Include or skip the header row.
- `delimiter?: string` (default: `,`)  
  CSV field separator.
- `quote?: string` (default: `"`)  
  Quote character used when escaping fields.
- `eol?: string` (default: `\n`)  
  End-of-line sequence.

**Returns**

- `string` CSV output

**Throws**

- `TypeError` if `input` is not an object/array of objects
- `TypeError` if any row in an input array is not a plain object

## CLI Usage

After install, run:

```bash
json-to-csv-lite --help
```

### From a JSON argument

```bash
json-to-csv-lite '[{"name":"Ana","age":24},{"name":"Ben","age":28}]'
```

### From stdin

```bash
cat data.json | json-to-csv-lite
```

PowerShell:

```powershell
Get-Content -Raw .\data.json | json-to-csv-lite
```

## Behavior Notes

- `null` and `undefined` become empty CSV cells
- Nested objects/arrays are converted using `JSON.stringify`
- Values containing delimiter, quotes, or line breaks are escaped
- Empty array input returns an empty string

## Local Development

```bash
npm install
npm run build
npm test
```

## License

MIT
