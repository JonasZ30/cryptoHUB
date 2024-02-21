const request = require('request');
const fs = require('fs');

function fetchCryptoListingData() {
  const apiKey = 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c';  
  request.get({
    url: 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    headers: {
      'X-CMC_PRO_API_KEY': '17cc4610-9bc1-465a-8aa6-cca849f5e51a'
    },
    json: true  
  }, function(error, response, body) {
    if (error) {
      console.error('Request failed:', error);
      return;
    }
    if (response.statusCode !==  200) {
      console.error('Error:', response.statusCode, body);
      return;
    }
    
    // Save the JSON data to a file
    fs.writeFile('./public/js/cryptoData.json', JSON.stringify(body, null,  2), (err) => {
      if (err) {
        console.error('Failed to write JSON data to file:', err);
      } else {
        console.log('JSON data saved to cryptoData.json');
      }
    });
  });
}
module.exports = {
    fetchCryptoListingData,
}
