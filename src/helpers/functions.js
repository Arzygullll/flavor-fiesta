// функция для получения данных из хранилища под ключом cart
export const getLocalStorage = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return cart;
};
// функция для подсчета стоимости за одну позицию
export const calcSubPrice = (elem) => {
  return elem.count * Number(elem.item.price);
};

export const calcTotalPrice = (products) => {
  const totalPrice = products.reduce((acc, curr) => {
    if (curr.subPrice === 0) {
      return Number(acc) + Number(curr.item.price);
    } else {
      return Number(acc) + Number(curr.subPrice);
    }
  }, 0);
  console.log(
    totalPrice,
    "totalPricetotalPricetotalPricetotalPricetotalPricetotalPricetotalPricetotalPricetotalPricetotalPricetotalPricetotalPricetotalPrice"
  );
  return totalPrice;
};
// функция для вывода кол-во товаров в корзине
export const getProductsCountInCart = () => {
  let cart = getLocalStorage();
  return cart ? cart.products.length : 0;
};
