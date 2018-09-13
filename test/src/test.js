'use strict'

log.info(`<<< testing regex: haspercentage`)
const config = require('../../app/config/config')['regex']
const str1 = '1%'
log.info(config.haspercentage.test(str1))

log.info(`<<< testing validator npm`)
const validator = require('validator')
let name = 'Rodelio3'
let numeric1 = '123A'
let numeric2 = '-123'
log.info(validator.isAlpha(name))
log.info(validator.isNumeric(numeric1))
log.info(validator.isNumeric(numeric2))

log.info(`<<< testing length`)
let errors = {}
errors.firstName = 'Invalid'
log.info(errors === null)

log.info(`<<< testing object isEmpty`)
let obj = {}
log.info(!Object.keys(obj).length === 0)

log.info(`<<< testing Infinity`)
log.info(Infinity)

log.info(`<<< testing array`)
let payroll = {}
let fields = ['firstName', 'lastName', 'annualSalary', 'superRate', 'payPeriod']
log.info(fields.length)
payroll.ctr = 1
for (let p = 0; p < fields.length; p++) {
  log.info(fields[p])
  payroll.fields[p] = data[p]
}
log.info(JSON.stringify(payroll))