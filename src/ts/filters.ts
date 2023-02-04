import { FilterPreferences, ObjectItem, ObjectsInCart } from "./interfaces";
import {
  INIT_SEARCHED_TYPE,
  INIT_SEARCHED_PRICE,
  INIT_SEARCHED_NAME,
} from "./config.js";

class HomeProductsFilter {
  private arr: ObjectItem[];

  constructor(arr: ObjectItem[]) {
    this.arr = arr;
  }
  getHomeProductsFilter(): ObjectItem[] {
    return Array.from(
      { length: 3 },
      () => this.arr[Math.floor(Math.random() * this.arr.length)],
    );
  }
}

class GroupOfItems {
  private items: ObjectsInCart[] = [];

  groupItems(inputArray: ObjectItem[]) {
    this.items = inputArray.reduce((acc: ObjectsInCart[], curr: ObjectItem) => {
      const group = acc.find((obj) => obj.id === curr.id);
      if (group) {
        group.amount++;
      } else {
        acc.push({ ...curr, amount: 1 });
      }
      return acc;
    }, []);
    this.items.sort((a, b) => a.id.localeCompare(b.id)); // sort by ascending id
  }

  getItems() {
    return this.items;
  }
}

class SearchInputDetect {
  private timeout: number | null = null;
  private inputSearch: HTMLInputElement;
  private filterPref: FilterPreferences;
  private getProducts: () => void;

  constructor(
    searchInputSelector: string,
    filterPref: FilterPreferences,
    getProducts: () => void,
  ) {
    this.inputSearch = document.querySelector(
      searchInputSelector,
    ) as HTMLInputElement;
    this.filterPref = filterPref;
    this.getProducts = getProducts;
    this.inputSearch?.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  private handleKeyUp(e: Event) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      const element = e.target as HTMLInputElement;
      if (element.value) this.filterPref.name = element.value.toLowerCase();
      this.getProducts();
      element.value = "";
    }, 1000);
  }
}

class CompanyPriceFilter {
  applyFilters(items: ObjectItem[], filterPref: FilterPreferences) {
    return items
      .filter((item: ObjectItem) => {
        if (filterPref.name !== INIT_SEARCHED_NAME) {
          const name = item.name.toLowerCase();
          return name.includes(filterPref.name);
        }
        return items;
      })
      .filter((item: { type: string }) => {
        if (filterPref.type === INIT_SEARCHED_TYPE) {
          return items;
        } else {
          return item.type === filterPref.type;
        }
      })
      .filter((item: { price: string }) => {
        if (filterPref.price === INIT_SEARCHED_PRICE) {
          return items;
        } else {
          return +item.price <= filterPref.price;
        }
      });
  }
}

export {
  HomeProductsFilter,
  GroupOfItems,
  CompanyPriceFilter,
  SearchInputDetect,
};
