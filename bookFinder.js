// 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸

const puppeteer = require('puppeteer');


(async (isbn) => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setDefaultTimeout(30000000);
    await page.goto(`https://www.bookfinder.com/search/?isbn=${isbn}&mode=isbn&st=sr&ac=qr`);
    await page.waitForSelector('#describe-isbn-title');
    const data = await page.evaluate(() => {
        const title = document.querySelector('#describe-isbn-title').textContent
        const By = document.querySelector('#bd-isbn > div > div.attributes > div:nth-child(2) > p > strong > a > span').textContent;
        const publisher = document.querySelector('#bd-isbn > div > div.attributes > p:nth-child(3) > span.describe-isbn').textContent;
        const ISBN = document.querySelector('#bd-isbn > div > div.attributes > div:nth-child(1) > h1').textContent;
        const Edition = document.querySelector('#bd-isbn > div > div.attributes > p:nth-child(4) > span.describe-isbn').textContent;
        const language = document.querySelector('#bd-isbn > div > div.attributes > p:nth-child(5) > span.describe-isbn').textContent;
        const price = document.querySelector('#bd-isbn > div > table > tbody > tr > td:nth-child(1) > table > tbody > tr.results-table-first-LogoRow.has-data > td:nth-child(4) > div > span > a').textContent;
        // need regex to get the price
        let pagesInDescription = document.querySelector('#bd-isbn > div > table > tbody > tr > td:nth-child(1) > table > tbody > tr.results-table-first-LogoRow.has-data > td.item-note').textContent
        const pages=  pagesInDescription.slice(pagesInDescription.indexOf('pages') - 4, pagesInDescription.indexOf('pages') - 1);
        const image = document.querySelector('#coverImage').src;
        const pageLink = window.location.href;
        return {
            title,
            By,
            publisher,
            ISBN,
            Edition,
            language,
            price,
            pages,
            image,
            pageLink
        }
    })
    console.log(data);
    await browser.close();
})(' 9782200623074')


