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
    return new Promise((resolve, reject) => {
      let paysummary = {}
      let error = null
      try {
        paysummary['name'] = `${payroll.firstName} ${payroll.lastName}`
        paysummary['payPeriod'] = `${payroll.payPeriod}`
        paysummary['grossIncome'] = self.payroll.calculateGrossIncome(payroll.annualSalary)
        paysummary['incomeTax'] = self.payroll.calculateIncomeTax(payroll.annualSalary)
        paysummary['netIncome'] = paysummary['grossIncome'] - paysummary['incomeTax']
        paysummary['super'] = self.payroll.calculateSuper(paysummary['grossIncome'], payroll.superRate.substring(0, payroll.superRate.indexOf('%')))
        resolve(paysummary)
      } catch(err) {
        error = new Error()
        error.code = 500
        error.desc = `Error in payroll processing`
        reject(error)
      }
    })
  }
}

module.exports = () => {
  return new Employee()
}