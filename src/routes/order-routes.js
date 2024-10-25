const { addOrder, myCustomerOrder, myOrder, myOwnerOrder, changeStatusToDone, changeStatusToCancel, changeStatusToConfirm } = require('../controllers')
const { authenticate } = require('../middlewares')
const {express} = require('../models')
const router = express.Router()

router.post('/add/:storeId',authenticate,addOrder)
router.get('/customer-order',authenticate,myCustomerOrder)
router.get('/my-order/:orderId',authenticate,myOrder)
router.get('/owner-order',authenticate,myOwnerOrder)
router.patch('/done',authenticate,changeStatusToDone)
router.patch('/cancel',authenticate,changeStatusToCancel)
router.patch('/confirm',authenticate,changeStatusToConfirm)

module.exports = router