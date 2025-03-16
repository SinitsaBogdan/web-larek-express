import { Joi } from 'celebrate';

export const orderBodyValidation = Joi.object().keys({
    payment: Joi.string().valid('card', 'online').required().messages({
        'any.required': 'Поле payment обязательное.',
        'any.only':
      'Поле payment должно передавать один из параметров:card или online.',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Поле email должно быть валидным.',
        'any.required': 'Поле email обязательное.',
    }),
    phone: Joi.string()
        .regex(/\+[0-9]+\s\(\d\d\d\)\s\d\d\d\s\d\d\s\d\d/i)
        .required()
        .messages({
            'string.pattern.base':
        'Поле телефона должно соответствовать паттерну +7 (999) 999-99-99.',
            'any.required': 'Поле phone обязательное.',
        }),
    address: Joi.string().required(),
    total: Joi.number().min(1).required().messages({
        'number.min': 'Нельзя оформить бесплатный заказ.',
    }),
    items: Joi.array().items(Joi.string()).required(),
});

export const productBodyValidation = Joi.object().keys({
    title: Joi.string().min(2).max(30).required()
        .messages({
            'string.min': 'Поле title должно быть минимум 2 символа.',
            'string.max': 'Поле title должно быть максимум 30 символов.',
            'any.required': 'Поле title обязательное.',
        }),
    image: Joi.object()
        .required()
        .messages({
            'any.required': 'Поле image обязательное',
        })
        .keys({
            fileName: Joi.string().required().messages({
                'any.required': 'Поле fileName обязательное.',
            }),
            originalName: Joi.string().required().messages({
                'any.required': 'Поле originalName обязательное.',
            }),
        }),
    category: Joi.string().min(2).max(30).required()
        .messages({
            'string.min': 'Поле category должно быть минимум 2 символа.',
            'string.max': 'Поле category должно быть максимум 30 символов.',
            'any.required': 'Поле category обязательное',
        }),
    description: Joi.string().min(2).max(100).required()
        .messages({
            'string.min': 'Поле description должно быть минимум 2 символа.',
            'string.max': 'Поле description должно быть максимум 100 символов.',
            'any.required': 'Поле description обязательное.',
        }),
    price: Joi.number(),
});
