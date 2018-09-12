'use strict'

const fs = require('fs')
const path = require('path')
const parse = require('csv-parse')
const config = require('../config/config')
const util = require('./Utility')()

class Parser {
  constructor(inputFile) {
    this.inputFile = inputFile
    this.parseOptions = config.parseOptions
    this.employee = require('./Employee')()
    this.validator = require('./Validator')()
    this.payrollfile = fs.createWriteStream(path.resolve(path.join(path.dirname(this.inputFile), config.files.outputfile)), { 'flag': 'a' })
    this.errorfile = fs.createWriteStream(path.resolve(path.join(path.dirname(this.inputFile), config.files.errorfile)), { 'flag': 'a' })
  }
  /**
   * This is the main process that parses the csv file.
   * 1. It validates every fields
   * 2. Calls the Employee instance that calculates the payroll 
   */
  process() {
    let self = this
    let parser = null
    let summary = null
    console.log(`<<< Parsing CSV File...`)
    return new Promise((resolve, reject) => {
      let ctr = 0
      parser = parse(self.parseOptions, (err, data) => {
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
                // if (result && result.fault && result.fault.length > 0) {
                //   console.log(`<<< Invalid fields: ${JSON.stringify(result.fault)}`)
                //   util.writeToFile(JSON.stringify(result.fault), self.errorfile)
                // } else {
                //   /**
                //    * This calls employee processor to calculate payroll
                //    */
                //   self.employee.process(payroll)
                //     .then((paysummary) => {
                //       console.log(`<<< Payroll summary result: ${JSON.stringify(paysummary)}`)
                //       util.writeToCsv(paysummary, self.payrollfile)
                //       resolve(200)
                //     })
                //     .catch((error) => {
                //       console.error(`<<< Error in processing payroll summary: ${JSON.stringify(error)}`)
                //       reject(error)
                //     })
                // }
                if (result && result.code === 200) {
                  /**
                   * This calls employee processor to calculate payroll
                   */
                  self.employee.process(payroll)
                    .then((paysummary) => {
                      console.log(`<<< Payroll summary result: ${JSON.stringify(paysummary)}`)
                      util.writeToCsv(paysummary, self.payrollfile)
                      resolve(200)
                    })
                    .catch((error) => {
                      console.error(`<<< Error in processing payroll summary: ${JSON.stringify(error)}`)
                      reject(error)
                    })
                } else {
                  console.log(`<<< Invalid fields: ${JSON.stringify(result.fault)}`)
                  util.writeToFile(JSON.stringify(result.fault), self.errorfile)
                }
              })
         })
        }
      })
      /**
       * This receives the input file and converts to stream and pipes it to the parser instance
       */
      fs.createReadStream(self.inputFile).pipe(parser);
    })
  }
}

module.exports = (_inputFile) => {
  return new Parser(_inputFile)
}