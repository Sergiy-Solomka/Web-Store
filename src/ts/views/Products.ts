import { initProdBtns } from "../navigation.js";
import { FilterPreferences, ObjectItem } from "../interfaces.js";
import { getCart } from "./Cart.js";
import {
  API_URL,
  INIT_SEARCHED_NAME,
  INIT_SEARCHED_PRICE,
  INIT_SEARCHED_TYPE,
} from "../config.js";
import { ShoppingCartModule } from "../localstorage.js";
import { CompanyPriceFilter, SearchInputDetect } from "../filters.js";

const prodContainer = document.querySelector(
  ".products__page-content-main",
) as HTMLInputElement;

const cartContainer = document.querySelector(
  ".products__page-cart-count",
) as HTMLInputElement;

const getItems = async () => {
  try {
    const cache = await caches.open("items-cache");
    let response = await cache.match(API_URL);
    if (!response) {
      response = await fetch(API_URL);
      cache.put(API_URL, response.clone());
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const filterPref: FilterPreferences = {
  type: INIT_SEARCHED_TYPE,
  price: INIT_SEARCHED_PRICE,
  name: INIT_SEARCHED_NAME,
};

const getProducts = async () => {
  try {
    const items = await getItems();
    const cart = new ShoppingCartModule();
    const itemsInCart = cart.showShoppingCart();
    const inCartHtml = `${itemsInCart.length}`;

    if (cartContainer) {
      cartContainer.innerHTML = inCartHtml;
    }

    const filter = new CompanyPriceFilter();
    const filteredItems = filter.applyFilters(items, filterPref);

    const prodListHtml = `${filteredItems
      .map((item: ObjectItem) => {
        return `        
      <div class="products__page-content-main-card product__card" id=${item.id}>
        <div class="products__page-content-main-card-picture">
          <img class="home__page-content-main-card-img"
            src=${item.image}
          />
        </div>
        <div class="products__page-content-main-card-discription">
          ${item.name}
        </div>
        <div class="products__page-content-main-card-price">$${item.price}</div>
      </div>`;
      })
      .join("\n")}`;

    if (prodContainer) {
      prodContainer.innerHTML = prodListHtml;
    }

    initProdBtns();
    getCart();
    new SearchInputDetect(".input__search", filterPref, getProducts);
  } catch (error) {
    console.error(error);
  }
};
getProducts();

export { getProducts, filterPref };
