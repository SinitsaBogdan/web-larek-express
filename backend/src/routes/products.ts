import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { productBodyValidation } from '../middlewares/validatons';
import { getProducts, createProduct } from '../controllers';

const productBodyValidator = celebrate({
    [Segments.BODY]: productBodyValidation,
});

export const router = Router();

router.get('/', getProducts);
router.post('/', productBodyValidator, createProduct);
