import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import errorMessages from '../util/errorMessages';

import Product from '../models/product';

export const getProducts = (req: Request, res: Response, next: NextFunction) => Product.find({})
    .then((products) => {
        res.send({ items: products, total: products.length });
    })
    .catch(() => {
        const resultError = new MongooseError(
            errorMessages.ERROR_500_GET_PRODUCTS,
        );
        next(resultError);
    });

export const createProduct = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const {
        title, description, image, category, price,
    } = req.body;

    return Product.create({
        title,
        description,
        image,
        category,
        price,
    })
        .then((product) => res.status(201).send({ item: product }))
        .catch((err) => {
            const resultError = new MongooseError(err.message);
            return next(resultError);
        });
};
