const createError = require('../utils/createError') 
const {prisma} = require('../models') 

exports.addOrder = async(req,res,next) =>{
    try {
        if(req.user.user.role !== 'CUSTOMER'){
            return createError(400,"Not Customer")
        }
        const {totalPrice,items} = req.body
        const order = await prisma.order.create({
            data:{
                totalPrice:totalPrice,
                status:"PENDING",
                userId:req.user.user.userId,
                storeId:+req.params.storeId
            }
        })
        const orderItems = await prisma.orderItem.createMany({
            data:items.map(item => ({
                orderId:order.id,
                menuId:+item.menuId,
                quantity:item.quantity
            }))
        })
        res.json({message : "Add Order Success",order})
    } catch (error) {
        next(error)
    }
}

exports.myCustomerOrder = async(req,res,next) =>{
    try {
        if(req.user.user.role !== 'CUSTOMER'){
            return createError(400,"Not Customer")
        }

        const order = await prisma.order.findMany({
            where:{
                userId:req.user.user.userId
            },include:{
                orderItem:{
                    include:{
                        menu:true
                    }
                },
                store:true,
            }
        })
        res.json({order})
    } catch (error) {
        next(error)
    }
}

exports.myOwnerOrder = async(req,res,next) =>{
    try {
        if(req.user.user.role !== 'OWNER'){
            return createError(400,"Not Owner")
        }

        const store = await prisma.store.findUnique({
            where:{
                userId:req.user.user.userId
            }
        })
        const order = await prisma.order.findMany({
            where:{
                storeId:store.id
            },include:{
                orderItem:{
                    include:{
                        menu:true
                    }
                },
                store:true,
                user:true,
            }
        })
        res.json(order)
    } catch (error) {
        next(error)
    }
}

exports.myOrder = async(req,res,next) =>{
    try {
        if(req.user.user.role !== 'CUSTOMER'){
            return createError(400,"Not Customer")
        }
        const order = await prisma .order.findUnique({
            where:{
                id:+req.params.orderId
            },
            include:{
                orderItem:{
                    include:{
                        menu:true
                    }
                },
                store:true,
            }
        })
        res.json({order})
    } catch (error) {
        next(error)
    }
}

exports.changeStatusToDone = async(req,res,next) =>{
    try {
        const {id} =req.body
        if(req.user.user.role !== 'OWNER'){
            return createError(400,"Not Owner")
        }
        const order = await prisma.order.update({
            where:{
                id:+id
            },
            data:{
                status:"DONE"
            }
        })

        res.json({message : 'Change Status Success'})
    } catch (error) {
        next(error)
    }
}
exports.changeStatusToCancel = async(req,res,next) =>{
    try {
        const {id} =req.body
        if(req.user.user.role !== 'OWNER'){
            return createError(400,"Not Owner")
        }
        const order = await prisma.order.update({
            where:{
                id:+id
            },
            data:{
                status:"CANCEL"
            }
        })

        res.json({message : 'Change Status Success'})
    } catch (error) {
        next(error)
    }
}
exports.changeStatusToConfirm = async(req,res,next) =>{
    try {
        const {id} =req.body
        console.log(req.user.user);
        if(req.user.user.role !== 'CUSTOMER'){
            return createError(400,"Not Customer")
        }
        const order = await prisma.order.update({
            where:{
                id:+id
            },
            data:{
                status:"CONFIRM"
            }
        })

        res.json({message : 'Change Status Success'})
    } catch (error) {
        next(error)
    }
}