require('dotenv').config()
const {express,morgan,cors,app} = require('./models')
const {errorHandler,notFoundHandler} = require('./middlewares')
const {authRouter, categoryRouter, storeRouter, menuRouter, adminRouter, orderRouter, paymentRouter} = require('./routes')

app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
    origin:'http://localhost:5173',
    method:['GET','POST','PATCH','PUT','DELETE'],
    credentials:true,
}))

app.use('/auth',authRouter)
app.use('/category',categoryRouter)
app.use('/store',storeRouter)
app.use('/menu',menuRouter)
app.use('/admin',adminRouter)
app.use('/order',orderRouter)
app.use('/payment',paymentRouter)

app.use(errorHandler)
app.use('*',notFoundHandler)

const port = process.env.PORT
app.listen(port,() => console.log(`Server run on Port : ${port}`))