'use strict'

const fs = require('fs')
const validator = require('validator')
const config = require('../config/config')
// const errorfile = fs.createWriteStream('payroll.err', { 'flag': 'a' })
// const util = require('./Utility')

class Validator {
  constructor() {

  }
  /**
   * This function accepts the filepath as a string and checks if it's valid.
   * @param {*} filepath 
   */
  async validateFile(filepath) {
    return new Promise((resolve, reject) => {
      fs.stat(filepath, (err, file) => {
        if (err) {
          reject(err)
        }
        resolve(file)
      })
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
    let error = null
    let result = {}
    return new Promise((resolve, reject) => {
      try {
        let firstNameVal = validator.isAlpha(payroll.firstName) ? true : false
        let lastNameVal = validator.isAlpha(payroll.lastName) ? true : false
        let annualSalaryVal = validator.isNumeric(payroll.annualSalary) && Number(payroll.annualSalary) > 0 ? true : false
        let superRate = payroll.superRate.substring(0, payroll.superRate.indexOf('%'))
        let superRateVal = validator.isNumeric(superRate) && config.regex['haspercentage'].test(payroll.superRate) && (Number(superRate) >= 0 && Number(superRate) <= 50) ? true : false
        if (firstNameVal && lastNameVal && annualSalaryVal && superRateVal) {
          result.code = 200
          result.desc = 'All fields are valid'
          resolve(result)
        } else {
          result.code = 401
          result.desc = 'All or some fields are not valid'
          let fault = {}
          fault.ctr = payroll.ctr
          if (!firstNameVal) { fault.invalidFirstname = `${payroll.firstName}` }
          if (!lastNameVal) { fault.invalidLastname = `${payroll.lastName}` }
          if (!annualSalaryVal) { fault.invalidAnnualSalary = `${payroll.annualSalary}` }
          if (!superRateVal) { fault.invalidSuperRate = `${payroll.superRate}` }
          result.fault = fault
          resolve(result)
        }
      } catch (err) {
        error = new Error('Validator')
        error.code = 500
        error.desc = 'ERROR'
        reject(error)
      }
    })
  }
}

module.exports = () => {
  return new Validator()
} 