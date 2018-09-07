'use strict'

class Payroll {
  constructor() {
    this.config = require('../config/config')
  }

  /**
   * This function accepts the annual salary and calculates the gross income.
   * @param {*} annualSalary 
   */
  calculateGrossIncome(annualSalary) {
    let self = this
    return Math.round(annualSalary / self.config.monthsInAYear)
  }

  /**
   * This function accepts the annual salary and calculates the income tax.
   * Checks the salary to determine the tax bracket.
   * Note: The tax bracket is configurable and set in the config file.
   * @param {*} annualSalary 
   */
  calculateIncomeTax(annualSalary) {
    let self = this
    let taxParam = self.config.tax
    if (annualSalary > 0 && annualSalary <= 18200) {              // taxable income bracket 1
      return 0
    } else if (annualSalary > 18201 && annualSalary <= 37000) {   // taxable income bracket 2
      return self.getTax(annualSalary, taxParam['bracket2'])
    } else if (annualSalary > 37001 && annualSalary <= 87000) {   // taxable income bracket 3
      return self.getTax(annualSalary, taxParam['bracket3'])
    } else if (annualSalary > 87001 && annualSalary <= 180000) {  // taxable income bracket 4
      return self.getTax(annualSalary, taxParam['bracket4'])
    } else if (annualSalary > 180000) {                           // taxable income bracket 5
      return self.getTax(annualSalary, taxParam['bracket5'])
    }
  }

  /**
   * This function accepts both gross income and super rate and returns the super amount.
   * @param  {...any} params 
   */
  calculateSuper(...params) {
    let [grossIncome, superRate] = params
    return Math.round(grossIncome * (superRate / 100))
  }

  /**
   * This function is the helper function of the calculateIncomeTax function.
   * This function accepts the annual salary, tax constant, percent and over.
   * @param {*} annualSalary 
   * @param {*} params 
   */
  getTax(annualSalary, params) {
    let [constant, percent, over] = params
    return Math.round((constant + (annualSalary - over) * (percent / 100)) / 12)
  }
}

module.exports = () => {
  return new Payroll()
}