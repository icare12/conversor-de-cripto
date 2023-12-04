document.addEventListener('DOMContentLoaded', function() {
  const bitcoinPriceElement = document.getElementById('bitcoin-price');
  const ethereumPriceElement = document.getElementById('ethereum-price');
  const dogecoinPriceElement = document.getElementById('dogecoin-price');
  const updateTimeElement = document.getElementById('update-time');

  function fetchCryptoPrices() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd')
      .then(response => response.json())
      .then(data => {
        bitcoinPriceElement.textContent = `$${data.bitcoin.usd}`;
        ethereumPriceElement.textContent = `$${data.ethereum.usd}`;
        dogecoinPriceElement.textContent = `$${data.dogecoin.usd}`;
        updateInfo();
      })
      .catch(error => console.error('Error fetching crypto prices:', error));
  }

  function updateInfo() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const updateTime = `${hours}:${minutes}:${seconds}`;
    updateTimeElement.textContent = updateTime;
  }

  function startClock() {
    setInterval(updateInfo, 1000); // Actualizar cada segundo
  }

  fetchCryptoPrices();
  setInterval(fetchCryptoPrices, 10000); // Actualizar cada 10 segundos para demostración
  startClock();
});

