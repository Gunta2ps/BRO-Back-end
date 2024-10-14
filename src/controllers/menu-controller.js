const createError = require('../utils/createError') 
const {prisma} = require('../models') 

exports.listMenu = async(req,res,next) =>{

    try {
        if(req.user.user.role !== 'OWNER'){
            return createError(400,"Not Owner")
        }

        const findStore = await prisma.store.findUnique({
            where:{
                userId:req.user.user.userId
            }
        })

        const menu = await prisma.menu.findMany({
            where:{
              storeId:findStore.id
            },
            select:{
                id:true,
                name:true,
                price:true,
                status:true,
                category:{
                    select:{name:true,id:true,},
                },
            },
        })
        res.json({menu})
    } catch (error) {
        next(error)
    }
}

exports.showAllMenu = async(req,res,next) =>{
    try {
        const storeId = req.params.storeId

        const menu = await prisma.menu.findMany({
            where:{
                storeId:+storeId,
                status:'ACTIVE'
            },select:{
                id:true,
                name:true,
                price:true,
                status:true,
                category:{
                    select:{name:true,id:true,},
                },
            }
        })
        res.json({menu})
    } catch (error) {
        next(error)
    }
}

exports.addMenu = async(req,res,next) =>{
    try {
        const {name,price,categoryId}= req.body
        if(req.user.user.role !== 'OWNER'){
            return createError(400,"Not Owner")
        }

        const findStore = await prisma.store.findUnique({
            where:{
                userId:req.user.user.userId
            }
        })

        const menu = await prisma.menu.create({
            data:{
                name:name,
                price:+price,
                categoryId:+categoryId,
                storeId:findStore.id
            }
        })

        res.json({message : "Add menu success",menu})
    } catch (error) {
        next(error)
    }
}

exports.editMenu = async(req,res,next) =>{
    try {
        const {name,price,categoryId}= req.body
        if(req.user.user.role !== 'OWNER'){
            return createError(400,"Not Owner")
        }

        const findStore = await prisma.store.findUnique({
            where:{
                userId:req.user.user.userId
            }
        })

        const menu = await prisma.menu.update({
            where:{
                id:+req.params.menuId
            },
            data:{
                name:name,
                price:+price,
                categoryId:+categoryId,
            }
        })

        res.json({message : "Edit menu success",menu})
    } catch (error) {
        next(error)
    }
}

exports.changeStatus = async(req,res,next) =>{
    try {
        const {id} = req.body
        if(req.user.user.role !== 'OWNER'){
            return createError(400,"Not Owner")
        }

        const menu = await prisma.menu.findFirst({
            where:{
                id:+id
            }
        })

        if(menu.status === 'ACTIVE'){
            const update = await prisma.menu.update({
                where:{
                    id:menu.id
                },
                data:{
                    status:'INACTIVE'
                }
            })
            res.json({message : "Change To Inactive"})
        }else{
            const update = await prisma.menu.update({
                where:{
                    id:menu.id
                },
                data:{
                    status:'ACTIVE'
                }
            })
            res.json({message :'Change To Active'})
        }
        
    } catch (error) {
        next(error)
    }
}

exports.deleteMenu = async(req,res,next) =>{
    try {
        const id = req.params.menuId
        if(req.user.user.role !== 'OWNER'){
            return createError(400,"Not Owner")
        }

        const menu = await prisma.menu.delete({
            where:{
                id:+id
            }
        })
        
        res.json({message : "Delete menu success"})
    } catch (error) {
        next(error)
    }
}