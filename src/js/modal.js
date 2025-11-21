export function onModalClick(e) {
  if (e.target.nodeName !== "BUTTON") return;

  const modal = e.currentTarget;
  const currentBtn = e.target;

  if (currentBtn.classList.contains("modal__close-btn")) {
    toggleModal(modal);
  }
  if (currentBtn.classList.contains("modal-product__btn--wishlist")) {
    addToWishList();
  }

  if (currentBtn.classList.contains("modal-product__btn--cart")) {
    addToCart();
  }
}

export function toggleModal(selector) {
  selector.classList.toggle("modal--is-open");
}

function addToCart() {
  console.log("Product added to cart");
}

function addToWishList() {
  console.log("Product added to wishlist");
}
