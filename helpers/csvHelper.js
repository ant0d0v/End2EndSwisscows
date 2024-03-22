const fs = require('fs');
const path = require('path');
import { parse } from 'csv-parse/sync';

export function readCsvFile(filePath) {
    const fileData = parse(fs.readFileSync(path.join(__dirname,filePath)), {
      columns: true,
      skip_empty_lines: true
    })
    return fileData;
}
export function readSpecificCsvFile(filePath) {
  const fileData = parse(fs.readFileSync(path.join(__dirname,filePath)), {
    columns: true, relax_quotes: true, escape: '\\', ltrim: true, rtrim: true 
  })
  return fileData;
}

module.exports = { readCsvFile,readSpecificCsvFile };
