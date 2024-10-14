const createError = require('../utils/createError') 
const {prisma} = require('../models') 

exports.listStoreAdmin = async (req,res,next) =>{
    try {
        if(req.user.user.role !== 'ADMIN'){
            return createError(400,"Not Admin")
        }
        const store = await prisma.store.findMany({})

        res.json({store})
    } catch (error) {
        next(error)
    }
}

exports.adminChangeStatusStore = async (req,res,next) =>{
    try {
        const {id} = req.body
        if(req.user.user.role !== 'ADMIN'){
            return createError(400,"Not Admin")
        }
        const store = await prisma.store.findUnique({
            where:{
                id:+id
            }
        })

        if(store.status === 'ACTIVE'){
            await prisma.store.update({
                where:{
                    id:store.id
                },
                data:{
                    status:'INACTIVE'
                }
            })
            res.json({message : "Change To Inactive"})
        }else{
            await prisma.store.update({
                where:{
                    id:store.id
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

exports.adminDeleteStore = async (req,res,next) =>{
    try {
        const id = req.params.storeId
        if(req.user.user.role !== 'ADMIN'){
            return createError(400,"Not Admin")
        }
        const store = await prisma.store.delete({
            where:{
                id:+id
            }
        })

        res.json({message : "Delete store success"})
    } catch (error) {
        next(error)
    }
}

exports.listUserAdmin = async (req,res,next) =>{
    try {
        if(req.user.user.role !== 'ADMIN'){
            return createError(400,"Not Admin")
        }

        const user = await prisma.user.findMany({})
        res.json({user})
    } catch (error) {
        next(error)
    }
}
exports.adminChangeStatusUser = async (req,res,next) =>{
    try {
        if(req.user.user.role !== 'ADMIN'){
            return createError(400,"Not Admin")
        }
        const {id} = req.body
        const user = await prisma.user.findUnique({
            where:{
                id:+id
            }
        })

        if(user.status === 'ACTIVE'){
            await prisma.user.update({
                where:{
                    id:user.id
                },
                data:{
                    status:'INACTIVE'
                }
            })
            res.json({message : "Change To Inactive"})
        }else{
            await prisma.user.update({
                where:{
                    id:user.id
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
exports.adminDeleteUser = async (req,res,next) =>{
    try {
        const id = req.params.userId
        if(req.user.user.role !== 'ADMIN'){
            return createError(400,"Not Admin")
        }
        const user = await prisma.user.delete({
            where:{
                id:+id
            }
        })

        res.json({message : "Delete user success"})
    } catch (error) {
        next(error)
    }
}
exports.listMenuAdmin = async (req,res,next) =>{
    try {
        if(req.user.user.role !== 'ADMIN'){
            return createError(400,"Not Admin")
        }
        const menu = await prisma.menu.findMany({
            select:{
                id:true,
                name:true,
                price:true,
                status:true,
                category:{
                    select:{
                        name:true,
                        id:true
                    }
                },
                store:{
                    select:{
                        name:true,
                        id:true
                    }
                }
            }
        })

        res.json({menu})
    } catch (error) {
        next(error)
    }
}
exports.adminChangeStatusMenu = async (req,res,next) =>{
    try {
        const {id} = req.body
        if(req.user.user.role !== 'ADMIN'){
            return createError(400,"Not Admin")
        }
        const menu = await prisma.menu.findUnique({
            where:{
                id:+id
            }
        })

        if(menu.status === 'ACTIVE'){
            await prisma.menu.update({
                where:{
                    id:menu.id
                },
                data:{
                    status:'INACTIVE'
                }
            })
            res.json({message :'Change To Inactive'})
        }else{
            await prisma.menu.update({
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
exports.adminDeleteMenu = async (req,res,next) =>{
    try {
        const id = req.params.menuId
        if(req.user.user.role !== 'ADMIN'){
            return createError(400,"Not Admin")
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