const { listStoreAdmin, adminChangeStatusStore, adminDeleteStore, listUserAdmin, adminChangeStatusUser, adminDeleteUser, listMenuAdmin, adminChangeStatusMenu, adminDeleteMenu, adminOrderList } = require('../controllers')
const { authenticate } = require('../middlewares')
const {express} = require('../models')
const router = express.Router()

router.get('/store',authenticate,listStoreAdmin)
router.patch('/store/status',authenticate,adminChangeStatusStore)
router.delete('/store/:storeId',authenticate,adminDeleteStore)

router.get('/user',authenticate,listUserAdmin)
router.patch('/user/status',authenticate,adminChangeStatusUser)
router.delete('/user/:userId',authenticate,adminDeleteUser)

router.get('/menu',authenticate,listMenuAdmin)
router.patch('/menu/status',authenticate,adminChangeStatusMenu)
router.delete('/menu/:menuId',authenticate,adminDeleteMenu)

router.get('/order',authenticate,adminOrderList)

module.exports = router