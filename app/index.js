'use strict'

const path = require('path')
const config = require('./config/config')
const filepath = path.resolve(path.join(__dirname, config.files.inputfile))
const parser = require('./src/Parser')(filepath)
const validator = require('./src/Validator')()

validator.validateFile(filepath)
  .then((result) => {
    if (result && result.code && result.code === 200) {
      console.log(`<<< Filepath validation result: ${JSON.stringify(result)}`)
      parser.process()
        .then((res) => {
          console.log(`<<< Succesful payroll processing: ${res}`)
        })
        .catch((err) => {
          console.log(`<<< Failed payroll processing: ${err}`)
        })
    }
  })
  .catch((error) => {
    console.error(`<<< ERROR: Filepath validation!: ${JSON.stringify(error)}`)
  })
