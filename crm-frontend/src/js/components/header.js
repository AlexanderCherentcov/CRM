// header
import * as htmlElements from "./htmlElements.js";
import { render } from "./render.js";
import { listClient} from "./workingForms.js";

export function getHeader() {
  const header = document.createElement("header");
  header.classList.add("header");

  const container = htmlElements.getDiv("header__container");
  container.classList.add("container");
  const content = htmlElements.getDiv("header__content");

  const link = htmlElements.getLink("header__link", "header-link", "../index.html", "");
  const logo = htmlElements.getImg("header__logo", "header-logo", "/img/logo.png", "Логотип");
  const searchForm = htmlElements.getForm("header__form", "header-form", "#");
  const input = htmlElements.getInput("header__search", "header-search", "text", "Введите запрос");
  input.autocomplete = "off";
  let wrap = document.createElement("div");
  wrap.classList.add("autocomplete");
  wrap.id = "autocomplete-wrap";
  let list = htmlElements.getUl("autocomplete__list", "autocomplete-list");
  wrap.append(input, list);

  searchForm.append(wrap);
  link.append(logo);
  content.append(link, searchForm);
  container.append(content);
  header.append(container);

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  input.addEventListener("input", () => {
    setTimeout(() => {
      render(listClient);
    }, 1000);
  });

  return header;
}
