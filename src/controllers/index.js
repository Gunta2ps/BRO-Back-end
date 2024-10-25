const { listStoreAdmin, adminChangeStatusStore, adminDeleteStore, listMenuAdmin, adminChangeStatusMenu, adminDeleteMenu, listUserAdmin, adminChangeStatusUser, adminDeleteUser, adminOrderList } = require('./admin-crontroller')
const {register,login,getUser, editProfile, editPhoto} = require('./auth-controller')
const {listCategory, listCategoryRestaurant} = require('./category-controller')
const { listMenu, showAllMenu, addMenu, editMenu, changeStatus, deleteMenu, previewPhoto } = require('./menu-controller')
const {listStore, myStore, showStore, editPhotoStore, searchStores} = require('./store-controller')
const {addOrder, myCustomerOrder, myOrder, myOwnerOrder, changeStatusToDone, changeStatusToCancel, changeStatusToConfirm} = require('./order-controller')
const { getConfig, createPayment } = require('./payment-controller')

module.exports = {
    register,login,getUser,editProfile,editPhoto,
    listCategory,listCategoryRestaurant,
    listStore,myStore,showStore,editPhotoStore,searchStores,
    listMenu,showAllMenu,addMenu,editMenu,changeStatus,deleteMenu,previewPhoto,
    listStoreAdmin,adminChangeStatusStore,adminDeleteStore,
    listMenuAdmin,adminChangeStatusMenu,adminDeleteMenu,
    listUserAdmin,adminChangeStatusUser,adminDeleteUser,
    adminOrderList,
    getConfig,createPayment,
    addOrder,myCustomerOrder,myOrder,myOwnerOrder,changeStatusToDone,changeStatusToCancel,
    changeStatusToConfirm
}