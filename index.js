const puppeteer = require('puppeteer');

async function scrapeData() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.nieruchomosci-online.pl/');

  // Select the element you want to scrape, and use the textContent property to get its contents
  const title = await page.$eval('h1', el => el.textContent);

  console.log(title);

  await browser.close();
}

scrapeData();

