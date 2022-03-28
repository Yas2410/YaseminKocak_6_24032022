/*****
OUVRIR & FERMER LE FORMULAIRE
*****/
const formData = document.querySelectorAll(".formData");
const form = document.querySelector("#signup");
const modal = document.getElementById("bground");

function displayModal() {
  const modal = document.getElementById("bground");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("bground");
  modal.style.display = "none";
}

/*****
DONNEES DU FORMULAIRE :
MESSAGES ERREUR / VALIDATION
*****/
const lastnameEl = document.querySelector("#lastname");
const firstnameEl = document.querySelector("#firstname");
const emailEl = document.querySelector("#email");
const messageEl = document.querySelector("#message");

//Validation du Prénom
const checkFirstname = () => {
  let valid = false;
  const min = 2;
  const firstnameRegex = /^[a-zA-ZèéêëïôöüñçÈÉÊËÏÔÖÜÑÇ ,.'-]/;
  const firstname = firstnameEl.value.trim();
  if (!isRequired(firstname)) {
    showError(firstnameEl, "Veuillez saisir votre prénom.");
  } else if (!isMinimum(firstname.length, min)) {
    showError(
      firstnameEl,
      `Votre saisie doit comporter au minimum ${min} caractères.`
    );
  } else if (!firstnameEl.value.trim().match(firstnameRegex)) {
    showError(
      firstnameEl,
      "Votre saisie ne peut contenir de caractères numériques."
    );
  } else {
    showSuccess(firstnameEl);
    valid = true;
  }
  return valid;
};

//Validation du Nom
const checkLastname = () => {
  let valid = false;
  const min = 2;
  const lastnameRegex = /^[a-zA-ZèéêëïôöüñçÈÉÊËÏÔÖÜÑÇ ,.'-]/;
  const lastname = lastnameEl.value.trim();
  if (!isRequired(lastname)) {
    showError(lastnameEl, "Veuillez saisir votre nom.");
  } else if (!isMinimum(lastname.length, min)) {
    showError(
      lastnameEl,
      "Votre saisie doit comporter au minimum ${min} caractères."
    );
  } else if (!lastnameEl.value.trim().match(lastnameRegex)) {
    showError(
      lastnameEl,
      "Votre saisie ne peut contenir de caractères numériques."
    );
  } else {
    showSuccess(lastnameEl);
    valid = true;
  }
  return valid;
};

//Validation de l'adresse mail
const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Veuillez saisir votre adresse mail.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Votre adresse mail n'est pas valide.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

//Validation du Message
const checkMessage = () => {
  let valid = false;
  const max = 1000;
  const message = messageEl.value.trim();
  if (!isRequired(message)) {
    showError(messageEl, "Veuillez saisir votre message.");
  } else if (!isMaximum(message.length, max)) {
    showError(messageEl, `Votre message ne peut excéder ${max} caractères.`);
  } else {
    showSuccess(messageEl);
    valid = true;
  }
  return valid;
};

//Je vérifie que l'ensemble de mes champs de formulaire est valide :
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isFirstnameValid = checkFirstname(),
    isLastnameValid = checkLastname(),
    isEmailValid = checkEmail(),
    isMessageValid = checkMessage();

  let isFormValid =
    isFirstnameValid && isLastnameValid && isEmailValid && isMessageValid;

  //Si mon formulaire s'avère valide, je le reset et
  //je fais apparaître un message de confirmation
  if (isFormValid) {
    form.reset(); //Reset du formulaire et remise à zéro des entrées
    showConfirmMessage(); //Message de confirmation d'envoi du formulaire
    console.log(
      "L'utilisateur avec l'adresse mail suivante vous a envoyé un message :"
    );
  }
});

/*****
RESET FORM + MESSAGE DE CONFIRMATION
*****/
//Lorsque mon formulaire remplit toutes les conditions : form.reset();
// ET j'ajoute un message de confirmation showConfirmMessage();
const modalConfirm = document.getElementById("confirm__message");
function showConfirmMessage() {
  form.style.display = "none";
  modalConfirm.style.display = "block";
}
//Sur mon message de confirmation, je créé un évènement afin de pouvoir fermer la modale au clic et revenir ainsi sur ma page d'accueil
const closeConfirmMessage = document.querySelector(".btn__message");
closeConfirmMessage.addEventListener("click", closeMessage);
function closeMessage() {
  modalConfirm.style.display = "none";
  window.location.reload();
}

/*****
 *****/
//Je créé les variables qui vont permettre de mettre en place des
//obligations quant aux entrées dans le formulaire
const isRequired = (value) => (value === "" ? false : true);
const isMinimum = (length, min) => (length < min ? false : true);
const isMaximum = (length, max) => (length > max ? false : true);
const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

//En cas d'erreur sur mon champ de formulaire :
// Je fais apparaître ma classe "error" qui va encadrer l'input en rouge
// Et informer l'utilisateur avec un message indiquant l'erreur
const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.textContent = message;
};

//Si tout est OK sur mon champ de formulaire :
// Je fais apparaître ma classe "success" qui va encadrer l'input en vert
// Et informer l'utilisateur que l'entrée est valide
const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");
  const error = formField.querySelector("small");
  error.textContent = "";
};

/*****
BONUS
 *****/
//Faire apparaitre "en direct" si un input est valide ou non
const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "firstname":
        checkFirstname();
        break;
      case "lastname":
        checkLastname();
        break;
      case "email":
        checkEmail();
        break;
      case "message":
        checkMessage();
        break;
    }
  })
);
