import { getHome, getItemById } from "./views/Home.js";
import { getProducts, filterPref } from "./views/Products.js";

const initHomeBtns = () => {
  const showNowBtn = document.querySelector(".btn__shownow");
  const showAllBtn = document.querySelector(".btn__showall");

  const featured = Array.from(document.querySelectorAll(".home__card"));

  showNowBtn?.addEventListener("click", () => {
    window.open("./products.html", "_self");
  });
  showAllBtn?.addEventListener("click", () => {
    window.open("./products.html", "_self");
  });

  featured.map((item) => {
    item.addEventListener("click", (e) => {
      const element = e.target as HTMLInputElement;
      const item = element.closest(".home__card");
      if (item) getItemById(item.id);
      getHome();
    });
  });
};

const initProdBtns = () => {
  const products = Array.from(document.querySelectorAll(".product__card"));
  products.map((item) => {
    item.addEventListener("click", (e) => {
      const element = e.target as HTMLInputElement;
      const item = element.closest(".product__card");
      if (item) getItemById(item.id);
      getProducts();
    });
  });

  const btnFilter = Array.from(document.querySelectorAll(".btn__filter"));
  btnFilter.map((item) => {
    item.addEventListener("click", (e) => {
      const element = e.target as HTMLInputElement;
      filterPref.type = element.innerText;
      filterPref.name = "";
      getProducts();
    });
  });

  const btnPrice = document.querySelector(".btn__price");
  btnPrice?.addEventListener("input", (e) => {
    const element = e.target as HTMLInputElement;
    filterPref.price = element.valueAsNumber;
    filterPref.name = "";
    getProducts();
  });
};

export { initHomeBtns, initProdBtns };
