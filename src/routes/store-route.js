const {express} = require('../models')
const router = express.Router()
const {listStore, myStore, showStore, editPhotoStore, searchStores} = require('../controllers')
const { authenticate, upload } = require('../middlewares')

router.get('/',listStore)
router.get('/my-store',authenticate,myStore)
router.get('/search',searchStores)
router.get('/:storeId',showStore)

router.patch('/edit/photo',authenticate,upload.single("file"),editPhotoStore)

module.exports = router