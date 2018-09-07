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
   * @param {*} employee 
   */
  process(employee) {
    let self = this
    console.log(`<<< Processing Employee Record...`)
    return new Promise((resolve, reject) => {
      let paysummary = {}
      paysummary['name'] = `${employee.firstName} ${employee.lastName}`
      paysummary['payPeriod'] = `${employee.startDate}`
      paysummary['grossIncome'] = self.payroll.calculateGrossIncome(employee.annualSalary)
      paysummary['incomeTax'] = self.payroll.calculateIncomeTax(employee.annualSalary)
      paysummary['netIncome'] = paysummary['grossIncome'] - paysummary['incomeTax']
      paysummary['super'] = self.payroll.calculateSuper(paysummary['grossIncome'], employee.superRate)
      resolve(paysummary)
    })
  }
}

module.exports = () => {
  return new Employee()
}