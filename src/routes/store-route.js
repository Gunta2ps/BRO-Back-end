const {express} = require('../models')
const router = express.Router()
const {listStore, myStore, showStore} = require('../controllers')
const { authenticate } = require('../middlewares')

router.get('/',listStore)
router.get('/my-store',authenticate,myStore)
router.get('/:storeId',showStore)

module.exports = router