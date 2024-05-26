import * as htmlElements from "./htmlElements.js";
import { createContact } from "./contacts.js";
import { addContactSvg } from "./svg.js";

export function getForms(idForms, idName, idSurname, idMiddleName) {
  const formClient = htmlElements.getForm("popup__form", idForms, "#");
  formClient.classList.add("client-form");

  const surnameBlock = htmlElements.getDiv("client-form__block");
  const surnameInput = htmlElements.getInput("client-form__surname", idSurname, "text", "Фамилия*");
  surnameInput.classList.add("client-inp");
  surnameInput.dataset.require = "true";
  surnameInput.maxLength = "25";

  surnameBlock.append(surnameInput);

  const nameBlock = htmlElements.getDiv("client-form__block");
  const nameInput = htmlElements.getInput("client-form__name", idName, "text", "Имя*");
  nameInput.classList.add("client-inp");
  nameInput.dataset.require = "true";
  nameInput.maxLength = "25";

  nameBlock.append(nameInput);

  const middleNameBlock = htmlElements.getDiv("client-form__block");
  const middleNameInput = htmlElements.getInput("client-form__middleName", idMiddleName, "text", "Отчество");
  middleNameInput.classList.add("client-inp");

  middleNameBlock.append(middleNameInput);

  // Кнопка добавления контактов
  const blockContacts = htmlElements.getDiv("client-form__block-contact");
  const addContact = htmlElements.getLink("client-form__btn-contact", "addContact", "#", "Добавить контакт");
  const svgContact = addContactSvg();
  addContact.prepend(svgContact);

  const arrContact = [];

  addContact.addEventListener("click", () => {
    const selectContact = createContact(arrContact, addContact);
    if (arrContact.length <= 10) {
      arrContact.push(selectContact.contact);
      blockContacts.append(selectContact.contact);
    } else {
      addContact.classList.add("btn-hidden");
    }
  });

  const btnForm = htmlElements.getBtn("client-form-btn", "Сохранить", "form-btn");

  blockContacts.append(addContact);
  formClient.append(surnameBlock, nameBlock, middleNameBlock, blockContacts, btnForm);
  return {
    surnameInput,
    nameInput,
    middleNameInput,
    formClient,
    blockContacts,
    addContact,
    btnForm,
  };
}
