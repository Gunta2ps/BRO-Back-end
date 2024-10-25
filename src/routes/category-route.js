const {express} = require('../models')
const router = express.Router()
const {listCategory, listCategoryRestaurant} = require('../controllers')

router.get('/',listCategory)
router.get('/restaurant',listCategoryRestaurant)

module.exports = router