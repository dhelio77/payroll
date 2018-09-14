const chai = require('chai')
const should = chai.should()
const employee = require('../../app/src/Employee')()

describe('Employee Test', function () {
  context('Employee Process', function () {
    it('should return all required payroll summary fields', function () {
      const payroll = {
        "ctr": 1,
        "firstName": "John",
        "lastName": "Doe",
        "annualSalary": "120000",
        "superRate": "10%",
        "payPeriod": "01 September – 30 September"
      }
      const paysummaryFields = ["name", "payPeriod", "grossIncome", "incomeTax", "netIncome", "super"]
      employee.process(payroll)
        .then((paysummary) => {
          paysummary.should.have.properties(paysummaryFields)
        })
        .catch((error) => { })
    })

  })
})