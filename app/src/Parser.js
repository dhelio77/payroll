'use strict'

const fs = require('fs')
const parse = require('csv-parse')
const config = require('../config/config')

class Parser {
    constructor(inputFile) {
        this.inputFile = inputFile
        this.options = config.parseOptions
        this.payroll = require('./Employee')()
    }
    process() {
        let self = this
        console.log(`<<< Parsing CSV File...`);
        return new Promise((resolve, reject) => {
            let parser = parse(self.options, (err, data) => {
                if (err) {
                    console.log(`<<< Error in processing csv file: ${err}`)
                    reject(err)
                } else {
                    /**
                     * When all fields are available then process them.
                     * Note: There is no header so there's no line to skip thus line starts at 0
                     */
                    data.forEach((line) => {
                        /**
                         * Create employee object out of parsed fields
                         */
                        self.employee = {
                            "firstName": line[0],
                            "lastName": line[1],
                            "annualSalary": line[2],
                            "superRate": line[3].substring(0, line[3].indexOf('%')),
                            "payPeriod": line[4]
                        }
                        self.payroll.process(self.employee)
                            .then((result) => {
                                console.log(`<<< result: ${JSON.stringify(result)}`)
                                resolve('200')
                            })
                            .catch((error) => {
                                console.error(`<<< error: ${error}`)
                                reject('500')
                            })
                    })
                }
            })
            // read the inputFile, feed the contents to the parser
            fs.createReadStream(self.inputFile).pipe(parser);
        })
    }
}

module.exports = (_inputFile) => {
    return new Parser(_inputFile)
}