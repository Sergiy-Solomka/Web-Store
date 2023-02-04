import { ObjectItem } from "../interfaces.js";
import { ShoppingCartModule } from "../localstorage.js";
import { GroupOfItems } from "../filters.js";

const getCart = () => {
  const modal = document.querySelector(".modal") as HTMLElement;
  const cartBtn = document.querySelector(".btn__cart") as HTMLElement;
  const cartItems = document.querySelector(".cart__items") as HTMLElement;
  const totalPrice = document.querySelector(".cart__total") as HTMLElement;

  const cart = new ShoppingCartModule();
  const itemsInCart: ObjectItem[] = cart.showShoppingCart();

  if (itemsInCart.length) {
    cartItems?.classList.remove("hidden");
  } else {
    cartItems?.classList.add("hidden");
  }

  const itemsListFunct = () => {
    const cart = new ShoppingCartModule();
    const itemsInCart: ObjectItem[] = cart.showShoppingCart();

    totalPrice.innerHTML = `Total : $${cart.getTotalPrice()}`;

    const group = new GroupOfItems();
    group.groupItems(itemsInCart);

    const unicItems = group.getItems();
    const inCartHtml = `${unicItems
      .map((item) => {
        return ` 
            <div class="cart__page-content-main-card" id=${item.id}>
              <div class="cart__page-content-main-card-picture">
              <img class="cart__page-content-main-card-img"
              src=${item.image}
            />
              </div>
              <div class="cart__page-content-main-card-discription">
              ${item.name}
                  <div class="cart__page-content-main-card-price">$${item.price}</div>
                <div class="cart__page-content-main-card-remove btn__remove">remove</div>
              </div>
              <div class="cart__page-content-main-card-amount">
                <div class="cart__page-content-main-card-amount-up btn__addItem">
                  <i class="fa-solid fa-angle-up"></i>
                </div>
                <div class="cart__page-content-main-card-amount-tot">${item.amount}</div>
                <div class="cart__page-content-main-card-amount-down btn__delItem">
                  <i class="fa-solid fa-angle-down"></i>
                </div>
              </div>
            </div>
          `;
      })
      .join("\n")}`;
    return inCartHtml;
  };

  const modalBody = document.querySelector(".modal-body") as HTMLElement;

  const initModalBtns = () => {
    const checkOutBtn = document.querySelector(".btn__checkout");
    checkOutBtn?.addEventListener("click", () => {
      cart.cleareAll();
      window.location.reload();
    });

    const btnAddItem = Array.from(document.querySelectorAll(".btn__addItem"));
    btnAddItem.map((item) => {
      item.addEventListener("click", (e) => {
        const element = e.target as HTMLInputElement;
        const item = element.closest(".cart__page-content-main-card");
        if (item) cart.addItem(item?.id);
        refreshBody();
      });
    });

    const btnDelItem = Array.from(document.querySelectorAll(".btn__delItem"));
    btnDelItem.map((item) => {
      item.addEventListener("click", (e) => {
        const element = e.target as HTMLInputElement;
        const item = element.closest(".cart__page-content-main-card");
        if (item) cart.delItem(item?.id);
        refreshBody();
      });
    });

    const btnRemoveItems = Array.from(
      document.querySelectorAll(".btn__remove"),
    );
    btnRemoveItems.map((item) => {
      item.addEventListener("click", (e) => {
        const element = e.target as HTMLInputElement;
        const item = element.closest(".cart__page-content-main-card");
        if (item) cart.removeItems(item?.id);
        refreshBody();
      });
    });
  };

  const refreshBody = () => {
    if (modalBody) {
      modalBody.innerHTML = "";
      modalBody.innerHTML = itemsListFunct();
    }
    initModalBtns();
  };

  refreshBody();

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("modal-header-close-btn")[0];
  cartBtn?.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // When the user clicks on <span> (x), close the modal
  span?.addEventListener("click", () => {
    modal.style.display = "none";
    window.location.reload(); //Todo make better reload just cart not page
  });

  window?.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
      window.location.reload(); //Todo make better reload just cart not page
    }
  });
};

export { getCart };
