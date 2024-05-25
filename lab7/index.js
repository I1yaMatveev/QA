const mbHelper = require('mountebank-helper');

const currencies = {
    'USD': 73.4419,
    'EUR': 79.7264,
    'RUB': 1.0,
    'GBP': 99.097,   
    'JPY': 0.6510,  
    'CNY': 13.4393,   
};

const currencyList = ['USD', 'EUR', 'RUB', 'GBP', 'JPY', 'CNY'];

const imposter = new mbHelper.Imposter({ 'imposterPort': 3000 });

const responseAll = {
    'uri': 'all',
    'verb': 'GET',
    'res': {
        'statusCode': 200,
        'responseHeaders': { 'Content-Type': 'application/json' },
        'responseBody': JSON.stringify(currencies),
    }
};

imposter.addRoute(responseAll);

currencyList.forEach(currency => {
    const currenciesCopy = { ...currencies }; 
    const value = currencies[currency]; 

    currencyList.forEach(item => {
        currenciesCopy[item] = (currenciesCopy[item] / value).toFixed(2);
    });

    const responseCurrency = {
        'uri': currency,
        'verb': 'GET',
        'res': {
            'statusCode': 200,
            'responseHeaders': { 'Content-Type': 'application/json' },
            'responseBody': JSON.stringify(currenciesCopy),
        }
    };

    imposter.addRoute(responseCurrency);
});

const responseError = {
    'uri': '/.*',
    'verb': 'GET',
    'res': {
        'statusCode': 404,
        'responseHeaders': { 'Content-Type': 'application/json' },
        'responseBody': JSON.stringify({'Error': 'Invalid URL'}),
    }
};

imposter.addRoute(responseError);

mbHelper.startMbServer(2525)
    .then(() => {
        imposter.postToMountebank()
            .then(() => {
                console.log('Imposter successfully posted. http://localhost:3000');
            });
    });