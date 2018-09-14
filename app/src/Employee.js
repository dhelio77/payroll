'use strict'

const config = require('../config/config')

class Employee {
  constructor() {
    this.payroll = require('./Payroll')()
    this.summary = config.files.paySummaryFields
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
    return new Promise((resolve) => {
      paysummary[`${self.summary.name}`] = `${payroll.firstName} ${payroll.lastName}`
      paysummary[`${self.summary.payPeriod}`] = `${payroll.payPeriod}`
      paysummary[`${self.summary.grossIncome}`] = self.payroll.calculateGrossIncome(payroll.annualSalary)
      paysummary[`${self.summary.incomeTax}`] = self.payroll.calculateIncomeTax(payroll.annualSalary)
      paysummary[`${self.summary.netIncome}`] = paysummary['grossIncome'] - paysummary['incomeTax']
      paysummary[`${self.summary.super}`] = self.payroll.calculateSuper(paysummary['grossIncome'], payroll.superRate.substring(0, payroll.superRate.indexOf('%')))
      resolve(paysummary)
    })
  }
}

module.exports = () => {
  return new Employee()
}