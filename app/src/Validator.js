'use strict'

const validator = require('validator')

class Validator {
  constructor() {
    this.fs = require('fs')
    this.config = require('../config/config')
  }
  /**
   * This function accepts the filepath as a string and checks if it's valid.
   * @param {*} filepath 
   */
  validateFile(filepath) {
    let self = this
    return new Promise((resolve, reject) => {
      let result = {}
      let error = null
      try {
        self.fs.stat(filepath, (err, file) => {
          if (!err && file.isFile()) {
            result.code = 200
            result.desc = 'Valid file or directory'
            resolve(result)
          }
          if (err && err.code === 'ENOENT') {
            result.code = 404
            result.desc = 'No such file or directory'
            reject(result)
          }
        })
      } catch (err) {
        error = new Error()
        error.code = 500
        error.desc = 'Error processing the filepath'
        reject(error)
      }
    })
  }
  /**
   * This function validate every fields in the file.
   * 1. firstname and lastname must be alpha
   * 2. annual salary must be positive integer
   * 3. super rate must be between 0% and 50% and must have the '%'
   * 4. pay period is alpha numeric
   * @param {*} payroll 
   */
  validateFields(payroll) {
    let self = this
    let error = null
    let result = {}
    return new Promise((resolve, reject) => {
      try {
        let firstNameVal = validator.isAlpha(payroll.firstName) ? true : false
        let lastNameVal = validator.isAlpha(payroll.lastName) ? true : false
        let annualSalaryVal = validator.isNumeric(payroll.annualSalary) && Number(payroll.annualSalary) > 0 ? true : false
        let superRate = payroll.superRate.substring(0, payroll.superRate.indexOf('%'))
        let superRateVal = validator.isNumeric(superRate) && self.config.regex['haspercentage'].test(payroll.superRate) && (Number(superRate) >= 0 && Number(superRate) <= 50) ? true : false
        // console.log(`<<< ${firstNameVal}:${lastNameVal}:${annualSalaryVal}:${superRateVal}`)
        if (firstNameVal && lastNameVal && annualSalaryVal && superRateVal) {
          result.code = 200
          result.desc = 'All fields are valid'
          resolve(result)
        } else {
          result.code = 401
          result.desc = 'All or some fields are not valid'
          let faults = []
          let fault = {}
          fault.ctr = `${payroll.ctr}`
          if (!firstNameVal) { fault.invalidFirstname = `${payroll.firstName}` }
          if (!lastNameVal) { fault.invalidLastname = `${payroll.lastName}` }
          if (!annualSalaryVal) { fault.invalidAnnualSalary = `${payroll.annualSalary}` }
          if (!superRateVal) { fault.invalidSuperRate = `${payroll.superRate}` }
          faults.push(fault)
          result.faults = faults
          resolve(result)
        }
      } catch (err) {
        error = new Error()
        error.code = 500
        error.desc = 'Error in validating fields'
        reject(error)
      }
    })
  }
}

module.exports = () => {
  return new Validator()
}