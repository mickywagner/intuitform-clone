document.addEventListener(
  "blur",
  e => {
    const error = hasError(e.target);

    if (error) {
      showError(e.target, error);
      return;
    } else {
      removeError(e.target);
    }
  },
  true
);

function showError(field, error) {
  const id = field.id || field.name;
  if (!id) return;

  let message = field.form.querySelector(".error-message#error-for-" + id);

  if (message) {
    return;
  } else {
    const message = document.createElement("div");
    message.innerHTML = error;
    message.setAttribute("class", "error-message");
    message.setAttribute("id", "error-for-" + id);
    field.classList.add("error");

    field.parentNode.insertBefore(message, field.nextSibling);
  }
}

function removeError(field) {
  field.classList.remove("error");
  const id = field.id || field.name;
  if (!id) return;

  const message = field.form.querySelector(".error-message#error-for-" + id);
  if (!message) return;

  message.innerHTML = "";
  message.style.display = "none";
  message.styel.visibility = "hidden";
}

function hasError(field) {
  const validity = field.validity;

  if (validity.valid) return;

  if (validity.typeMismatch) return "Please enter a valid email address.";

  if (validity.patternMismatch) {
    if (field.id === "password") {
      const hidden = document.querySelector(".active");
      hidden.classList.remove("hidden");

      const password = field.value;
      let confirmPassword = document.querySelector("#confirmpassword");
      confirmPassword.setAttribute("pattern", password);

      return "Password must be 8 or more characters, contain an upper and lower case letter, at least 1 number, and 1 symbol.";
    }

    if (field.id === "confirmpassword") {
      return "Confirm password field does not match the password field.";
    }

    if (field.id === "phone") {
      phoneMsg.innerHTML = ''
      return "Please enter a valid phone number.";
    }

    return "Please use the requested format";
  }
}

const phoneMsg = document.querySelector('.phoneMsg')
