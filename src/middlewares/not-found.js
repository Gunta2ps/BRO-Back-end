const notFoundHandler = (req, res, next) => {
    return res.status(404).json({message : "Not found Path!!!!"})
}

module.exports = notFoundHandler