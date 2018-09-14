'use strict'

const fs = require('fs')
const path = require('path')
const parse = require('csv-parse')
const config = require('../config/config')
const util = require('./Utility')()
const log = require('../lib/logger')

class Parser {
  constructor(inputFile) {
    this.inputFile = inputFile
    this.parserOptions = config.parserOptions
    this.file = config.files
    this.writeStreamOptions = config.writeStreamOptions
    this.validator = require('./Validator')()
    this.employee = require('./Employee')()
    this.payrollfile = fs.createWriteStream(path.resolve(path.join(path.dirname(this.inputFile), this.file.outputfile)), this.writeStreamOptions)
    this.faultyfields = fs.createWriteStream(path.resolve(path.join(path.dirname(this.inputFile), this.file.faultyfields)), this.writeStreamOptions)
  }
  /**
   * This is the main process that parses the csv file.
   * 1. It validates every fields
   * 2. Calls the Employee instance that calculates the payroll 
   */
  process() {
    let self = this
    let parser = null
    log.info(`<<< Parsing CSV File...`)
    return new Promise((resolve, reject) => {
      let ctr = 0
      parser = parse(self.parserOptions, (err, data) => {
        if (err) {
          log.error(`<<< Error in processing csv file: ${err}`)
          reject(err)
        } else {
          log.info(`<<< Processing Employee Record...`)
          /**
           * Process each record when all fields are available
           * Note: There is no header so there's no line to skip thus line starts at 0
           */
          data.forEach((line) => {
            ctr++
            /**
             * Create employee object out of parsed fields
             */
            let payroll = util.preparePayroll(line, ctr)
            log.info(`<<< payroll record: ${JSON.stringify(payroll)}`)
            /**
             * This function validates every fields in the file.
             * If a field is invalid, the record will not be process for payroll calculation and error file will be generated.
             */
            self.validator.validateFields(payroll)
              .then((result) => {
                if (result && result.fault && result.fault.ctr && result.fault.ctr !== undefined) {
                  log.info(`<<< Invalid fields: ${JSON.stringify(result.fault)}`)
                  util.writeToFile(JSON.stringify(result.fault), self.faultyfields)
                } else {
                  /**
                   * This calls employee processor to calculate payroll
                   */
                  self.employee.process(payroll)
                    .then((paysummary) => {
                      log.info(`<<< Payroll summary result: ${JSON.stringify(paysummary)}`)
                      util.writeToCsv(paysummary, self.payrollfile)
                      resolve(paysummary)
                    })
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