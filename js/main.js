const currencyCountryMap = {
  "USD": "United States",
  "JPY": "Japan",
  "GBP": "United Kingdom",
  "AUD": "Australia",
  "CAD": "Canada",
  "CHF": "Switzerland",
  "CNY": "China",
  "SEK": "Sweden",
  "NZD": "New Zealand",
  "MXN": "Mexico",
  "SGD": "Singapore",
  "HKD": "Hong Kong",
  "NOK": "Norway",
  "KRW": "South Korea",
  "TRY": "Turkey",
  "INR": "India",
  "BRL": "Brazil",
  "ZAR": "South Africa",
  "RUB": "Russia",
  "AED": "United Arab Emirates",
  "SAR": "Saudi Arabia",
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