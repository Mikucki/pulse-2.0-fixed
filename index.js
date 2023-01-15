const puppeteer = require("puppeteer");
let location = "Gdynia";
let priceMax = 400000;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    `${"https://www.nieruchomosci-online.pl/szukaj.html?3,mieszkanie,sprzedaz,,"}${location}${":,,,,-"}${priceMax}`
  );

  const resultsSelector = ".tiles";
  await page.waitForSelector(".tiles");
  let offers = await page.evaluate(() => {
    let elements = document.querySelectorAll(".tiles");
    return Array.from(elements, (element) => {
      return {
        offer: element.innerText.replace(/\n/g, "-------------------------"),
      };
    });
  });

  console.log(offers);
  await browser.close();
})();
