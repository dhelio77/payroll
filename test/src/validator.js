const chai = require('chai')
const should = chai.should()
const validator = require('../../app/src/Validator')()

describe('Validator Test', function () {
  context('Validate File', function () {
    it('should return true for valid filepath', function () {
      const filepath = '/Users/rodelioancheta/Workspace/myob/payroll/app/files/payroll.csv'
      validator.validateFile(filepath)
        .then((result) => {
          result.should.equal(true, 'Filepath do not exist or not a directory')
        })
    })

    it('should return error for invalid filepath', function () {
      const filepath = '/Users/rodelioancheta/Workspace/myob/payroll/app/file/payroll.csv'
      validator.validateFile(filepath)
        .then((result) => {
          result.should.equal(false, 'Filepath do not exist or not a directory')
        })
    })
  })

  context('Validate Fields', function () {
    it('should return valid for payload without faulty fields', function () {
      const payroll = {
        "ctr": 1,
        "firstName": "John",
        "lastName": "Doe",
        "annualSalary": "90000",
        "superRate": "9%",
        "payPeriod": "01 September – 30 September"
      }
      validator.validateFields(payroll)
        .then((result) => {
          result.should.not.be.eql({"fault":{"ctr":0}}, 'Some or all fields are invalid')
        })
        .catch((error) => { })
    })

    it('should return invalid for payload with faulty fields', function () {
      const payroll = {
        "ctr": 1,
        "firstName": "John1",
        "lastName": "Doe",
        "annualSalary": "90000A",
        "superRate": "9",
        "payPeriod": "01 September – 30 September"
      }
      validator.validateFields(payroll)
        .then((result) => {
          result.should.be.eql({"fault":{"ctr":1}}, 'Some or all fields are invalid')
        })
        .catch((error) => { })
    })
  })
})