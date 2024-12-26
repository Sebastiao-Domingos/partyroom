export function formatPerPrice(price: number) {
  let priceString = price.toString().split(".")[0];
  let contador = 1;
  for (let i = priceString.length - 1; i > 0; i--, contador++) {
    if (contador % 3 === 0) {
      priceString =
        priceString.substring(0, i) + "." + priceString.substring(i);
    } else if (i === 0 && priceString.charAt(i) === "-") {
      priceString = "-" + priceString.substring(i + 1);
    }
  }
  return priceString + ",00";
}
