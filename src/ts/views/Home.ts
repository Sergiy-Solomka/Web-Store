import { getCart } from "./Cart.js";
import { initHomeBtns } from "../navigation.js";
import { API_URL } from "../config.js";
import { ObjectItem } from "../interfaces.js";
import { ShoppingCartModule } from "../localstorage.js";
import { HomeProductsFilter } from "../filters.js";

const cart = new ShoppingCartModule();
const itemsInCart = cart.showShoppingCart();

const cartContainer = document.querySelector(
  ".home__page-cart-count",
) as HTMLInputElement;

const featuredContainer = document.querySelector(
  ".home__page-content-main",
) as HTMLInputElement;

const getItems = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

const getItemById = async (id: string) => {
  const items = await getItems();
  const item = items.filter((item: { id: string }) => item.id === id).shift();
  cart.saveItem(item);
};

const getHome = async () => {
  const items = await getItems();

  const inCartHtml = `${itemsInCart.length}`;
  const randomProducts = new HomeProductsFilter(items).getHomeProductsFilter();

  const featuredHtml = `
            ${randomProducts
              .map((item: ObjectItem) => {
                return `        
              <div class="home__page-content-main-card home__card" id=${item.id}>
                <div class="home__page-content-main-card-picture">
                  <img class="home__page-content-main-card-img"
                    src=${item.image}
                  />
                </div>
                <div class="home__page-content-main-card-discription">
                  ${item.name}
                </div>
                <div class="home__page-content-main-card-price">$${item.price}</div>
              </div>`;
              })
              .join("\n")}
              `;

  if (cartContainer) {
    cartContainer.innerHTML = inCartHtml;
  }

  if (featuredContainer) {
    featuredContainer.innerHTML = featuredHtml;
  }
  initHomeBtns();
  getCart();
};

getHome();
export { getItemById, getHome, getItems };
