import {
  getProducts,
  getProductsByCategories,
  getProductById,
  searchProduct,
} from "./products-api";
import {
  categoriesListEl,
  productsListEl,
  notFoundDivEl,
  modalProductEl,
  modalEl,
} from "./refs";
import { renderProducts, renderProduct } from "./render-function";
import { toggleModal } from "./modal";

export async function onCategoriesClick(e) {
  if (e.target.nodeName !== "BUTTON") return;

  const listEl = e.currentTarget;
  const {
    data: { products },
  } =
    e.target.id === "all"
      ? await getProducts()
      : await getProductsByCategories(e.target.id);

  let prevActiveBtn = listEl.querySelector(".categories__btn--active");
  if (prevActiveBtn) {
    prevActiveBtn.classList.remove("categories__btn--active");
  }

  e.target.classList.add("categories__btn--active");

  productsListEl.innerHTML = "";

  if (products.length === 0) {
    // console.log("Not Found");
    notFoundDivEl.classList.add("not-found--visible");
    return;
  }

  renderProducts(products);
}

export async function onProductClick(e) {
  const itemEl = e.target.closest(".products__item");
  if (itemEl === null) return;
  const { id } = itemEl.dataset;

  const { data } = await getProductById(id);

  renderProduct(data, modalProductEl);
  toggleModal(modalEl);
}

export async function onFormSubmit(e) {
  e.preventDefault();

  const searchValue = e.target.elements.searchValue.value.trim();
  if (searchValue.length === 0) return alert("Fill search input");
  const { data } = await searchProduct(searchValue);

  productsListEl.innerHTML = "";

  if (data.products.length === 0) {
    notFoundDivEl.classList.add("not-found--visible");
    return;
  }

  renderProducts(data.products);
}
