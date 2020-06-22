const fs = require('fs');
const path = require('path');
const {statement} = require('./utils')

const invoices = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'invoices.json')));
for (const invoice of invoices){
    fs.writeFileSync(path.resolve(__dirname, 'result.txt'), statement(invoice))
}




