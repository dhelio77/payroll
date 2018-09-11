'use strict'

const configSettings = {
  'local': {
    'files': {
      'inputfile': '/files/payroll.csv',
      'outputfile': '/payroll.out',
      'errorfile': '/payroll.err'
    },
    'parseOptions': {
      'delimiter': ',',
      'auto_parse': true
    },
    'monthsInAYear': 12,
    'tax': {
      'bracket2': [0, 19, 18200],
      'bracket3': [3572, 32.5, 37000],
      'bracket4': [19822, 37, 87000],
      'bracket5': [54232, 45, 180000]
    },
    'regex': {
      'haspercentage': /\d%$/
    }
  }
}

const config = configSettings[process.env.APP_ENV || 'local']
module.exports = config