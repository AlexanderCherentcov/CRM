import * as htmlElements from "./htmlElements.js";
import { getDateTime } from "./newDate.js";
import { createDelete, createEdit } from "./workingForms.js";
import { tooltip } from "./tooltip.js";
import { copyText } from "./copyText.js";
import { filterClient } from "./filtering.js";
import * as svgElements from "./svg.js";

// Заголовки для table
export function getTitleTable() {
  const tableTr = htmlElements.getTr("client__tr-title");

  // Ячейки заголовка
  function getThClient(thText, idBtn, btnFlag = "") {
    const clientTh = htmlElements.getTh("client__item");
    const clientBtn = htmlElements.getBtn("client__item-btn", thText, idBtn);
    const clientImg = htmlElements.getImg("client__item-img", "", "./img/arrow.svg");
    clientBtn.append(clientImg);
    const clientSpan = htmlElements.getSpan("client__item-text", thText, "");

    if (!btnFlag == "") {
      clientTh.append(clientBtn);
    } else {
      clientTh.append(clientSpan);
    }
    return clientTh;
  }

  tableTr.append(getThClient("ID", "btnFio", "id"), getThClient("Фамилия Имя Отчество", "btnFio", "surname"), getThClient("Дата и время создания", "btn-creation", "createdAt"), getThClient("Последние изменения", "btn-change", "updatedAt"), getThClient("Контакты", ""), getThClient("Действия", ""));
  return tableTr;
}

// Создание нового клиента
function $getNewClientTr(clientObj) {
  const $itemClient = htmlElements.getTr("client__item");
  $itemClient.id = "item-client";
  const $clientId = htmlElements.getTd("client__td");
  $clientId.classList.add("client__id");
  const $clientFIO = htmlElements.getTd("client__td");
  const $clientCreatedAt = htmlElements.getTd("client__td");
  const $clientUpdatedAt = htmlElements.getTd("client__td");
  const $clientContacts = htmlElements.getTd("client__td");
  $clientContacts.classList.add("td-social");
  const $socialBlockFlex = htmlElements.getDiv("client__social-flex");
  const $socialList = htmlElements.getUl("client__social-list", "list-social");
  $socialBlockFlex.append($socialList);
  $clientContacts.append($socialBlockFlex);
  const $tdAction = htmlElements.getTd("client__td");
  $tdAction.classList.add("action-td");
  const $btnDelete = htmlElements.getBtn("client__btn", "Удалить", "");
  $btnDelete.append(svgElements.deleteSvg());
  const $btnCorrect = htmlElements.getBtn("client__btn", "Изменить", "");
  $btnCorrect.append(svgElements.editSvg());
  const $btnCopy = htmlElements.getBtn("client__btn", "Скопировать");
  $btnCopy.append(svgElements.copySvg());

  // дата и время создания клиента
  const clientCreated = clientObj.createdAt;

  //  дата и время изменения клиента
  const clientUpdated = clientObj.updatedAt;

  // получаем массив с контактами
  const contactsArr = clientObj.contacts;

  // Функция создания контакта c tooltip

  function addContacts(svg, text) {
    const tooltipBlock = svg;
    $socialList.append(tooltipBlock);
    tooltip(text, tooltipBlock);
    return tooltipBlock;
  }

  // Отрисовка контактов
  for (const contactsObj of contactsArr) {
    if (contactsObj.type === "Телефон") {
      addContacts(svgElements.phoneSvg(), `<a href="tel:${contactsObj.value} target="_blank"">${contactsObj.value}</a>`);
    }

    if (contactsObj.type === "Telegram") {
      addContacts(svgElements.telegramSvg(), `<a href="https://telegram.im/@<${contactsObj.value} target="_blank">"${contactsObj.value}</a>`);
    }

    if (contactsObj.type === "E-mail") {
      addContacts(svgElements.emailSvg(), `</span> <a href="mailto:${contactsObj.value}" target="_blank">${contactsObj.value}</a>`);
    }

    if (contactsObj.type === "Facebook") {
      addContacts(svgElements.fbSvg(), `<a href="${contactsObj.value}" target="_blank">${contactsObj.value}</a>`);
    }

    if (contactsObj.type === "vk") {
      addContacts(svgElements.vkSvg(), `<a href="${contactsObj.value}" target="_blank">${contactsObj.value}</a>`);
    }
  }

  // Кнопка show more

  if (contactsArr.length > 5) {
    const btnShowMore = htmlElements.getBtn("client__show-more", `+${contactsArr.length - 5}`, "show-more");
    $socialBlockFlex.append(btnShowMore);

    btnShowMore.addEventListener("click", () => {
      $socialList.classList.toggle("active");

      if ($socialList.classList.contains("active")) {
        btnShowMore.textContent = `-${contactsArr.length - 5}`;
      } else {
        btnShowMore.textContent = `+${contactsArr.length - 5}`;
      }
    });
  }

  $clientId.textContent = clientObj.id;
  $clientFIO.textContent = `${clientObj.surname} ${clientObj.name} ${clientObj.lastName}`;

  // Изменения данных клиента
  $btnCorrect.addEventListener("click", () => {
    createEdit(clientObj, $itemClient);
  });

  // Ссылка на клиента
  $btnCopy.addEventListener("click", () => {
    window.location.hash = "";
    window.location.replace("#");
    copyText(window.location.href + window.location.hash + clientObj.id);
  });

  // Удаляем клиента
  $btnDelete.addEventListener("click", async () => {
    const popupDelete = createDelete(clientObj, $itemClient);
    popupDelete.popup.popup.classList.add("open");
    popupDelete.popup.bodyHidden.classList.add("hidden");
  });

  $clientUpdatedAt.append(getDateTime(clientUpdated));
  $clientCreatedAt.append(getDateTime(clientCreated));
  $tdAction.append($btnCorrect, $btnDelete, $btnCopy);
  $itemClient.append($clientId, $clientFIO, $clientCreatedAt, $clientUpdatedAt, $clientContacts, $tdAction);
  return $itemClient;
}

export function render(arr) {
  let copyArr = [...arr];

  const $clientsTable = document.getElementById("table-tbody");
  const preloader = document.getElementById("preloader-svg");
  preloader.classList.add("preloader-active");
  $clientsTable.innerHTML = "";
  setTimeout(function () {
    preloader.classList.remove("preloader-active");
    for (const oneClient of copyArr) {
      oneClient.fio = `${oneClient.surname} ${oneClient.name} ${oneClient.lastName}`;

      // Фильтрация
      // input фильтрации
      const inpFilter = document.getElementById("header-search");

      if (inpFilter.value.trim() !== "") {
        copyArr = filterClient(copyArr, "fio", inpFilter.value);
      }
    }

    $clientsTable.textContent = "";

    for (const clientObj of copyArr) {
      const newClient = $getNewClientTr(clientObj);
      $clientsTable.append(newClient);
    }
  }, 1500);
}
