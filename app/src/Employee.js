'use strict'

class Employee {
  constructor() {
    this.payroll = require('./Payroll')()
  }
  /**
   * This function process the call to calculate the payroll fields:
   * 1. gross income
   * 2. income tax
   * 3. net income
   * 4. super
   * @param {*} payroll 
   */
  process(payroll) {
    let self = this
    let paysummary = {}
    return new Promise((resolve, reject) => {
      try {
        paysummary['name'] = `${payroll.firstName} ${payroll.lastName}`
        paysummary['payPeriod'] = `${payroll.payPeriod}`
        paysummary['grossIncome'] = self.payroll.calculateGrossIncome(payroll.annualSalary)
        paysummary['incomeTax'] = self.payroll.calculateIncomeTax(payroll.annualSalary)
        paysummary['netIncome'] = paysummary['grossIncome'] - paysummary['incomeTax']
        paysummary['super'] = self.payroll.calculateSuper(paysummary['grossIncome'], payroll.superRate.substring(0, payroll.superRate.indexOf('%')))
        resolve(paysummary)
      } catch (error) {
        log.error(`<<< ERROR: ${error}`)
        reject(error)
      }
    })
  }
}

module.exports = () => {
  return new Employee()
}