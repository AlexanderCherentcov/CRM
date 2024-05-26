import * as htmlElements from "./htmlElements.js";
import { deleteContactSvg } from "./svg.js";

export function createContact(arrCont, btnAdd) {
  const contact = htmlElements.getDiv("client__contact");
  contact.classList.add("contact");

  const customSelect = htmlElements.getSelect("contact__select");
  contact.append(customSelect);

  const contactBlock = htmlElements.getDiv("contact__block-input");
  const contactInput = htmlElements.getInput("contact__input", "input-phone", "", "Введите номер телефона");
  contactInput.dataset.phone = "true";
  contactInput.maxLength = "11";

  contact.append(contactBlock);
  contactBlock.append(contactInput);

  // Создаем option
  const phoneOption = htmlElements.getOption("contact__option", "Телефон", "Телефон");
  const telegramOption = htmlElements.getOption("contact__option", "Telegram", "Telegram");
  const emailOption = htmlElements.getOption("contact__option", "E-mail", "E-mail");
  const fbOption = htmlElements.getOption("contact__option", "Facebook", "Facebook");
  const vkOption = htmlElements.getOption("contact__option", "VK", "vk");
  customSelect.append(phoneOption, telegramOption, emailOption, fbOption, vkOption);

  // добавляем ваши обработчики прямо в option
  for (let i = 0; i < customSelect.options.length; ++i) {
    customSelect.options[i];
  }

  // Функция данных в option
  function dataOption(inp, typeData, placeholderData, idData, phoneData, emailData, requireData, maxLengthData) {
    Object.assign(inp, {
      type: typeData,
      placeholder: placeholderData,
      id: idData,
      maxLength: maxLengthData,
    });
    inp.dataset.phone = phoneData;
    inp.dataset.email = emailData;
    inp.dataset.require = requireData;
  }

  // Проверяем какой option выбран
  customSelect.onchange = function () {
    if (this.value === phoneOption.value) {
      dataOption(contactInput, "number", "Введите номер телефона", "input-phone", "true", "false", "false", "11");
    }

    if (this.value === telegramOption.value) {
      dataOption(contactInput, "text", "Введите аккаунт Telegram", "input-telegram", "false", "false", "true", "25");
    }

    if (this.value === emailOption.value) {
      dataOption(contactInput, "text", "Введите ваш E-mail", "input-email", "false", "true", "true", "25");
    }

    if (this.value === fbOption.value) {
      dataOption(contactInput, "text", "Введите аккаунт Facebook", "input-fb", "false", "false", "true", "25");
    }

    if (this.value === vkOption.value) {
      dataOption(contactInput, "text", "Введите аккаунт VK", "input-vk", "false", "false", "true", "25");
    }
  };

  const deleteButton = htmlElements.getBtn("contact__delete-button", "", "delete-contact");
  deleteButton.append(deleteContactSvg());
  contact.appendChild(deleteButton);

  deleteButton.addEventListener("click", async () => {
    arrCont.splice(0, 1);
    contact.remove();
    console.log(arrCont);

    btnAdd.classList.remove("btn-hidden");
  });

  const choices = new Choices(customSelect, {
    searchEnabled: false,
    itemSelectText: "",
  });

  return {
    contact,
    contactInput,
    customSelect,
    dataOption,
  };
}
