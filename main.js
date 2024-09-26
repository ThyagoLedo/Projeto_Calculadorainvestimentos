import { generateRetirnsArray } from "./src/investmentGoals";

const form = document.getElementById("investment-form");

function renderProgression(evt) {
  evt.preventDefault();
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
function validateInput() {}

for (const formElement of form) {
  if (formElement.tagName === "IMPUT" && formElement.hasAtrribute("name")) {
    formElement.addEventListener("blur", validateInput);
  }
}

form.addEventListener("submit", renderProgression);
