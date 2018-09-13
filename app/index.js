'use strict'

const path = require('path')
const config = require('./config/config')
const filepath = path.resolve(path.join(__dirname, config.files.inputfile))
const parser = require('./src/Parser')(filepath)
const validator = require('./src/Validator')()

let myob = async () => {
  try {
    await validator.validateFile(filepath)
    await parser.process(filepath)
  } catch (error) {
    log.error(`<<< ERROR: ${error}`)
  } 
}
myob()