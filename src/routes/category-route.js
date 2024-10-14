const {express} = require('../models')
const router = express.Router()
const {listCategory} = require('../controllers')

router.get('/',listCategory)

module.exports = router