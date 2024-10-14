const errorHandler = require('./error')
const notFoundHandler = require('./not-found')
const authenticate = require('./authenticate')

module.exports = {
    errorHandler,
    notFoundHandler,
    authenticate
}