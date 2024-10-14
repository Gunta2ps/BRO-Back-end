require('dotenv').config()
const {express,morgan,cors,app} = require('./models')
const {errorHandler,notFoundHandler} = require('./middlewares')
const {authRouter, categoryRouter, storeRouter, menuRouter, adminRouter} = require('./routes')

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/auth',authRouter)
app.use('/category',categoryRouter)
app.use('/store',storeRouter)
app.use('/menu',menuRouter)
app.use('/admin',adminRouter)

app.use(errorHandler)
app.use('*',notFoundHandler)

const port = process.env.PORT
app.listen(port,() => console.log(`Server run on Port : ${port}`))