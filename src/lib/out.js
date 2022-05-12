const chalk = require('chalk')

/**
 * Clear the console
 */
const cls = console.clear

/**
 * Log to the console screen
 * @param {*} obj - Object to log
 */
const log = (obj) => { console.log(chalk.yellow(obj)) }

/**
 * Text display in danger color
 * @param {*} obj - Object to modify
 * @returns {string} 
 */
const danger = (obj) => chalk.red(obj)

/**
 * Text display in success color
 * @param {*} obj - Object to modify
 * @returns {string}
 */
const success = (obj) => chalk.green(obj)

/**
 * Text display in bold
 * @param {*} obj - Object to modify
 * @returns {string}
 */
const important = (obj) => chalk.bold(obj)

/**
 * Text display in italic
 * @param {*} obj - Object to modify
 * @returns {string}
 */
const name = (obj) => chalk.italic(obj)

exports.cls = cls
exports.log = log
exports.danger = danger
exports.success = success
exports.important = important
exports.name = name