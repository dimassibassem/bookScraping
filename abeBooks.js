// 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸

const puppeteer = require('puppeteer');


(async (isbn) => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setDefaultTimeout(30000000);
    await page.goto(`https://www.abebooks.com/servlet/SearchResults?kn=${isbn}&sts=t&cm_sp=SearchF-_-topnav-_-Results`);
    await page.waitForSelector('#book-1');
    const data = await page.evaluate(() => {
        const title = document.querySelector('#book-1 > div.result-data.col-xs-9.cf > div.cf > div.result-detail.col-xs-8 > h2 > a > span').textContent
        const By = document.querySelector('#book-1 > div.result-data.col-xs-9.cf > div.cf > div.result-detail.col-xs-8 > p.author > a > strong').textContent;
        const publisher = document.querySelector('#book-1 > div.result-data.col-xs-9.cf > div.cf > div.result-detail.col-xs-8 > p.small-plus.text-secondary.pub-data > span.opt-publisher').textContent;
        const year = document.querySelector('#book-1 > div.result-data.col-xs-9.cf > div.cf > div.result-detail.col-xs-8 > p.small-plus.text-secondary.pub-data > span.opt-publish-date').textContent;
        const ISBN = document.querySelector('#book-1 > div.result-data.col-xs-9.cf > div.cf > div.result-detail.col-xs-8 > p.isbn.small-plus.pub-data').textContent.trim()
        const Edition = document.querySelector('#book-1 > div.result-data.col-xs-9.cf > div.cf > div.buy-box-data.col-xs-4 > p.item-meta-data > b > span').textContent
        const price = document.querySelector('#item-price-1').textContent;
        const image = document.querySelector('#listing_1 > div > img').src;
        const pageLink = window.location.href;
        return {
            title,
            By,
            publisher,
            year,
            ISBN,
            Edition,
            price,
            image,
            pageLink
        }
    })
    console.log(data);
    await browser.close();
})('9782200623074')


