'use strict'

const fs = require('fs')
const path = require('path')
const parse = require('csv-parse')
const config = require('../config/config')
const Json2csv = require('json2csv').Parser

class Parser {
  constructor(inputFile) {
    this.inputFile = inputFile
    this.options = config.parseOptions
    this.employee = require('./Employee')()
    this.validator = require('./Validator')()
    this.outputfile = path.join(path.dirname(this.inputFile), config.files.outputfile)
    this.payrollfile = fs.createWriteStream(path.resolve(path.join(path.dirname(this.inputFile), config.files.outputfile)), { 'flag': 'a' })
  }
  /**
   * 
   */
  process() {
    let self = this
    let parser = null
    let summary = null
    console.log(`<<< Parsing CSV File...`)
    return new Promise((resolve, reject) => {
      let ctr = 0
      parser = parse(self.options, (err, data) => {
        if (err) {
          console.log(`<<< Error in processing csv file: ${err}`)
          reject(err)
        } else {
          console.log(`<<< Processing Employee Record...`)
          /**
           * Process each record when all fields are available
           * Note: There is no header so there's no line to skip thus line starts at 0
           */
          data.forEach((line) => {
            ctr++
            /**
             * Create employee object out of parsed fields
             */
            let payroll = {
              "ctr": ctr,
              "firstName": line[0].toString(),
              "lastName": line[1].toString(),
              "annualSalary": line[2].toString(),
              "superRate": line[3].toString(),
              "payPeriod": line[4].toString()
            }
            console.log(`<<< payroll record: ${JSON.stringify(payroll)}`)
            self.validator.validateFields(payroll)
              .then((result) => {
                // console.log(`<<< Validation return: ${JSON.stringify(result)}`)
                if (result && result.code === 200) {
                  /**
                   * This calls employee processor to calculate payroll
                   */
                  self.employee.process(payroll)
                    .then((paysummary) => {
                      console.log(`<<< Payroll summary result: ${JSON.stringify(paysummary)}`)
                      this.writeToCsv(paysummary)
                      resolve(200)
                    })
                    .catch((error) => {
                      console.error(`<<< Error in processing payroll summary: ${JSON.stringify(error)}`)
                      reject(error)
                    })
                } else {
                  console.log(`<<< Invalid fields: ${JSON.stringify(result.faults)}`)
                }
              })
              .catch((error) => {
                console.log(`<<< Error in validating fields: ${JSON.stringify(error)}`)
              })
          })
        }
      })
      let writeToFile = (paysummary) => {
        this.payrollfile.write(JSON.stringify(paysummary))
      }
      /**
       * Reads the inputFile and feed the contents to the parser through the pipe
       */
      fs.createReadStream(self.inputFile).pipe(parser);
    })
  }
  /**
   * Converts JSON into CSV and writes into a file
   */
  writeToCsv(json) {
    const fields = ['name', 'payPeriod', 'grossIncome', 'incomeTax', 'netIncome', 'super']
    const json2csv = new Json2csv({ data: json, header: false, quote: '' })
    let csv = json2csv.parse(json)
    this.payrollfile.write(csv+'\n')
  }
}

module.exports = (_inputFile) => {
  return new Parser(_inputFile)
}