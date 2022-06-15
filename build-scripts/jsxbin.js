const jsxbin = require( 'jsxbin' )
const path = require('path')
const dirname = path.resolve()
const packageName = process.env.npm_package_name;

console.log('Making a binary file...')
jsxbin(`${dirname}\\dist\\${packageName}.jsx`)