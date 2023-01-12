const puppeteer = require("puppeteer");
let location = "Gdynia";
let priceMax = 400000;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    `${"https://www.nieruchomosci-online.pl/szukaj.html?3,mieszkanie,sprzedaz,,"} + ${location} + ${":,,,,-"} + ${priceMax}`
  );

  const resultsSelector = ".tertiary";
  await page.waitForSelector(".tertiary");
  let offers = await page.evaluate((priceMax, location) => {
    let elements = document.querySelectorAll(".tertiary");
    return Array.from(elements, (element) => {
      return {
        offer: element.innerText.replace(/\n/g, "----------"),
        title: "-----",
        location: 123123123123,
        city: "Gdynia",
        priceMax: 123123123,
      };
    });
  });
  console.log(offers);

  // Print all the files.
  await browser.close();
})();
