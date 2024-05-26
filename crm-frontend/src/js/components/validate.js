export function validation(form) {
  let validationResult = true;

  function removeError(input) {
    const parent = input.parentNode;

    if (parent.classList.contains("error")) {
      parent.querySelector(".error-label").remove();
      parent.classList.remove("error");
    }
  }

  function createError(input, text) {
    const parent = input.parentNode;
    const errorLabel = document.createElement("label");

    errorLabel.classList.add("error-label");
    errorLabel.textContent = text;

    parent.classList.add("error");

    parent.append(errorLabel);
  }

  form.querySelectorAll("input").forEach((input) => {
    removeError(input);
    // Валидация текстовых полей
    if (input.dataset.require == "true") {
      if (input.value.length < 3) {
        removeError(input);
        createError(input, "Поле должно содержать не менее 3 символов");
        validationResult = false;
      }

      if (input.value.length > 20) {
        removeError(input);
        createError(input, "Поле не должно содержать больше 20 символов");
        validationResult = false;
      }

      if (input.value === "") {
        removeError(input);
        createError(input, "Введите данные");
        validationResult = false;
      }
    }

    if (input.dataset.email == "true") {
      if (input.value.includes("@", ".") === false ) {
        removeError(input);
        createError(input, "E-mail должен содержать @ и .");
        validationResult = false;
      }
    }

    if (input.dataset.phone == "true") {
      console.log(input.value.length);
      if (input.value.length > 11) {
        removeError(input);
        createError(input, "Номер должен содержать не более 11 символов!");
        validationResult = false;
      }

      if (input.value.length < 11) {
        removeError(input);
        createError(input, "Номер должен содержать не менее 11 символов!");
        validationResult = false;
      }

      if (input.value == "") {
        removeError(input);
        createError(input, "Заполните поля!");
        validationResult = false;
      }
    }
  });
  return validationResult;
}
