interface FilterPreferences {
  type: string;
  price: number;
  name: string;
}
interface ObjectItem {
  id: string;
  name: string;
  image: string;
  price: string;
  type: string;
}
interface ObjectsInCart extends ObjectItem {
  amount: number;
}

export { ObjectItem, ObjectsInCart, FilterPreferences };
