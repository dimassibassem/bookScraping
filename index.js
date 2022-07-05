const puppeteer = require('puppeteer');

(async () => {
    const isbn = '9782200355470'
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(`https://isbnsearch.org/isbn/${isbn}`, {waitUntil: 'load', timeout: 0});
    setTimeout(() => {
    console.log('5 sec delay');
    }, 5000);
    // await page.mouse.click(80, 310);
    const data = await page.evaluate(async () => {
        const button = document.querySelector('#recaptcha > div');
        return document.querySelector('#book > div.bookinfo');
    });

    console.log(data)
})();
