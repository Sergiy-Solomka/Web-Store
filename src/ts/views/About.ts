import { getCart } from "./Cart.js";
import { ShoppingCartModule } from "../localstorage.js";

const cart = new ShoppingCartModule();
const itemsInCart = cart.showShoppingCart();

const cartContainer = document.querySelector(
  ".about__page-cart-count",
) as HTMLInputElement;

const getAbout = () => {
  const aboutHtml = `${itemsInCart.length}`;
  if (cartContainer) {
    cartContainer.innerHTML = aboutHtml;
  }
  getCart();
};

getAbout();

export { getAbout };
