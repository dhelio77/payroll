'use strict'

const config = require('../config/config')

class Payroll {
  constructor() { }

  /**
   * This function accepts the annual salary and calculates the gross income.
   * @param {*} annualSalary 
   */
  calculateGrossIncome(annualSalary) {
    return Math.round(annualSalary / config.monthsInAYear)
  }
  /**
   * This function accepts the annual salary and calculates the income tax.
   * Checks the salary to determine the tax bracket.
   * Note: The tax bracket is configurable and set in the config file.
   * @param {*} annualSalary 
   */
  calculateIncomeTax(annualSalary) {
    let tax = config.taxBracket
    for (let t = 0; t <= tax.length; t++) {
      if (annualSalary <= tax[t].to) {
        return Math.round((tax[t].baseAmt + (annualSalary - tax[t].over) * (tax[t].percent / config.percentage)) / config.monthsInAYear)
      }
    }
  }
  /**
   * This function accepts both gross income and super rate and returns the super amount.
   * @param  {...any} params 
   */
  calculateSuper(...params) {
    let [grossIncome, superRate] = params
    return Math.round(grossIncome * (superRate / config.percentage))
  }
}

module.exports = () => {
  return new Payroll()
}