const {express} = require('../models')
const router = express.Router()
const {register,login,getUser, editProfile, editPhoto} = require('../controllers')
const {registerValidator,loginValidator, editValidator} = require('../validator/auth-validator')
const {authenticate,upload} = require('../middlewares')

router.post('/register',registerValidator,register)
router.post('/login',loginValidator,login)

router.get('/get-user',authenticate,getUser)

router.patch('/edit',authenticate,editValidator,editProfile)
router.patch('/edit/photo',authenticate,upload.single("file"),editPhoto)

module.exports = router