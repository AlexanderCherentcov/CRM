// Создаем popup
import * as htmlElements from "./htmlElements.js";

export function getPopup(addContent, titleText, popupId, textId) {
  const popup = htmlElements.getDiv("popup");
  popup.classList.add("popup");
  popup.id = popupId;
  const popupBody = htmlElements.getDiv("popup__wrapper");
  const popupContent = htmlElements.getDiv("popup__content");

  // Заголовок и ID
  const popupTitleBlock = htmlElements.getDiv("popup__title-block");
  const popupTitle = document.createElement("h3");
  popupTitle.classList.add("popup__title");
  popupTitle.textContent = titleText;
  const popupClientId = htmlElements.getSpan("popup__client-id", textId, "client-id");
  popupTitleBlock.append(popupTitle, popupClientId);

  // Функция закрытия popup
  function closePopup() {
    popup.classList.remove("open");
    bodyHidden.classList.remove("hidden");
  }

  // Закрытие popup с клавиши esc
  const bodyHidden = document.body;
  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "Escape") {
      closePopup();
    }
  });

  // Закрытие popup на область вне окна
  popupBody.addEventListener("click", (event) => {
    if (event.target === popupBody) {
      closePopup();
    }
  });

  // Кнопка закрытия popup
  const closedPopup = htmlElements.getBtn("popup__close", "x", "popup-closed");
  closedPopup.addEventListener("click", function () {
    closePopup();
  });

  popupContent.append(closedPopup, popupTitleBlock, addContent);
  popupBody.append(popupContent);
  popup.append(popupBody);
  document.body.append(popup);

  return { popup, popupClientId, popupTitle, popupContent, bodyHidden };
}
