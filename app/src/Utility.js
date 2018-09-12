'use strict'

const Json2csv = require('json2csv').Parser

class Utility {
  constructor() {}
  /**
   * Converts JSON into CSV and writes into a file
   */
  writeToCsv(json, filepath) {
    // const fields = ['name', 'payPeriod', 'grossIncome', 'incomeTax', 'netIncome', 'super']
    let json2csv = new Json2csv({ header: false, quote: '' })
    let csv = json2csv.parse(json)
    filepath.write(csv + '\n')
  }
  /**
   * Converts JSON into CSV and writes into a file
   */
  writeToFile(json, filepath) {
    filepath.write(json + '\n')
  }
}

module.exports = () => {
  return new Utility()
}