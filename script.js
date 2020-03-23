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

      return "List of conditions";
    }

    if (field.id === "confirmpassword") {
      return "Confirm password field does not match the password field.";
    }

    if (field.id === "phone") {
      return "Please enter a valid phone number.";
    }

    return "Please use the requested format";
  }
}

//   <template>
//             <ul>
//               <li>Use 8 or more characters</li>
//               <li>Use upper and lower case letters(e.g. Aa)</li>
//               <li>Use a number (e.g. 1234)</li>
//               <li>Use a symbol (e.g. !A#$)</li>
//             </ul>
//           </template>
