enum errorMessages {
  ERROR_400_PRODUCT_NULL = 'Товар не доступен к покупке.',
  ERROR_400_PRODUCT_NOT_FOUND = 'Указанные товары не найдены.',
  ERROR_400_ORDER_WRONG_TOTAL = 'Стоимость заказа не соответствует стоимости товаров.',
  ERROR_400_ORDER_UNKNOWN_ERROR = 'Неизвестная ошибка заказа.',
  ERROR_404_ROUTING = 'Маршрут не найден.',
  ERROR_409_PRODUCT_EXSISTS = 'Ошибка добавления товара. Товар с таким названием существует.',
  ERROR_500_GET_PRODUCTS = 'Ошибка получения списка товаров.',
}

export default errorMessages;
