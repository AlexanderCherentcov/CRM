import { getBtn, getLi } from "./htmlElements.js";
import { render } from "./render.js";
export function autocomplete(selector, data, selectorWrap, selectorList, arr) {
  let inputs = document.querySelectorAll(selector);

  function ciSearch(what = "", where = "") {
    return where.toUpperCase().search(what.toUpperCase());
  }

  inputs.forEach((input) => {
    input.classList.add("autocomplete__input");
    let wrap = document.getElementById(selectorWrap);

    let list = document.getElementById(selectorList);

    let matches = [];
    let listItems = [];
    let focusedItem = -1;

    function setActive(active = true) {
      if (active) {
        wrap.classList.add("active");
        list.classList.add("active-list");
      } else {
        wrap.classList.remove("active");
        list.classList.remove("active-list");
      }
    }

    function focusItem(index) {
      if (!listItems.length) return false;
      if (index > listItems.length - 1) return focusItem(0);
      if (index < 0) return focusItem(listItems.length - 1);
      focusedItem = index;
      unfocusAllItems();
      listItems[focusedItem].classList.add("focused");
    }
    function unfocusAllItems() {
      listItems.forEach((item) => {
        item.classList.remove("focused");
      });
    }
    function selectItem(index) {
      if (!listItems[index]) return false;
      input.value = listItems[index].innerText;
      setTimeout(() => {
        render(arr);
      }, 1000);
      setActive(false);
    }

    input.addEventListener("input", () => {
      let value = input.value;
      if (!value) return setActive(false);

      list.innerHTML = "";
      listItems = [];

      data.forEach((dataItem, index) => {
        let search = ciSearch(value, dataItem);
        if (search === -1) return false;
        matches.push(index);

        let parts = [dataItem.substr(0, search), dataItem.substr(search, value.length), dataItem.substr(search + value.length, dataItem.length - search - value.length)];

        let item = getLi("autocomplete__item", "");
        item.innerHTML = `${parts[0]}<strong>${parts[1]}</strong>${parts[2]}`;
        list.appendChild(item);
        listItems.push(item);

        item.addEventListener("click", function () {
          selectItem(listItems.indexOf(item));
        });
      });

      if (listItems.length > 0) {
        focusItem(0);
        setActive(true);
      } else setActive(false);
    });

    input.addEventListener("keydown", (e) => {
      let keyCode = e.keyCode;

      if (keyCode === 40) {
        // arrow down
        e.preventDefault();
        focusedItem++;
        focusItem(focusedItem);
      } else if (keyCode === 38) {
        //arrow up
        e.preventDefault();
        if (focusedItem > 0) focusedItem--;
        focusItem(focusedItem);
      } else if (keyCode === 27) {
        // escape
        setActive(false);
      } else if (keyCode === 13) {
        // enter
        selectItem(focusedItem);
      }
    });

    document.body.addEventListener("click", function (e) {
      if (!wrap.contains(e.target)) setActive(false);
    });
  });
}
