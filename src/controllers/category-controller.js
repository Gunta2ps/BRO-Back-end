const createError = require('../utils/createError') 
const {prisma} = require('../models') 

exports.listCategory = async (req,res,next) =>{
    try {
        const category = await prisma.category.findMany({
            select:{
                name:true,
                id:true,
            }
        })
        res.json(category)
    } catch (error) {
        next(error)
    }
}
exports.listCategoryRestaurant = async (req,res,next) =>{
    try {
        const category = await prisma.categoryRestaurant.findMany({
            select:{
                name:true,
                id:true,
            }
        })
        res.json(category)
    } catch (error) {
        next(error)
    }
}

