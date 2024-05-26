import { getDateTime } from "./newDate.js";
import * as htmlElements from "./htmlElements.js";

export function getCardClient(id, fio, keyAdd, keyCorrect, arrContacts) {
  const card = htmlElements.getDiv("card");

  // создаем header
  const header = document.createElement("card__header");
  header.classList.add("header");

  const container = htmlElements.getDiv("header__container");
  container.classList.add("container");
  const content = htmlElements.getDiv("header__content");

  const link = htmlElements.getLink("header__link", "header-link", "../index.html", "");
  const logo = htmlElements.getImg("header__logo", "header-logo", "/img/logo.png", "Логотип");
  const linkBtn = htmlElements.getLink("header__btn", "header-link", "../index.html", "На главную");

  link.append(logo);
  content.append(link, linkBtn);
  container.append(content);
  header.append(container);

  // создаем карточку клиента
  const cardClient = htmlElements.getDiv("card__client");
  cardClient.classList.add("card-client");

  const containerCard = htmlElements.getDiv("card-client__container");
  containerCard.classList.add("container");

  const titleClient = document.createElement("h3");
  titleClient.classList.add("card-client__title");
  titleClient.textContent = `Клиент ${fio}`;

  const blockClient = htmlElements.getDiv("card-client__content");
  blockClient.classList.add("card-content");

  // ID
  const clientID = htmlElements.getDiv("card-content__block");
  const clientIDName = htmlElements.getDiv("card-content__name");
  clientIDName.textContent = "ID: ";
  const clientIDData = htmlElements.getDiv("card-content__data");
  clientIDData.textContent = id;
  clientID.append(clientIDName, clientIDData);

  // FIO
  const clientFIO = htmlElements.getDiv("card-content__block");
  const clientFIOName = htmlElements.getDiv("card-content__name");
  clientFIOName.textContent = "ФИО: ";
  const clientFIOData = htmlElements.getDiv("card-content__data");
  clientFIOData.textContent = fio;
  clientFIO.append(clientFIOName, clientFIOData);

  // DATE
  const dateClientAdd = getDateTime(keyAdd);
  const dateClientCorrect = getDateTime(keyCorrect);

  const clientDateAdd = htmlElements.getDiv("card-content__block");

  // Дата создания
  const addDate = htmlElements.getDiv("card-content__date");
  const clientAddName = htmlElements.getDiv("card-content__name");
  clientAddName.textContent = "Дата создания: ";
  const clientAddData = htmlElements.getDiv("card-content__data");
  clientAddData.append(dateClientAdd);
  addDate.append(clientAddName, clientAddData);

  clientDateAdd.append(addDate);

  const clientDateCorrect = htmlElements.getDiv("card-content__block");

  // Дата изменения
  const correctDate = htmlElements.getDiv("card-content__date");
  const clientCorrectName = htmlElements.getDiv("card-content__name");
  clientCorrectName.textContent = "Дата изменения: ";
  const clientCorrectData = htmlElements.getDiv("card-content__data");
  clientCorrectData.append(dateClientCorrect);
  correctDate.append(clientCorrectName, clientCorrectData);

  clientDateCorrect.append(correctDate);

  // Контакты
  const clientContact = htmlElements.getDiv("card-content__block");
  const clientContactName = htmlElements.getDiv("card-content__name");
  clientContactName.textContent = "Контакты:";
  clientContact.append(clientContactName);
  if (arrContacts.length !== 0) {
    for (const contact of arrContacts) {
      const contactType = contact.type;

      switch (contactType) {
        case "Телефон":
          const contactTelName = htmlElements.getDiv("card-content__name");
          contactTelName.textContent = `${contact.type}:`;
          const contactTelData = htmlElements.getLink("card-content__link", "", `tel:${contact.value}`, contact.value);
          contactTelData.target = "_blank";
          const contactBlockTel = htmlElements.getDiv("card-content__block-contact");
          contactBlockTel.append(contactTelName, contactTelData);
          clientContact.append(contactBlockTel);
          break;
        case "Telegram":
          const contactTelegramName = htmlElements.getDiv("card-content__name");
          contactTelegramName.textContent = `${contact.type}:`;
          const contactTelegramData = htmlElements.getLink("card-content__link", "", `https://telegram.im/@<${contact.value}>`, contact.value);
          contactTelegramData.target = "_blank";
          const contactBlockTelegram = htmlElements.getDiv("card-content__block-contact");
          contactBlockTelegram.append(contactTelegramName, contactTelegramData);
          clientContact.append(contactBlockTelegram);
          break;
        case "E-mail":
          const contactEmailName = htmlElements.getDiv("card-content__name");
          contactEmailName.textContent = `${contact.type}:`;
          const contactEmailData = htmlElements.getLink("card-content__link", "", `mailto:<${contact.value}>`, contact.value);
          contactEmailData.target = "_blank";
          const contactBlockEmail = htmlElements.getDiv("card-content__block-contact");
          contactBlockEmail.append(contactEmailName, contactEmailData);
          clientContact.append(contactBlockEmail);
          break;
        case "Facebook":
          const contactFbName = htmlElements.getDiv("card-content__name");
          contactFbName.textContent = `${contact.type}:`;
          const contactFbData = htmlElements.getLink("card-content__link", "", `https://www.messenger.com/t/${contact.value}`, contact.value);
          contactFbData.target = "_blank";
          const contactBlockFb = htmlElements.getDiv("card-content__block-contact");
          contactBlockFb.append(contactFbName, contactFbData);
          clientContact.append(contactBlockFb);
          break;
        case "vk":
          const contactVkName = htmlElements.getDiv("card-content__name");
          contactVkName.textContent = `${contact.type}:`;
          const contactVkData = htmlElements.getLink("card-content__link", "", `https://vk.me/${contact.value}`, contact.value);
          contactVkData.target = "_blank";
          const contactBlockVk = htmlElements.getDiv("card-content__block-contact");
          contactBlockVk.append(contactVkName, contactVkData);
          clientContact.append(contactBlockVk);
          break;
      }
    }
  } else {
    const contactNoName = htmlElements.getDiv("card-content__data");
    contactNoName.textContent = "Пользователь не добавил свои контакты";
    clientContact.append(contactNoName);
  }

  blockClient.append(clientID, clientFIO, clientDateAdd, clientDateCorrect, clientContact);
  containerCard.append(titleClient, blockClient);
  cardClient.append(containerCard);

  card.append(header, cardClient);

  return card;
}
