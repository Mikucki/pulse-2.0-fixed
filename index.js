const puppeteer = require('puppeteer');

function Ofert(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let localizacion = 'Warszawa'
  let priceMax = 400000

  await page.goto(`${"https://www.nieruchomosci-online.pl/szukaj.html?3,mieszkanie,sprzedaz,,"} + ${localizacion} + ${':,,,,-'} + ${priceMax}`)
  
  

  // Type into search box.
 // await page.type('.input-a', 'Gdynia');
  

  // Wait for the results page to load and display the results.
  const resultsSelector = '.tertiary';
  await page.waitForSelector(resultsSelector);

  // Extract the results from the page.
  const links = await page.evaluate(resultsSelector => {
    return [...document.querySelectorAll(resultsSelector)].map(anchor => {
      const title = anchor.textContent;
      return `${title} ${'---------------------------------------------------------------'}`;
    });
  }, resultsSelector);
  

  // Print all the files.
  console.log(links.join())
  await browser.close();
})();