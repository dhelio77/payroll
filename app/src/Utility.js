'use strict'

const Json2csv = require('json2csv').Parser
const config = require('../config/config')

class Utility {
  constructor() { }
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
  /**
   * This function prepares the input file fields into an object.
   * All the fields are configurable and are extracted from config file.
   * @param {} data 
   * @param {*} ctr 
   */
  preparePayroll(data, ctr) {
    let payroll = {}
    let fields = config.files.inputfileFields
    payroll.ctr = ctr
    for (let p = 0; p < fields.length; p++) {
      let field = fields[p]
      let value = data[p].toString()
      payroll[field] = value
    }
    return payroll
  }
}

module.exports = () => {
  return new Utility()
}