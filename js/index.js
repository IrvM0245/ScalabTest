/*Campo nombre y apellido no debe estar vacío y contener al menos un espacio.
Campo correo debe tener un correo válido.
Campo número de teléfono debe tener entre 7 y 15 dígitos, pudiendo tener un + al inicio, ignorando espacios en blanco.
Campo comentario debe tener al menos 20 caracteres.
En caso de pasar las validaciones, enviar petición a la API entregada en clase (https://30kd6edtfc.execute-api.us-east-1.amazonaws.com/prod/send-email) usando fetch*/

let isDataCorrect = false;
let errorLabel = "";
const botonEnviar = document.getElementsByName("btn_enviar")[0];
const errorsList = document.getElementById("errors");
let formDatos = document.querySelector(".form-landing-page");
let inputName = document.getElementsByName("name_contact")[0];
let regExpName = new RegExp(/^([A-Z][A-Za-z ]{3,60})$/);
let inputEmail = document.getElementsByName("email_contact")[0];
let regExpEmail = new RegExp(/^\w{3,}\@\w{3,}\.\w+$/);
let inputPhone = document.getElementsByName("phone_contact")[0];
let regExpPhone = new RegExp(/^\+?\d{7,15}$/);
let inputComment = document.getElementsByName("commit_contact")[0];
let regExpComment = new RegExp(/^.{20,}$/);

inputName.addEventListener("keyup", nameValidation);
inputEmail.addEventListener("keyup", emailValidation);
inputPhone.addEventListener("keyup", phoneNumberValidation);
inputComment.addEventListener("keyup", commentValidation);
botonEnviar.addEventListener("click", sendInformation);

function nameValidation(e) {
  isDataCorrect = fieldValidation(regExpName, inputName);
  if (!isDataCorrect) {
    addError(
      inputName,
      "nombre y apellido no debe estar vacío y contener al menos un espacio"
    );
  }
}
function emailValidation(e) {
  isDataCorrect = fieldValidation(regExpEmail, inputEmail);
  if (!isDataCorrect) {
    addError(inputEmail, "correo debe tener un correo válido");
  }
}
function phoneNumberValidation(e) {
  isDataCorrect = fieldValidation(regExpPhone, inputPhone);
  if (!isDataCorrect) {
    addError(
      inputPhone,
      "número de teléfono debe tener entre 7 y 15 dígitos, pudiendo tener un + al inicio, ignorando espacios en blanco"
    );
  }
}
function commentValidation(e) {
  isDataCorrect = fieldValidation(regExpComment, inputComment);
  if (!isDataCorrect) {
    addError(
      inputComment,
      "Campo comentario debe tener al menos 20 caracteres"
    );
  }
}

function fieldValidation(regExp, input) {
  if (!regExp.test(input.value)) {
    input.style.color = "red";
    return false;
  } else {
    input.style.color = "blue";
    cleanErrors();
    return true;
  }
}

function sendInformation() {
  if (isDataCorrect) {
    sendRequest(
      "https://30kd6edtfc.execute-api.us-east-1.amazonaws.com/prod/send-email",
      JSON.stringify(
        inputName.value,
        inputEmail.value,
        inputPhone.value,
        inputComment.value
      )
    ).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  } else {
    alert("Necesita cumplir los requisistos de los campos.");
  }
}

function addError(element, message) {
  cleanErrors();
  if (element.value) {
    if (!errorLabel.includes(`<li>${message}</li>`)) {
      errorLabel += `<li>${message}</li>`;
    }
  }
  showErrorMessage();
}

function showErrorMessage() {
  errorsList.innerHTML = errorLabel;
}

function cleanErrors() {
  errorLabel = "";
  errorsList.innerHTML = "";
}

async function sendRequest(url, data = {}) {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
