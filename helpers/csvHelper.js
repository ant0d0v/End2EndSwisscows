const parse = require("csv-parse/sync");
const fs = require("fs");

export function readCsvFile(filePath) {
  const fileData = fs.readFileSync(filePath, "utf-8");
  let content = [];
  parse(fileData, {
    columns: true,
    skip_empty_lines: true,
    autoParse: true,
    bom: true,
    on_record: (record) => {
      content.push(splitProperties(record));
    },
  });

  return content;
}

function splitProperties(obj) {
  const result = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (typeof value === "string" && value.includes(";")) {
        result[key] = value.split(";");
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

