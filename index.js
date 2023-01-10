const puppeteer = require('puppeteer');

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

  // Wait for the results page to load and display the results.
  console.log('here')
  const resultsSelector = '.tile-tile';
  await page.waitForSelector(resultsSelector);

  // Extract the results from the page.
  const links = await page.evaluate(resultsSelector => {
    return [...document.querySelectorAll(resultsSelector)].map(anchor => {
      const title = anchor.textContent;
      return `${title} - ${anchor.href}`;
    });
  }, resultsSelector);

  // Print all the files.
  console.log(links.join('\n'));

  await browser.close();
})();