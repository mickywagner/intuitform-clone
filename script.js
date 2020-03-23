document.addEventListener(
    "blur",
    e => {
      const error = hasError(e.target);

      if(error) {
        showError(e.target, error)
        return
      } else {
        removeError(error)
      }
      
    },
    true
  );

  function showError(field, error) {
    const id = field.id || field.name
    if(!id) return

    let message = field.form.querySelector('.error-message#error-for-' + id)
    
    if(message) {
      return
    } else {
    const message = document.createElement('div')
    message.innerHTML = error
    message.setAttribute('class', 'error-message')
    message.setAttribute('id', 'error-for-' + id)
    field.classList.add('error')
    
    field.parentNode.insertBefore(message, field.nextSibling)
    }
    

  }

  function removeError(field) {
   

  }

  function hasError(field) {
    const validity = field.validity;

    if (validity.valid) return

    if (validity.typeMismatch) return "Please enter a valid email address.";

    if (validity.patternMismatch) {
      if (field.id === "password") {
        const hidden = document.querySelector(".active");
        hidden.classList.remove("hidden");

        const password = field.value;
        let confirmPassword = document.querySelector("#confirmpassword");
        confirmPassword.setAttribute("pattern", password);
      
      }

      if (field.id === "confirmpassword") {
        return 'Password does not match'
      }

      if(field.id === "phone") {
          return 'We strongly recommend adding a phone number. This will verify your account and keep it safe.'
      }

      return "Please use the requested format";
    }
  }