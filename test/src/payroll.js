const chai = require('chai')
const should = chai.should()
const payroll = require('../../app/src/Payroll')()

describe('Payroll Test', function () {
  context('Testing calculation of gross income', function () {
    it('should return correct calculated gross income', function () {
      const annualSalary = 120000
      const expected = 10000
      payroll.calculateGrossIncome(annualSalary)
        .should.equal(expected, 'Incorrect calculation of gross income')
    })
  })
})