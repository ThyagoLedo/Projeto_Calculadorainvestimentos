import { generateRetirnsArray } from "./src/investmentGoals";

const form = document.getElementById("investment-form");

function renderProgression(evt) {
  evt.preventDefault();
  if (document.querySelector(".error")) {
    return;
  }
  const startingAmount = Number(
    document.getElementById("starting-amount").value.replace(",", ".")
  );
  const additionalContribuition = Number(
    document.getElementById("additional-contribution").value.replace(",", ".")
  );
  const timeAmount = Number(document.getElementById("time-amount").value);
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRate = Number(
    document.getElementById("Return-rate").value.replace(",", ".")
  );
  const returnRatePeriod = document.getElementById("evaluation-period").value;
  const taxRate = Number(
    document.getElementById("tax-rate").value.replace(",", ".")
  );

  const returnsArray = generateRetirnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribuition,
    returnRate,
    returnRatePeriod
  );

  console.log(returnsArray);
}
function validateInput(evt) {
  //Target : Aponta extamento o cara que foi o evento, Nesse exemplo aki ele ta pegando o campo que teve desfoque. Outra forma de explicar pegar o elemento que foi disparado
  if (evt.target.value === "") {
    return;
  }
  //Pegando Elemento pai
  const { parentElement } = evt.target;
  //Pegando Elemento Avó
  const grandParentElement = evt.target.parentElement.parentElement;
  //Replace : Substitui um Palavra pela outra
  const inputValue = evt.target.value.replace(",", ".");
  //isNaN : Confere se é número ou nao
  //"||" : Significa "Ou"
  // "&&" : Significa "E"
  //contains : Olha se contem
  // "!" : Inverte o Resultado
  if (
    // A = parentElement.classList.contains("error")
    // B = (isNaN(inputValue)
    // C = Number(inputValue) <= 0)
    // Assim ficando (A e B) ou C. Dica Ficar esperto com a sequencia tabem

    !parentElement.classList.contains("error") &&
    (isNaN(inputValue) || Number(inputValue) <= 0)
  ) {
    const errorTextElement = document.createElement("p"); // CreateElement : Vai Criar o Elemento "P" que eu coloquei. Exp : <p></p>
    //Lembrar "classList" o "L" tem que ser maiusculo se nao nao funciona
    errorTextElement.classList.add("text-red-500"); // Vai pegar o elemento "P" que eu criei e Adicionar uma "Class" com o que eu coloquei. Exp: <p class = 'text-red-500'></p>
    errorTextElement.innerText = "Insira um valor numérico e maior que zero"; //Vai pegar o elemento "p" e o (innerText: Adcionar um texto). Vai colocar o Texto Dentro
    //Resultado = <p class = 'text-red-500'>Insira um valor numérico e maior que zero</p>

    parentElement.classList.add("error");
    //appendChild : vai Pegar o elemento que voce colocar dentro e colocar no ultimo espaco do "grandParentElement". Explicando nesse exemplo : Vai adicionar o Resulta do "errorTextElement" no ultimo lugar dentro do "grandParentElement".
    grandParentElement.appendChild(errorTextElement);
  } else if (
    parentElement.classList.contains("error") &&
    !isNaN(inputValue) &&
    Number(inputValue) > 0
  ) {
    parentElement.classList.remove("error");
    //querySelector : Pesquise o elemento que voce colocar
    grandParentElement.querySelector("p").remove();
  }
}

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validateInput);
  }
}

form.addEventListener("submit", renderProgression);
