const puppeteer = require('puppeteer');

function Ofert(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();


  await page.goto('https://www.nieruchomosci-online.pl/');

  // Type into search box.
  await page.type('.input-a', 'Gdynia');

  // Wait for suggest overlay to appear and click "show all results".
  const allResultsSelector = '.submit-a';
  await page.waitForSelector(allResultsSelector);
  await page.click(allResultsSelector);

  //Clicks on filter to make the data smaller
  const filterSelector = '.box__us--cta--secondary'
  await page.waitForSelector(filterSelector);
  await page.click(filterSelector);

  //Selects barriers for filter in ---------------MAX PRICE
  const maxPriceFilter = '.mobile_priceto';
  await page.waitForSelector(maxPriceFilter);
  await page.type(maxPriceFilter, '400000');

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