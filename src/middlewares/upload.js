const multer = require("multer");

const upload = multer({dest:"src/uploads"})

module.exports = upload

