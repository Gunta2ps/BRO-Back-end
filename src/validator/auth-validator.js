const Joi = require('joi')
const createError = require('../utils/createError')

const registerSchema = Joi.object({
    email:Joi.string().email({ tlds: false }).required().messages({}),
    password:Joi.string().pattern(/^[a-zA-Z0-9]{6,}$/).required(),
    confirmPassword:Joi.string().required().valid(Joi.ref('password')).strip(),
    username:Joi.string().required().trim(),
    storeName:Joi.string().required().trim(),
    address:Joi.string().required().trim(),
    firstName:Joi.string().required().trim(),
    lastName:Joi.string().required().trim(),
    phone:Joi.string().pattern(/^[0-9]{10}$/)
})
const registerCustomerSchema = Joi.object({
    email:Joi.string().email({ tlds: false }).required().messages({}),
    password:Joi.string().pattern(/^[a-zA-Z0-9]{6,}$/).required(),
    confirmPassword:Joi.string().required().valid(Joi.ref('password')).strip(),
    username:Joi.string().required().trim(),
    firstName:Joi.string().required().trim(),
    lastName:Joi.string().required().trim(),
    phone:Joi.string().pattern(/^[0-9]{10}$/)
})

const editProfileSchema = Joi.object({
    password:Joi.string().pattern(/^[a-zA-Z0-9]{6,}$/).required(),
    confirmPassword:Joi.string().required().valid(Joi.ref('password')).strip(),
    firstName:Joi.string().required().trim(),
    lastName:Joi.string().required().trim(),
    phone:Joi.string().pattern(/^[0-9]{10}$/)
})

const editProfileOwnerSchema = Joi.object({
    password:Joi.string().pattern(/^[a-zA-Z0-9]{6,}$/).required(),
    confirmPassword:Joi.string().required().valid(Joi.ref('password')).strip(),
    storeName:Joi.string().required().trim(),
    address:Joi.string().required().trim(),
    firstName:Joi.string().required().trim(),
    lastName:Joi.string().required().trim(),
    phone:Joi.string().pattern(/^[0-9]{10}$/)
})

const loginSchema = Joi.object({
    identity: Joi.alternatives().try(
        Joi.string().email({ tlds: false }),
        Joi.string().trim()
    ).required().messages({
        'any.required': 'Email or username is required',
        'string.empty': 'Email or username cannot be empty'
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,}$/).required(),
})

exports.registerValidator=(req,res,next)=>{
    const {email,password,confirmPassword,firstName,lastName,username,phone,storeName,address} = req.body

        if(!storeName || !address){
            const {value,error} = registerCustomerSchema.validate({email,password,confirmPassword,firstName,lastName,username,phone})
            if(error){
                return createError(400, error.details[0].message)
            }
            req.input = value
            next()
        }else{
            const {value,error} = registerSchema.validate({email,password,confirmPassword,firstName,lastName,username,phone,storeName,address})
            if(error){
                return createError(400, error.details[0].message)
            }
            req.input = value
            next()
        }
}

exports.loginValidator = (req, res, next) => {
    const {value,error} = loginSchema.validate(req.body)
    if(error){
        return createError(400, error.details[0].message)
    }
    req.input = value
    next()
}

exports.editValidator = (req, res, next) => {
    const {password,confirmPassword,firstName,lastName,phone,storeName,address} = req.body

    if(!storeName || !address){
        const {value,error} = editProfileSchema.validate({password,confirmPassword,firstName,lastName,phone})
        if(error){
            return createError(400, error.details[0].message)
        }
        req.input = value
        next()
    }else{
        const {value,error} = editProfileOwnerSchema.validate({password,confirmPassword,firstName,lastName,phone,storeName,address})
        if(error){
            return createError(400, error.details[0].message)
        }
        req.input = value
        next()
    }
}


