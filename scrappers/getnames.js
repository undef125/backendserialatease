const puppeteer = require("puppeteer");
const dotenv = require('dotenv');
dotenv.config({ path: './.env'})
let names = [];

const getName = async (channelName) => {
  console.log(process.env.SITEBASE_URI);
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto(`${process.env.SITEBASE_URI}/Channels/${channelName}`);

  await page.waitForSelector(".link-list");

  const serialName = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".link-list li"), (a) => a.textContent)
  );
  
    names = serialName.map((serial) => serial.split("\n")[1].trim());
  let spliceindex = 0;

    for(let i = 0; i<names.length; i++ ) {
      if(names[i].charCodeAt(0) > names[i+1].charCodeAt(0)) {
        spliceindex = i+1;
        break;
      }
    }
    names.length = spliceindex;
    await browser.close();
    return names;
};

module.exports = getName;
