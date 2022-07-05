const puppeteer = require('puppeteer');


(async (isbn) => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage();
    await page.setDefaultTimeout(30000000);
    await page.goto(`https://www.google.com/search?q=cairn`);
    await page.waitForSelector('#rso > div:nth-child(1) > div > div > div > div > div > div > div.yuRUbf > a');
    await Promise.all([
        page.click('#rso > div:nth-child(1) > div > div > div > div > div > div > div.yuRUbf > a'),
        page.waitForNavigation({waitUntil: 'networkidle0',}),
    ]);
    await page.mouse.move(0, 0);
    await page.mouse.down();
    await page.mouse.move(190,0);
    await page.mouse.move(190, 16);
    await page.mouse.click(190, 16);
    await page.keyboard.type(isbn)
    await page.mouse.move(525, 16);
    await page.mouse.click(525, 16);

})('9782706121371')


