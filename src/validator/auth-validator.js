const Joi = require('joi')
const createError = require('../utils/createError')

const registerSchema = Joi.object({
    email: Joi.string().email({ tlds: false }).required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,}$/).required().messages({
        'string.pattern.base': 'Password must be at least 6 characters long and contain only letters and numbers',
        'any.required': 'Password is required'
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).strip().messages({
        'any.only': 'Passwords do not match',
        'any.required': 'Confirm password is required'
    }),
    username: Joi.string().required().trim().messages({
        'any.required': 'Username is required',
        'string.empty': 'Username cannot be empty'
    }),
    storeName: Joi.string().required().trim().messages({
        'any.required': 'Store name is required',
        'string.empty': 'Store name cannot be empty'
    }),
    address: Joi.string().required().trim().messages({
        'any.required': 'Address is required',
        'string.empty': 'Address cannot be empty'
    }),
    firstName: Joi.string().required().trim().messages({
        'any.required': 'First name is required',
        'string.empty': 'First name cannot be empty'
    }),
    lastName: Joi.string().required().trim().messages({
        'any.required': 'Last name is required',
        'string.empty': 'Last name cannot be empty'
    }),
    categoryRestaurantId: Joi.number().required().messages({
        'any.required': 'Category restaurant ID is required',
        'number.base': 'Category restaurant ID must be a number'
    }),
    phone: Joi.string().pattern(/^[0-9]{10}$/).messages({
        'string.pattern.base': 'Phone number must be 10 digits'
    })
})

const registerCustomerSchema = Joi.object({
    email: Joi.string().email({ tlds: false }).required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,}$/).required().messages({
        'string.pattern.base': 'Password must be at least 6 characters long and contain only letters and numbers',
        'any.required': 'Password is required'
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).strip().messages({
        'any.only': 'Passwords do not match',
        'any.required': 'Confirm password is required'
    }),
    username: Joi.string().required().trim().messages({
        'any.required': 'Username is required',
        'string.empty': 'Username cannot be empty'
    }),
    firstName: Joi.string().required().trim().messages({
        'any.required': 'First name is required',
        'string.empty': 'First name cannot be empty'
    }),
    lastName: Joi.string().required().trim().messages({
        'any.required': 'Last name is required',
        'string.empty': 'Last name cannot be empty'
    }),
    phone: Joi.string().pattern(/^[0-9]{10}$/).messages({
        'string.pattern.base': 'Phone number must be 10 digits'
    })
})

const editProfileSchema = Joi.object({
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,}$/).required().messages({
        'string.pattern.base': 'Password must be at least 6 characters long and contain only letters and numbers',
        'any.required': 'Password is required'
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).strip().messages({
        'any.only': 'Passwords do not match',
        'any.required': 'Confirm password is required'
    }),
    firstName: Joi.string().required().trim().messages({
        'any.required': 'First name is required',
        'string.empty': 'First name cannot be empty'
    }),
    lastName: Joi.string().required().trim().messages({
        'any.required': 'Last name is required',
        'string.empty': 'Last name cannot be empty'
    }),
    phone: Joi.string().pattern(/^[0-9]{10}$/).messages({
        'string.pattern.base': 'Phone number must be 10 digits'
    })
})

const editProfileOwnerSchema = Joi.object({
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,}$/).required().messages({
        'string.pattern.base': 'Password must be at least 6 characters long and contain only letters and numbers',
        'any.required': 'Password is required'
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).strip().messages({
        'any.only': 'Passwords do not match',
        'any.required': 'Confirm password is required'
    }),
    storeName: Joi.string().required().trim().messages({
        'any.required': 'Store name is required',
        'string.empty': 'Store name cannot be empty'
    }),
    address: Joi.string().required().trim().messages({
        'any.required': 'Address is required',
        'string.empty': 'Address cannot be empty'
    }),
    firstName: Joi.string().required().trim().messages({
        'any.required': 'First name is required',
        'string.empty': 'First name cannot be empty'
    }),
    lastName: Joi.string().required().trim().messages({
        'any.required': 'Last name is required',
        'string.empty': 'Last name cannot be empty'
    }),
    phone: Joi.string().pattern(/^[0-9]{10}$/).messages({
        'string.pattern.base': 'Phone number must be 10 digits'
    })
})

const loginSchema = Joi.object({
    identity: Joi.alternatives().try(
        Joi.string().email({ tlds: false }),
        Joi.string().trim()
    ).required().messages({
        'any.required': 'Email or username is required',
        'string.empty': 'Email or username cannot be empty'
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,}$/).required().messages({
        'any.required': 'Password is required',
        'string.pattern.base': 'Password must be at least 6 characters long and contain only letters and numbers'
    }),
})

exports.registerValidator=(req,res,next)=>{
    const {email,categoryRestaurantId,password,confirmPassword,firstName,lastName,username,phone,storeName,address} = req.body

        if(!storeName || !address){
            const {value,error} = registerCustomerSchema.validate({email,password,confirmPassword,firstName,lastName,username,phone})
            if(error){
                return createError(400, error.details[0].message)
            }
            req.input = value
            next()
        }else{
            const {value,error} = registerSchema.validate({email,categoryRestaurantId,password,confirmPassword,firstName,lastName,username,phone,storeName,address})
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


