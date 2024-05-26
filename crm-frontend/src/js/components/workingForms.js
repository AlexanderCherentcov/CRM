import * as htmlElements from "./htmlElements.js";
import * as server from "./server.js";
import { getPopup } from "./popup.js";
import { getForms } from "./createForms.js";
import { render } from "./render.js";
import { validation } from "./validate.js";
import { createContact } from "./contacts.js";
import { preloaderSvg } from "./svg.js";

const preloader = preloaderSvg("btn-preloader", "btn-preloader-svg");

export const serverData = await server.serverGetClient();
export let listClient = [];
if (serverData !== null) {
  listClient = serverData;
}

// создаем popup c ответами
const popupError = getPopup("", "Ошибка, повторите попытку позже.", "", "");
const popupSuccessfully = getPopup("", "", "", "");

// Удаление клиента
const div = htmlElements.getDiv("popup__block");
const textDelete = htmlElements.getSpan("popup__text", "Вы действительно хотите удалить данного клиента?", "");
const btnDelete = htmlElements.getBtn("popup__btn-delete", "Удалить", "btn-delete");
const btnСancel = htmlElements.getBtn("popup__btn-cancel", "Отмена", "btn-cancel");

div.append(textDelete, btnDelete, btnСancel);
const popup = getPopup(div, "Удалить клиента", "", "");
popup.popupTitle.classList.add("popup__title-delete");

export function createDelete(obj, item) {
  btnDelete.addEventListener("click", async () => {
    await server.serverDeleteClient(obj.id);
    item.remove();
    btnDelete.textContent = "";
    btnDelete.append(preloader);
    setTimeout(() => {
      popup.popup.classList.remove("open");
      popup.bodyHidden.classList.remove("hidden");
      btnDelete.textContent = "Удалить";
    }, 1500);

    render(await server.serverGetClient());
  });

  btnСancel.addEventListener("click", () => {
    popup.popup.classList.remove("open");
    popup.bodyHidden.classList.remove("hidden");
  });
  return { popup, btnСancel };
}

// Изменение данных клиента
const editForm = getForms("edit-forms", "edit-name", "edit-surname", "edit-lastName");
const editPopup = getPopup(editForm.formClient, "Изменить данные", "popup-edit", "");
const blockBtn = htmlElements.getDiv("edit-block-btn");
const btnDeleteEdit = htmlElements.getBtn("delete-btn", "Удалить клиента", "");
blockBtn.append(btnDeleteEdit);
editPopup.popupContent.append(blockBtn);

export async function createEdit(objClient, itemEdit) {
  editPopup.popup.classList.add("open");
  editPopup.bodyHidden.classList.add("hidden");
  editPopup.popupClientId.textContent = `id:${objClient.id}`;
  editPopup.popup.id = objClient.id;
  editForm.middleNameInput.value = objClient.lastName;
  editForm.nameInput.value = objClient.name;
  editForm.surnameInput.value = objClient.surname;

  btnDeleteEdit.addEventListener("click", () => {
    const popupDelete = createDelete(objClient, itemEdit);
    popupDelete.popup.popup.classList.add("open");
    editPopup.popup.classList.remove("open");

    popupDelete.btnСancel.addEventListener("click", () => {
      editPopup.popup.classList.add("open");
      editPopup.bodyHidden.classList.add("hidden");
    });
  });

  editForm.blockContacts.innerHTML = "";

  const contactObj = [];
  if (!objClient.contacts.length == 0) {
    for (const contact of objClient.contacts) {
      const contactEdit = createContact(contactObj, editForm.addContact);
      editForm.blockContacts.append(contactEdit.contact);
      contactEdit.contactInput.value = contact.value;
      contactEdit.customSelect.value = contact.type;
      console.log(contactEdit.contactInput.value);
      if (contactEdit.customSelect.value === "Telegram") {
        contactEdit.dataOption(contactEdit.contactInput, "text", "Введите аккаунт Telegram", "input-telegram", "false", "false", "true", "25");
      }
      if (contactEdit.customSelect.value === "Телефон") {
        contactEdit.dataOption(contactEdit.contactInput, "number", "Введите номер телефона", "input-phone", "true", "false", "false", "11");
      }
      if (contactEdit.customSelect.value === "E-mail") {
        contactEdit.dataOption(contactEdit.contactInput, "text", "Введите ваш E-mail", "input-email", "false", "true", "true", "25");
      }
      if (contactEdit.customSelect.value === "Facebook") {
        contactEdit.dataOption(contactEdit.contactInput, "text", "Введите аккаунт Facebook", "input-fb", "false", "false", "true", "25");
      }
      if (contactEdit.customSelect.value === "vk") {
        contactEdit.dataOption(contactEdit.contactInput, "text", "Введите аккаунт VK", "input-vk", "false", "false", "true", "25");
      }
    }
  }

  editForm.blockContacts.append(editForm.addContact);

  editForm.formClient.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (validation(this) === true) {
      const formContacts = document.querySelectorAll(".client__contact");

      for (const contact of formContacts) {
        contactObj.push({
          type: contact.querySelector("select").value,
          value: contact.querySelector("input").value,
        });
      }
      let editClient = {
        lastName: editForm.middleNameInput.value,
        name: editForm.nameInput.value,
        surname: editForm.surnameInput.value,
        contacts: contactObj,
      };

      await server.serverEditClient(objClient.id, editClient);

      if (server.response.status !== 200) {
        editPopup.popup.classList.remove("open");
        popupError.popup.classList.add("open");

        setTimeout(() => {
          popupError.popup.classList.remove("open");
          editPopup.bodyHidden.classList.remove("hidden");
        }, 1500);
      } else {
        popupSuccessfully.popupTitle.textContent = "Данные клиента успешно изменены";
        popupSuccessfully.popupClientId.textContent = `${editClient.surname} ${editClient.name} ${editClient.lastName}`;
        editForm.btnForm.textContent = "";
        editForm.btnForm.append(preloader);
        setTimeout(() => {
          editPopup.popup.classList.remove("open");
          popupSuccessfully.popup.classList.add("open");
        }, 2000);

        setTimeout(() => {
          popupSuccessfully.popup.classList.remove("open");
          editPopup.bodyHidden.classList.remove("hidden");
          editForm.btnForm.textContent = "Сохранить";
        }, 3000);
      }
    }
    render(await server.serverGetClient());
  });
}

// Добавление нового клиента
export function createAddClient() {
  // Форма для добавления нового клиента
  const addForm = getForms("popup-form", "name-client", "surname-client", "lastName-client");
  // Создаем Popup
  const addPopup = getPopup(addForm.formClient, "Новый клиент ", "popup-add", "");
  const btnCan = htmlElements.getBtn("popup__btn-cancel", "Отмена", "");
  addPopup.popupContent.append(btnCan);
  btnCan.addEventListener("click", () => {
    addPopup.popup.classList.remove("open");
    addPopup.bodyHidden.classList.remove("hidden");
  });

  // Добавление нового клиента в список
  addForm.formClient.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (validation(this) === true) {
      const formContacts = document.querySelectorAll(".client__contact");
      const contactsArr = [];
      for (const contact of formContacts) {
        contactsArr.push({
          type: contact.querySelector("select").value,
          value: contact.querySelector("input").value,
        });
      }

      let newClientObj = {
        lastName: addForm.middleNameInput.value,
        name: addForm.nameInput.value,
        surname: addForm.surnameInput.value,
        createdAt: "",
        updatedAt: "",
        contacts: contactsArr,
      };

      const serverDataObj = await server.serverAddClient(newClientObj);
      serverDataObj.updatedAt = serverDataObj.updatedAt.toLocaleString();
      serverDataObj.createdAt = serverDataObj.createdAt.toLocaleString();

      listClient.push(serverDataObj);

      if (server.response.status !== 200) {
        popupError.popup.classList.add("open");

        setTimeout(() => {
          addPopup.bodyHidden.classList.remove("hidden");
          popupError.popup.classList.remove("open");

          addForm.btnForm.textContent = "Сохранить";
        }, 3000);
      } else {
        popupSuccessfully.popupTitle.textContent = "Клиент успешно добавлен";
        popupSuccessfully.popupClientId.textContent = `${serverDataObj.surname} ${serverDataObj.name} ${serverDataObj.lastName}`;
        addForm.btnForm.textContent = "";
        addForm.btnForm.append(preloader);
        setTimeout(() => {
          addPopup.popup.classList.remove("open");
          popupSuccessfully.popup.classList.add("open");
        }, 2000);

        setTimeout(() => {
          addPopup.bodyHidden.classList.remove("hidden");
          popupSuccessfully.popup.classList.remove("open");
          addForm.btnForm.textContent = "Сохранить";
        }, 3000);
      }
      addForm.middleNameInput.value = "";
      addForm.nameInput.value = "";
      addForm.surnameInput.value = "";
      if (!contactsArr.length == 0) {
        for (const contact of formContacts) {
          contact.remove();
        }
      }

      render(listClient);
    } else {
      addForm.btnForm.innerHTML = "Сохранить";
    }
  });
  render(listClient);
}
