// Вспомогательные функции

// Возвращает div
export function getDiv(classDiv) {
  const div = document.createElement("div");
  div.classList.add(classDiv);
  return div;
}

// Возвращает span
export function getSpan(classSpan, textSpan, spanId) {
  const span = document.createElement("span");
  span.classList.add(classSpan);
  span.id = spanId;
  span.textContent = textSpan;
  return span;
}

// Возвращает button
export function getBtn(classBtn, textBtn, btnId) {
  const btn = document.createElement("button");
  btn.classList.add(classBtn);
  btn.id = btnId;
  btn.textContent = textBtn;
  return btn;
}

// Возвращает input
export function getInput(classInp, idInp, typeInp, textInp) {
  const input = document.createElement("input");
  input.classList.add(classInp);
  input.id = idInp;
  input.type = typeInp;
  input.placeholder = textInp;
  return input;
}

// Возвращает ссылку
export function getLink(classLink, idLink, hrefLink, textLink) {
  const link = document.createElement("a");
  link.classList.add(classLink);
  link.id = idLink;
  link.href = hrefLink;
  link.textContent = textLink;
  return link;
}

// Возвращает изображения
export function getImg(classImg, idImg, srcImg, imgAlt) {
  const img = document.createElement("img");
  img.classList.add(classImg);
  img.id = idImg;
  img.src = srcImg;
  img.alt = imgAlt;
  return img;
}

// Возвращает форму
export function getForm(classForm, idForm, actionForm) {
  const from = document.createElement("form");
  from.classList.add(classForm);
  from.id = idForm;
  from.action = actionForm;
  return from;
}

// Возвращаем список
export function getUl(classUl, idUl) {
  const ul = document.createElement("ul");
  ul.classList.add(classUl);
  ul.id = idUl;
  return ul;
}

// Возвращает элемент списка
export function getLi(classLi, idLi) {
  const li = document.createElement("li");
  li.classList.add(classLi);
  li.id = idLi;
  return li;
}

// Возвращает таблицу
export function getTable(classTable, idTable) {
  const table = document.createElement("table");
  table.classList.add(classTable);
  table.id = idTable;
  return table;
}

export function getTr(classTr) {
  const tr = document.createElement("tr");
  tr.classList.add(classTr);
  return tr;
}

export function getTh(classTh) {
  const th = document.createElement("th");
  th.classList.add(classTh);
  return th;
}

export function getTd(classTd) {
  const td = document.createElement("td");
  td.classList.add(classTd);
  return td;
}

// Возвращает select
export function getSelect(classSelect) {
  const select = document.createElement("select");
  select.classList.add(classSelect);
  return select;
}

// Возвращает option
export function getOption(classOption, textOption, valueOption, idOption = "") {
  const option = document.createElement("option");
  option.classList.add(classOption);
  option.textContent = textOption;
  option.value = valueOption;
  option.id = idOption;
  return option;
}
