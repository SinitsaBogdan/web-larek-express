import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { orderBodyValidation } from '../middlewares/validatons';
import { createOrder } from '../controllers';

const userOrderValidator = celebrate({
    [Segments.BODY]: orderBodyValidation,
});

export const router = Router();

router.post('/', userOrderValidator, createOrder);
