const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");

let dolarToday = 0;
let euroToday = 0;
let libraToday = 0;
let bitcoinToday = 0;

// Função para buscar as cotações da API
async function fetchCurrencyRates() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL');
    const data = await response.json();

    dolarToday = data.USDBRL.high;
    euroToday = data.EURBRL.high;
    libraToday = data.GBPBRL.high;
    bitcoinToday = data.BTCBRL.high;
}

async function convertValues() {
    const inputCurrencyValue = document.querySelector(".input-currency").value;
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert"); //valor em real
    const currencyValueConverted = document.querySelector(".currency-value"); //Outras moedas

    await fetchCurrencyRates(); // Atualiza as cotações antes de converter

    if(currencySelect.value == "dolar") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue / dolarToday);
    }

    if(currencySelect.value == "euro") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue / euroToday);
    }

    if(currencySelect.value == "libra") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(inputCurrencyValue / libraToday);
    }

    if(currencySelect.value == "bitcoin") {
        currencyValueConverted.innerHTML = (inputCurrencyValue / bitcoinToday).toFixed(8) + " BTC";
    }

    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue);
}

function changeCurrency() {
    const currencyName = document.getElementById('currency-name');
    const currencyImage = document.querySelector('.currency-img');

    if(currencySelect.value == 'dolar') {
        currencyName.innerHTML = 'Dólar americano';
        currencyImage.src = './assets/estados-unidos (1) 1.png';
    }

    if(currencySelect.value == 'euro') {
        currencyName.innerHTML = 'Euro';
        currencyImage.src = './assets/euro.png';
    }

    if(currencySelect.value == 'libra') {
        currencyName.innerHTML = 'Libra';
        currencyImage.src = './assets/libra 1.png';
    }

    if(currencySelect.value == 'bitcoin') {
        currencyName.innerHTML = 'Bitcoin';
        currencyImage.src = './assets/bitcoin 1.png';
    }

    convertValues();
}

currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);

// Carrega as cotações assim que abrir o site
fetchCurrencyRates();
