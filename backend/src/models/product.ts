import { model, Schema } from 'mongoose';

interface IImage {
  fileName: string;
  originalName: string;
}

interface IProduct {
  title: string;
  image: IImage;
  category: string;
  description: string;
  price: number | null;
}

const productSchema = new Schema<IProduct>(
    {
        title: {
            type: String,
            required: [true, 'Поле title должно быть заполнено'],
            minlength: [2, 'Минимальная длина поля "title" - 2'],
            maxlength: [30, 'Максимальная длина поля "title" - 30'],
            unique: true,
        },
        image: {
            type: { fileName: String, originalName: String },
            required: true,
        },
        category: {
            type: String,
            required: [true, 'Поле category должно быть заполнено'],
            minlength: [2, 'Минимальная длина поля "category" - 2'],
            maxlength: [30, 'Максимальная длина поля "category" - 30'],
        },
        description: {
            type: String,
            required: [true, 'Поле description должно быть заполнено'],
            minlength: [2, 'Минимальная длина поля "description" - 2'],
            maxlength: [100, 'Максимальная длина поля "description" - 100'],
        },
        price: {
            type: Number,
            required: false,
            default: null,
        },
    },
    { versionKey: false },
);

export default model<IProduct>('product', productSchema);
