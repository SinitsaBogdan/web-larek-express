import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import { faker } from '@faker-js/faker';
import errorMessages from '../util/errorMessages';

import Product from '../models/product';

export const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { total, items } = req.body;
    const id = faker.string.uuid();

    let calculateTotal = 0;
    await Promise.all(
        items.map(async (item: string) => {
            const product = await Product.findOne({ _id: item });
            if (product) {
                if (product.price === null) {
                    calculateTotal = 0;
                    const resultError = new MongooseError(
                        errorMessages.ERROR_400_PRODUCT_NULL,
                    );
                    return next(resultError);
                }
                calculateTotal += product.price;
            } else {
                const resultError = new MongooseError(
                    errorMessages.ERROR_400_PRODUCT_NOT_FOUND,
                );
                return next(resultError);
            }
            return calculateTotal;
        }),
    )
        .then(() => {
            if (total !== calculateTotal) {
                const resultError = new MongooseError(
                    errorMessages.ERROR_400_ORDER_WRONG_TOTAL,
                );
                return next(resultError);
            }
            return res.status(201).send({ id, total: calculateTotal });
        })
        .catch(() => {
            const resultError = new MongooseError(
                errorMessages.ERROR_400_ORDER_UNKNOWN_ERROR,
            );
            return next(resultError);
        });
};
