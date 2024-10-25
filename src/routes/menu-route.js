const {listMenu, showAllMenu, addMenu, editMenu, changeStatus, deleteMenu, previewPhoto} = require('../controllers')
const { authenticate, upload } = require('../middlewares')
const {express} = require('../models')
const router = express.Router()

router.get('/',authenticate,listMenu)
router.get('/:storeId',showAllMenu)

router.post('/photo',authenticate,upload.single('file'),previewPhoto)
router.post('/add',authenticate,addMenu)
router.patch('/:menuId',authenticate,editMenu)
router.patch('/status/menu',authenticate,changeStatus)
router.delete('/delete/:menuId',authenticate,deleteMenu)


module.exports = router