'use strict'

console.log(`<<< testing regex: haspercentage`)
const config = require('../../app/config/config')['regex']
const str1 = '1%'
console.log(config.haspercentage.test(str1))

console.log(`<<< testing validator npm`)
const validator = require('validator')
let name = 'Rodelio3'
let numeric1 = '123A'
let numeric2 = '-123'
console.log(validator.isAlpha(name))
console.log(validator.isNumeric(numeric1))
console.log(validator.isNumeric(numeric2))

console.log(`<<< testing length`)
let errors = {}
errors.firstName = 'Invalid'
console.log(errors === null)

console.log(`<<< testing object isEmpty`)
let obj = {}
console.log(!Object.keys(obj).length === 0)

console.log(`<<< testing Infinity`)
console.log(Infinity)