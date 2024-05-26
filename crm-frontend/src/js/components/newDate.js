import * as htmlElements from "./htmlElements.js";

export function getDateTime(key) {
  const dateBlock = htmlElements.getDiv("client__date-block");
  const dateClient = htmlElements.getSpan("client__date", `${new Date(key).toLocaleDateString()} `, "");
  const timeClient = htmlElements.getSpan("client__time", `${new Date(key).getHours()}:${new Date(key).getMinutes()}`, "");
  dateBlock.append(dateClient, timeClient);
  return dateBlock;
}

export function newDate(key) {
  let newDate = new Date(key);
  newDate.toLocaleDateString();
  newDate.getHours();
  newDate.getMinutes();
  return newDate;
}
