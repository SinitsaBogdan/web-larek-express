import 'dotenv/config';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { errors } from 'celebrate';
import { errorLogger, requestLogger } from './middlewares/logger';
import { errorHandler } from './middlewares';

import { productsRouter, ordersRouter } from './routes';

const { PORT, DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek' } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use(errors());
app.use(requestLogger);

app.use('/product', productsRouter);
app.use('/order', ordersRouter);

app.use(errorHandler);
app.use(errorLogger);

app.use(express.static(path.resolve('./public')));

const server = async () => {
    try {
        await mongoose.connect(DB_ADDRESS);
        app.listen(PORT, () => {
            console.log('listening on port 3000');
        });
    } catch (error) {
        console.log('Неизвестная ошибка');
    }
};

server();
