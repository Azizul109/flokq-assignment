// validation/schemas.js
const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 50 characters'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password is required'
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required'
  }),
});

const partSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Part name is required',
    'string.min': 'Part name must be at least 2 characters long'
  }),
  brand: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Brand is required',
    'string.min': 'Brand must be at least 2 characters long'
  }),
  price: Joi.number().positive().precision(2).required().messages({
    'number.positive': 'Price must be a positive number',
    'number.base': 'Price must be a valid number'
  }),
  stock: Joi.number().integer().min(0).required().messages({
    'number.min': 'Stock cannot be negative',
    'number.integer': 'Stock must be a whole number'
  }),
  category: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Category is required',
    'string.min': 'Category must be at least 2 characters long'
  }),
  description: Joi.string().max(500).optional().allow(''),
  image_url: Joi.string().uri().optional().allow('').messages({
    'string.uri': 'Image URL must be a valid URL'
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  partSchema,
};