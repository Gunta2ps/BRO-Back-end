const { listStoreAdmin, adminChangeStatusStore, adminDeleteStore, listMenuAdmin, adminChangeStatusMenu, adminDeleteMenu, listUserAdmin, adminChangeStatusUser, adminDeleteUser } = require('./admin-crontroller')
const {register,login,getUser, editProfile} = require('./auth-controller')
const {listCategory} = require('./category-controller')
const { listMenu, showAllMenu, addMenu, editMenu, changeStatus, deleteMenu } = require('./menu-controller')
const {listStore, myStore, showStore} = require('./store-controller')

module.exports = {
    register,login,getUser,editProfile,
    listCategory,
    listStore,myStore,showStore,
    listMenu,showAllMenu,addMenu,editMenu,changeStatus,deleteMenu,
    listStoreAdmin,adminChangeStatusStore,adminDeleteStore,
    listMenuAdmin,adminChangeStatusMenu,adminDeleteMenu,
    listUserAdmin,adminChangeStatusUser,adminDeleteUser
}