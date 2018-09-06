const fs = require('fs')
const csv = require('csv')
// const inputFile = require('../../files/payroll.csv')
const inputFile = '../../files/payroll.csv'
const outputFile = '../../files/payroll.out'
const options = {
  delimiter: ',',
  rowDelimiter: '\n',
  quote: null,
  columns: 5
}

let readStream = fs.createReadStream(inputFile)
let writeStream = fs.createWriteStream(outputFile)

readStream
  .pipe(csv())
  .on('data', ()=> {
    console.log(`<<< Parsed data: ${data}`)
  })
  .on('headers', (headerList) => {
    console.log(`<<< First header: ${headerList[0]}`)
  })
  .on('end', ()=> {
    console.log(`<<< Done`)
  })