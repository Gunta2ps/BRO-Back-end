const authRouter = require('./auth-route')
const categoryRouter = require('./category-route')
const storeRouter = require('./store-route')
const menuRouter = require('./menu-route')
const adminRouter = require('./admin-routes')
const orderRouter = require('./order-routes')
const paymentRouter = require('./paymnet-routes')

module.exports = {paymentRouter,authRouter,categoryRouter,storeRouter,menuRouter,adminRouter,orderRouter}