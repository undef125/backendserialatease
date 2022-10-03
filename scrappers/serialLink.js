const puppeteer = require("puppeteer");
const puppeteercore = require("puppeteer-core");
const dotenv = require('dotenv');
dotenv.config({ path: './.env'})

const getVideoLink = async (channelName, serialName) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(`${process.env.SITEBASE_URI}/Channels/${channelName}`);
  await page.click(`a[title="${serialName}"]`);

  await page.waitForSelector(".time-date");

  await page.$eval(".time-date", async (el) => {
    await el.click();
  });

  await page.waitForTimeout(1000);
  const hrefs = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]"), (a) =>
      a.getAttribute("href")
    )
  );
  const go = hrefs.filter((item) =>
    item.includes(
      `${serialName
        .split(" ")
        .join("")
        .toLocaleLowerCase()
        .split("")
        .reverse()
        .join("")}`
    )
  );
  await page.goto(go[0]);

  await browser.close();

  const browser1 = await puppeteer.launch({
    executablePath:
      "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: true,
    args: ["--start-maximized"],
  });
  const page1 = await browser1.newPage();
  await page1.goto(go[0]);
  await page1.waitForSelector('iframe[scrolling="no"]');
  const iframelink = await page1.$(`iframe[scrolling="no"]`);
  const finalvideolink = await await (
    await iframelink.getProperty("src")
  ).jsonValue();
  await browser1.close();
  return finalvideolink;
};

module.exports = getVideoLink;
