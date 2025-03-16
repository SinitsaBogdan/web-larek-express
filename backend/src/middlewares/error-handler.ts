import { ErrorRequestHandler } from 'express';
import { Error as MongooseError } from 'mongoose';
import { isCelebrateError } from 'celebrate';
import {
    BadRequestError,
    ConflictError,
    NotFoundError,
    DefaultError,
} from '../errors';
import errorMessages from '../util/errorMessages';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (isCelebrateError(err)) {
        let errMessage = err.message;
        const errDetails = err.details;
        for (const key of errDetails.keys()) {
            const errorKey = errDetails.get(key);
            if (errorKey && errorKey.details && errorKey.details.length > 0) {
                const errorMessage = errorKey.details[0].message;
                errMessage = errorMessage;
            }
        }

        const resultError = new BadRequestError(errMessage);
        return res
            .status(resultError.statusCode)
            .json({ message: resultError.message });
    }

    if (Object.values(errorMessages).includes(err.message)) {
        const resultError = new BadRequestError(err.message);
        return res
            .status(resultError.statusCode)
            .json({ message: resultError.message });
    }

    if (err.message.includes('E11000')) {
        const resultError = new ConflictError(
            errorMessages.ERROR_409_PRODUCT_EXSISTS,
        );
        return res
            .status(resultError.statusCode)
            .json({ message: resultError.message });
    }

    if (
        Object.values(errorMessages).includes(err.message)
    || err.name === 'ValidatorError'
    ) {
        const resultError = new DefaultError(err.message);
        return res
            .status(resultError.statusCode)
            .json({ message: resultError.message });
    }

    if (
        err.name === 'CastError'
    || err instanceof MongooseError.ValidationError
    ) {
        const resultError = new NotFoundError(err.message);
        return res
            .status(resultError.statusCode)
            .json({ message: resultError.message });
    }
    return res
        .status(err.statusCode || 500)
        .json({ message: err.message || 'Internal Server Error' });
};
