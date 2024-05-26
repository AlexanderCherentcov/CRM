// client
import * as htmlElements from "./htmlElements.js";
import { getTitleTable } from "./render.js";
import { addSvg, preloaderSvg } from "./svg.js";

export async function getClient() {
  const client = document.createElement("section");
  client.classList.add("client");

  const container = htmlElements.getDiv("client__container");
  container.classList.add("container");
  const content = htmlElements.getDiv("client__content");

  // Создаем заголовок
  const title = document.createElement("h1");
  title.classList.add("client__title");
  title.textContent = "Клиенты";

  // Блок со списком клиентов
  const blockClient = htmlElements.getDiv("client__action");

  // preloader
  const preloader = preloaderSvg("preloader-block", "preloader-svg");

  // Таблица
  const clientTable = htmlElements.getTable("client__table", "client-table");
  const tableHead = document.createElement("thead");
  const tableBody = document.createElement("tbody");

  tableHead.classList.add("client-table__thead");
  tableBody.classList.add("client-table__tbody");
  tableHead.id = "table-thead";
  tableBody.id = "table-tbody";

  // Добавляем заголовки в таблицу
  tableHead.append(getTitleTable());

  // Кнопка
  const btnAction = htmlElements.getBtn("client__action-btn", "Добавить клиента", "add-client");
  const imgBtn = addSvg()
  btnAction.append(imgBtn);

  // Открытие popup
  btnAction.addEventListener("click", function () {
    const popup = document.getElementById("popup-add");
    popup.classList.add("open");
    document.body.classList.add("hidden")
  });

  blockClient.append(clientTable, preloader);
  clientTable.append(tableHead, tableBody);
  content.append(title, blockClient, btnAction);
  container.append(content);
  client.append(container);

  return client;
}
