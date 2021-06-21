let navToggle = document.querySelector(".header__toggle");
let nav = document.querySelector(".header__list");
let header = document.querySelector(".header");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("show");
  navToggle.classList.toggle("show-cross");
});
