const { jsonToCsv } = require('./index');

try {
    // Example usage of jsonToCsv function
  const jsonData = [
    { name: "John", age: 30, city: "New York" },
    { name: "Jane", age: 25, city: "Los Angeles" }
  ];
  const csvData = jsonToCsv(jsonData);
  console.log(csvData);
} catch (error) {
  console.error("Error:", error.message);
}