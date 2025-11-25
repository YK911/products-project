import { CART_LS } from "./js/constants";
import { updateCartCount } from "./js/helpers";
import { getProductById } from "./js/products-api";
import { cartTotalItems, cartTotalPrice } from "./js/refs";
import { renderAllProduct, renderCartSummary } from "./js/render-function";
import { loadLocalStorage } from "./js/storage";

//Логіка сторінки Cart
init();
async function init() {
  const storageCart = loadLocalStorage(CART_LS) || [];
  if (storageCart.length === 0) return;
  updateCartCount(storageCart.length);
  const response = await Promise.all(storageCart.map(getProductById));
  const productsList = response.map(({ data }) => data);
  const totalPrice = productsList.reduce((total, { price }) => {
    return (total += price);
  }, 0);
  renderAllProduct(productsList);
  renderCartSummary(productsList.length, cartTotalItems);
  renderCartSummary(totalPrice, cartTotalPrice);
}
