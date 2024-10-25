const createError = require('../utils/createError') 
const {bcrypt,prisma,jwt} = require('../models') 
const cloudinary = require("../config/cloudinary");
const fs = require("fs/promises")

exports.register = async (req, res, next) => {
    try {
        const data = req.input
        
        const existsUser = await prisma.user.findUnique({
            where:{
                email: data.email
            }
        })

        if(existsUser){
            return createError(409, 'Email already exists')
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)
        

        if(!data.address){

            const newUser = await prisma.user.create({data:{
                email: data.email,
                password: hashedPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                phone: data.phone,
                role:'CUSTOMER'
            }})

            res.status(201).json({message : 'Customer created successfully'})
        }else{
            const newUser = await prisma.user.create({data:{
                email: data.email,
                password: hashedPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                phone: data.phone,
                role:'OWNER'
            }})
            const newStore = await prisma.store.create({data:{name:data.storeName, address:data.address, categoryRestaurantId: +data.categoryRestaurantId, userId:newUser.id}})

            res.status(201).json({message : 'Owner & Store created successfully'})
        }
    

    } catch (error) {
        next(error)
    }
}
exports.login = async (req, res, next) => {
    try {
        const data = req.input

        if(!(data.identity.trim()&&data.password.trim())){
            return createError(400,"Please fill data")
        }
        let identityKey = ''
        if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.identity)){
            identityKey = 'email'
        }else{
            identityKey = 'username'
        }

        if(!identityKey){
            return createError(400,"Only Email or Username")
        }

        const findUser = await prisma.user.findUnique({
            where:{
                [identityKey]: data.identity
            }
        })

        if(!findUser){
            return createError(404, 'User not found')
        }

        if(findUser.status === 'INACTIVE'){
            return createError(404,'User not found')
        }

        let isMatch = await bcrypt.compare(data.password, findUser.password)
        if(!isMatch){
            return createError(400, 'Wrong password')
        }

        const payload = {
            user:{role: findUser.role, 
                userId: findUser.id,
                username:findUser.username,
                email: findUser.email,
                firstName:findUser.firstName,
                lastName:findUser.lastName,
                profileImage:findUser.profileImage,
            }
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'30d'})

        const result = {user:payload,token:token}

        res.status(200).json({result})

    } catch (error) {
        next(error)
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = req.user.user
        const member = await prisma.user.findUnique({
            where:{
                email : user.email
            },
            select:{
                id:true,
                email:true,
                username:true,
                role:true,
                firstName:true,
                lastName:true,
                phone:true,
                profileImage:true,
            }
        })
        res.status(200).json({member})
    } catch (error) {
        next(error)
    }
}

exports.editProfile = async (req, res, next) => {
    try {
        const data = req.input
        const user = req.user.user
        const hashedPassword = await bcrypt.hash(data.password, 10)
         if(!data.address || !data.storeName){
            
            const member = await prisma.user.update({
                where:{
                    id:user.userId
                },
                data:{ firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                    password: hashedPassword }
            })
            res.status(200).json({Message : 'Edit profile success'})
         }else{


            const member = await prisma.user.update({
                where:{
                    id:user.userId
                },
                data:{ firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                    password:hashedPassword}
            })

            const storeMember = await prisma.store.update({
                where:{
                    userId:user.userId
                },
                data:{ name: data.storeName,
                    address: data.address }
            })

            res.status(200).json({Message : 'Edit profile success'})
         }
        
    } catch (error) {
        next(error)
    }
}

exports.editPhoto = async (req, res, next) => {
    try {
        const promiseUrl = await cloudinary.uploader.upload(req.file.path);
        const photo = promiseUrl.secure_url
        const user = await prisma.user.update({
            where:{
                id:req.user.user.userId
            },
            data:{
                profileImage:photo
            }
        })
        res.json({message : 'Edit photo success'})
    } catch (error) {
        next(error)
    }    finally{
        await fs.unlink(req.file.path)
    }

}