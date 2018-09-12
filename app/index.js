'use strict'

const path = require('path')
const config = require('./config/config')
const filepath = path.resolve(path.join(__dirname, config.files.inputfile))
const parser = require('./src/Parser')(filepath)
const validator = require('./src/Validator')()

async function myob() {
  try {
    let validate = await validator.validateFile(filepath)
    let parse = await parser.process(filepath)
  } catch (error) {
    console.log(`<<< ERROR: ${error}`)
  } 
}
myob()