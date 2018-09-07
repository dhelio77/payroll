'use strict'

class Payroll {
  constructor() {
    this.config = require('../config/config')
  }

  calculateGrossIncome(annualSalary) {
    let self = this
    return Math.round(annualSalary / self.config.monthsInAYear)
  }

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

  calculateSuper(...params) {
    let [grossIncome, superRate] = params
    return Math.round(grossIncome * (superRate / 100))
  }

  getTax(annualSalary, params) {
    let [constant, percent, over] = params
    console.log(`${annualSalary}:${constant}:${percent}:${over}`)
    return Math.round((constant + (annualSalary - over) * (percent / 100)) / 12)
  }
}

module.exports = () => {
  return new Payroll()
}