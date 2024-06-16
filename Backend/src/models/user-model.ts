import Joi from 'joi'

export const registerSchema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
})

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
})

export const autoLoginSchema = Joi.object({
	email: Joi.string().email().required(),
})
