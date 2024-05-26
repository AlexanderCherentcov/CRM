import { getHeader } from "./components/header.js";
import { getClient } from "./components/client.js";
import { createAddClient } from "./components/workingForms.js";
import { autocomplete } from "./components/autocomplete.js";
import { getCardClient } from "./components/cardClient.js";
import { sortClient } from "./components/sorting.js";
import { listClient } from "./components/workingForms.js";

// подключение стилей
import "../scss/style.scss";
import { data } from "isotope-layout";

const app = document.getElementById("app");

if (window.location.hash) {
  for (const oneClient of listClient) {
    oneClient.fio = `${oneClient.surname}  ${oneClient.name} ${oneClient.lastName}`;
    if (window.location.hash === `#${oneClient.id}`) {
      const cardClient = getCardClient(oneClient.id, oneClient.fio, oneClient.createdAt, oneClient.updatedAt, oneClient.contacts);
      app.append(cardClient);
    }
  }
} else {
  // Создаем header
  const header = getHeader();
  // Создаем блок клиентов
  const client = await getClient();

  app.append(header, client);

  // Вызываем функцию добавления нового клиента
  createAddClient();

  // Сортировка
  let sortFlag = "fio",
    sortDir = true;
  //Массив кнопок
  const btnArr = document.querySelectorAll(".client__item-btn");
  for (const btn of btnArr) {
    // Проверяем есть ли у кнопки класс "active"
    if (btn.classList.contains("active")) {
      // Удаляем класс "active"
      btn.classList.remove("active");
    }

    btn.addEventListener("click", () => {
      sortDir = !sortDir;

      if (sortDir == false) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
      sortClient(listClient, sortFlag, sortDir);
    });
  }

  const arrClientName = [];
  for (const oneClient of listClient) {
    oneClient.fio = `${oneClient.surname} ${oneClient.name} ${oneClient.lastName}`;
    arrClientName.push(oneClient.fio);
  }

  // Добавляем autocomplete
  autocomplete("#header-search", arrClientName, "autocomplete-wrap", "autocomplete-list", listClient);
}




