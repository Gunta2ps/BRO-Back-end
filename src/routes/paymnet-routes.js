const { getConfig, createPayment } = require('../controllers')
const {express} = require('../models')
const router = express.Router()

router.get('/config',getConfig)
router.post('/create-payment-intent',createPayment)

module.exports = router