const createError = require('../utils/createError') 
const {prisma} = require('../models') 

exports.listStore = async (req, res, next) => {
    try {
        const store = await prisma.store.findMany({
            where:{
                status:'ACTIVE'
            },
            select:{
                id:true,
                name:true,
                address:true
            }
        })
        res.json(store)
    } catch (error) {
        next(error)
    }
}

exports.myStore = async (req, res, next) => {
    try {
        if(req.user.user.role !== 'OWNER'){
            return createError(400,"Not Owner")
        }

        const store = await prisma.store.findUnique({
            where:{
                userId:req.user.user.userId
            },
            select:{
                name:true,
                address:true,
            },
        })
        res.json(store)
    } catch (error) {
        next(error)
    }
}

exports.showStore = async (req, res, next) => {
    try {
        const storeId = req.params.storeId

        const store = await prisma.store.findUnique({
            where:{
                id:+storeId
            },
            select:{
                name:true,
                address:true
            }
        })
        res.json(store)
    } catch (error) {
        next(error)
    }
}