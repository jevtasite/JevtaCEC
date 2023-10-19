const currencyCountryMap = {
  "USD": "SAD",
  "JPY": "Japan",
  "GBP": "Ujedinjeno Kraljevstvo",
  "AUD": "Australija",
  "CAD": "Kanada",
  "CHF": "Švajcarska",
  "CNY": "Kina",
  "SEK": "Švedska",
  "NZD": "Novi Zeland",
  "MXN": "Meksiko",
  "SGD": "Singapur",
  "HKD": "Hong Kong",
  "NOK": "Norveška",
  "KRW": "Južna Koreja",
  "TRY": "Turska",
  "INR": "Indija",
  "BRL": "Brazil",
  "ZAR": "Južna Afrika",
  "RUB": "Rusija",
  "AED": "UAE",
  "SAR": "Saudijska Arabija",
};

const fromCurrencyDropdown = document.getElementById('fromCurrency');
const toCurrencyDropdown = document.getElementById('toCurrency');

fetch('https://open.er-api.com/v6/latest/USD')
.then(res => {
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
})
.then(data => {
  const currencyData = data.rates;

  for (const currency in currencyData) {
    if (currencyData.hasOwnProperty(currency) && currencyCountryMap[currency]) {

      const fromOption = document.createElement('option');
      fromOption.value = currency;
      fromOption.text = `${currency} - ${currencyCountryMap[currency]}`;
      fromCurrencyDropdown.appendChild(fromOption);

      const toOption = document.createElement('option');
      toOption.value = currency;
      toOption.text = `${currency} - ${currencyCountryMap[currency]}`;
      toCurrencyDropdown.appendChild(toOption);
    }
  }
})
.catch(error => console.log(error));


document.getElementById('calculate').addEventListener('click', () => {
  const fromCurrency = fromCurrencyDropdown.value;
  const toCurrency = toCurrencyDropdown.value;
  const amount = parseFloat(document.getElementById('amount').value);

  fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
      .then(res => res.json())
      .then(data => {
          const toCurrencyRate = data.rates[toCurrency];
          const result = (amount * toCurrencyRate).toFixed(2);
          document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
      })
      .catch(error => console.log(error));
});