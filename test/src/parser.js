let fs = require('fs')
let parse = require('csv-parse')
let inputFile = 'test/src/payroll.csv'
console.log(`<<< Processing Employee Payroll...`);

const options = {
    'delimiter': ',',
    'auto_parse': true,
    // 'rowDelimiter': '\n',
    // 'quote': null,
    // 'columns': 5,
    // 'raw': true,
    // 'cast': true
    'quoting': false
}

let parser = parse(function (err, data) {
    // when all countries are available,then process them
    // note: array element at index 0 contains the row of headers that we should skip
    data.forEach(function (line) {
        // create country object out of parsed fields
        let employee = {
            "firstName": line[0],
            "lastName": line[1],
            "annualSalary": line[2],
            "superRate": line[3],
            "startDate": line[4]
        };
        console.log(JSON.stringify(employee));
    });
});

// read the inputFile, feed the contents to the parser
fs.createReadStream(inputFile).pipe(parser);