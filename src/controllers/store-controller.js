const createError = require('../utils/createError') 
const {prisma} = require('../models') 
const cloudinary = require("../config/cloudinary");
const fs = require("fs/promises")

exports.listStore = async (req, res, next) => {
    try {
        const store = await prisma.store.findMany({
            where:{
                status:'ACTIVE'
            },
            select:{
                id:true,
                name:true,
                address:true,
                profileImage:true,
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
                profileImage:true,
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
                address:true,
                profileImage:true,
            }
        })
        res.json(store)
    } catch (error) {
        next(error)
    }
}

exports.editPhotoStore = async (req, res, next) => {
    try {
        const promisUrl = await cloudinary.uploader.upload(req.file.path)
        const photo = promisUrl.secure_url
        const store = await prisma.store.update({
            where:{
                userId:req.user.user.userId
            },
            data:{
                profileImage:photo
            }
        })
        res.json({message : 'Edit photo success'})
    } catch (error) {
        next(error)
    }finally{
        await fs.unlink(req.file.path)
    }
}

exports.searchStores = async (req,res,next) =>{
    try {
        const searchQuery = req.query.search?.toLowerCase()  || ''

        const filterStores = await prisma.store.findMany({
            where:{
                name:{
                    contains:searchQuery
                }
            }
        })

        res.json(filterStores)
    } catch (error) {
        next(error)
    }
} 