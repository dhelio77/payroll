'use strict'

const configSettings = {
  'local': {
    'files': {
      'inputfile': '/files/payroll.csv',
      'outputfile': '/payroll.out',
      'faultyfields': '/payroll.invalid',
      'loggerfile': '/payroll.log',
      'errorfile': '/payroll.err',
      'inputfileCtr': 'ctr',
      'inputfileFields': ['firstName', 'lastName', 'annualSalary', 'superRate', 'payPeriod']
    },
    'parseOptions': {
      'delimiter': ',',
      'auto_parse': true
    },
    'monthsInAYear': 12,
    'percentage': 100,
    'taxBracket': [
      { 'to': 18200, 'baseAmt': 0, 'percent': 0, 'over': 0 },
      { 'to': 37000, 'baseAmt': 0, 'percent': 19, 'over': 18200 },
      { 'to': 87000, 'baseAmt': 3572, 'percent': 32.5, 'over': 37000 },
      { 'to': 180000, 'baseAmt': 19822, 'percent': 37, 'over': 87000 },
      { 'to': Infinity, 'baseAmt': 54232, 'percent': 45, 'over': 180000 }
    ],
    'regex': {
      'haspercentage': /\d%$/
    },
    'writeStreamOptions': {
      'flag': 'a'
    }
  }
}

const config = configSettings[process.env.APP_ENV || 'local']
module.exports = config