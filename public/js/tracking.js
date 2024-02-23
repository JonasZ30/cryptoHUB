/**
# @author Jonas Svay <svay.jonas6@gmail.com>
# @version CryptoHUB 1.0
# Changes: -
# Date 23.02.2024
#
# Description: Real-time stock market website
#
#============================================
#
#              CryptoHUB
#
#============================================
 */

// Fetching HTML elements for different cryptocurrencies
const btc = document.getElementById("bitcoin");
const ltc = document.getElementById("litecoin");
const eth = document.getElementById("ethereum");
const doge = document.getElementById("dogecoin");
const crd = document.getElementById("cardano");
const tet = document.getElementById("tether");
const chl = document.getElementById("chainlink");
const rip = document.getElementById("ripple");
const bnc = document.getElementById("binancecoin");
const sol = document.getElementById("solana");
const hel = document.getElementById("helium");
const mon = document.getElementById("monero");

// API URL for fetching live cryptocurrency prices
const liveprice = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Clitecoin%2Cethereum%2Cdogecoin%2Cripple%2Ccardano%2Cbinancecoin%2Cchainlink%2Ctether%2Csolana%2Cripple%2Cmonero%2Chelium&vs_currencies=usd%2Ceur";

// Fetching live cryptocurrency prices from the API
fetch(liveprice)
    .then(response => {
        // Error message
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    // Updating HTML elements with live cryptocurrency prices
    .then(data => {
        btc.innerHTML = data.bitcoin.usd;
        ltc.innerHTML = data.litecoin.usd;
        eth.innerHTML = data.ethereum.usd;
        doge.innerHTML = data.dogecoin.usd;
        crd.innerHTML = data.cardano.usd;
        tet.innerHTML = data.tether.usd;
        chl.innerHTML = data.chainlink.usd;
        rip.innerHTML = data.ripple.usd;
        bnc.innerHTML = data.binancecoin.usd;
        sol.innerHTML = data.solana.usd;
        hel.innerHTML = data.helium.usd;
        mon.innerHTML = data.monero.usd;
    })
    // Catch error during API call
    .catch(error => {
        console.error('Error fetching cryptocurrency data:', error);
    });
