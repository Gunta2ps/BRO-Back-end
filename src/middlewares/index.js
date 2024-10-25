const errorHandler = require('./error')
const notFoundHandler = require('./not-found')
const authenticate = require('./authenticate')
const upload = require('./upload')

module.exports = {
    errorHandler,
    notFoundHandler,
    authenticate,
    upload
}