'use strict'

class Employee {
  constructor() {
    this.payroll = require('./Payroll')()
  }
  process(employee) {
    let self = this
    console.log(`<<< Processing Employee Record...`)
    return new Promise((resolve, reject) => {
      let payroll = {}
      console.log(`<<< Employee Record: ${JSON.stringify(employee)}`)

      payroll['name'] = `${employee.firstName} ${employee.lastName}`
      payroll['payPeriod']= `${employee.startDate}`
      payroll['grossIncome'] = self.payroll.calculateGrossIncome(employee.annualSalary)
      payroll['incomeTax'] = self.payroll.calculateIncomeTax(employee.annualSalary)
      payroll['netIncome'] = payroll['grossIncome'] - payroll['incomeTax']
      payroll['super'] = self.payroll.calculateSuper(payroll['grossIncome'], employee.superRate)
      resolve(payroll)
    })
  }
}

module.exports = () => {
  return new Employee()
}