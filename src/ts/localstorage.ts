import { STORAGE_NAME } from "./config.js";
import { ObjectItem } from "./interfaces.js";

export class ShoppingCartModule {
  private shoppingCart: ObjectItem[] = [];

  //Get items from localstorage to shoppingCart array
  public getFromLocal(): void {
    const storedItemsJSON = localStorage.getItem(STORAGE_NAME) || "[]";
    const storedItems: ObjectItem[] | [] = JSON.parse(storedItemsJSON);
    storedItems
      ? this.shoppingCart.push(...storedItems)
      : (this.shoppingCart.length = 0);
  }

  public showShoppingCart(): ObjectItem[] {
    this.getFromLocal();
    return this.shoppingCart;
  }

  public getTotalPrice(): number {
    const total = this.shoppingCart.reduce((acc, item) => acc + +item.price, 0);
    return Number(total.toFixed(2));
  }

  //Save from shoppingCart to localstorage
  public saveToLocal(): void {
    localStorage.setItem("shoppingCart", JSON.stringify(this.shoppingCart));
    this.shoppingCart.length = 0;
    this.getFromLocal();
  }

  public saveItem(item: ObjectItem): void {
    const toBuy = {
      id: item.id,
      name: item.name,
      image: item.image,
      type: item.type,
      price: item.price,
    };
    this.shoppingCart.push(toBuy);
    this.saveToLocal();
  }
  public addItem(id: string) {
    const item = this.shoppingCart.filter(
      (item: { id: string }) => item.id === id,
    )[0];
    this.shoppingCart.push(item);
    this.saveToLocal();
  }
  public delItem(id: string) {
    const item = this.shoppingCart.filter(
      (item: { id: string }) => item.id === id,
    );
    if (item.length - 1 === 0) {
      this.removeItems(id);
    } else {
      const item = this.shoppingCart.filter(
        (item: { id: string }) => item.id === id,
      );
      item.splice(-1);
      this.shoppingCart = this.shoppingCart.filter(
        (key: { id: string }) => key.id != id,
      );
      this.shoppingCart = [...this.shoppingCart, ...item];
    }
    this.saveToLocal();
  }

  public removeItems = (id: string) => {
    this.shoppingCart = this.shoppingCart.filter(
      (key: { id: string }) => key.id != id,
    );
    this.saveToLocal();
  };

  public cleareAll(): void {
    window.localStorage.clear();
    this.shoppingCart.length = 0;
  }
}
