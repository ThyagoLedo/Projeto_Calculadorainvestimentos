function convertToMontlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}

export function generateRetirnsArray(
  startingAmaunt = 0,
  timeHorizon = 0,
  timePeriod = "monthly",
  monthlcontribution = 0,
  returnRate = 0,
  returbiTumeFrame = "monthly "
) {
  if (!timeHorizon || !startingAmaunt) {
    throw new Error(
      "Investimento inicial e prazo devem ser preenchidos com valores positivos."
    );
  }

  const finalReturnRate =
    returbiTumeFrame === "monthly"
      ? 1 + returnRate / 100
      : convertToMontlyReturnRate(1 + returnRate / 100);

  const finalTimeHorizon =
    //Estrutua do if Basico
    // "===" : caso seja exatamente igual
    //
    timePeriod === "monthly" ? timeHorizon : timeHorizon * 12;

  const referenciInvestmentObject = {
    investedAmount: startingAmaunt,
    interestReturns: 0,
    totalInterstReturns: 0,
    month: 0,
    totalAmount: startingAmaunt,
  };

  const returnsArray = [referenciInvestmentObject];
  for (
    let timereference = 1;
    timereference <= finalTimeHorizon;
    timereference++
  ) {
    const totalAmount =
      returnsArray[timereference - 1].totalAmount * finalReturnRate +
      monthlcontribution;
    const interestReturns =
      returnsArray[timereference - 1].totalAmount * (finalReturnRate - 1);
    const investedAmount = startingAmaunt + monthlcontribution * timereference;
    const totalInterstReturns = totalAmount - investedAmount;
    returnsArray.push({
      // Caso o nome seja igual nao precisa do ":" e ser chamado duas vez, Fazendo com o codigo seja mais limpo
      investedAmount: investedAmount,
      interestReturns,
      totalInterstReturns,
      month: timereference,
      totalAmount,
    });
  }

  return returnsArray;
}
