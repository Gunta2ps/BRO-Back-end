const {listMenu, showAllMenu, addMenu, editMenu, changeStatus, deleteMenu} = require('../controllers')
const { authenticate } = require('../middlewares')
const {express} = require('../models')
const router = express.Router()

router.get('/',authenticate,listMenu)
router.get('/:storeId',showAllMenu)

router.post('/add',authenticate,addMenu)
router.patch('/:menuId',authenticate,editMenu)
router.patch('/status/menu',authenticate,changeStatus)
router.delete('/delete/:menuId',authenticate,deleteMenu)

module.exports = router