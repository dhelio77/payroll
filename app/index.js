'use strict'

const path = require('path')
const filename = 'payroll.csv'
const csvPath = path.resolve(path.join(__dirname, 'files', filename))
const parser = require('./src/Parser')(csvPath);
parser.process()
.then((res)=>{
  console.log(`<<< Succesful payroll processing: ${res}`)
})
.catch((err)=>{
  console.log(`<<< Failed payroll processing: ${err}`)
})