const express = require('express');
const puppeteer = require("puppeteer");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors")
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));


app.get('/abebooks/:isbn', async function (req, res) {
    const startDate = new Date().getTime() / 1000
    const {isbn} = req.params
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setDefaultTimeout(30000000);
    await page.goto(`https://www.abebooks.com/servlet/SearchResults?kn=${isbn}&sts=t&cm_sp=SearchF-_-topnav-_-Results`, {waitUntil: 'load'});
    const data = await page.evaluate(() => {
        try {
            const title = document.querySelector('#book-1 > div.result-data.col-xs-9.cf > div.cf > div.result-detail.col-xs-8 > h2 > a > span').textContent
            const By = document.querySelector('#book-1 > div.result-data.col-xs-9.cf > div.cf > div.result-detail.col-xs-8 > p.author > a > strong').textContent;
            const publisher = document.querySelector('#book-1 > div.result-data.col-xs-9.cf > div.cf > div.result-detail.col-xs-8 > p.small-plus.text-secondary.pub-data > span.opt-publisher').textContent;
            const year = document.querySelector('#book-1 > div.result-data.col-xs-9.cf > div.cf > div.result-detail.col-xs-8 > p.small-plus.text-secondary.pub-data > span.opt-publish-date').textContent;
            const ISBN = document.querySelector('#book-1 > div.result-data.col-xs-9.cf > div.cf > div.result-detail.col-xs-8 > p.isbn.small-plus.pub-data').textContent.trim()
            const Edition = document.querySelector('#book-1 > div.result-data.col-xs-9.cf > div.cf > div.buy-box-data.col-xs-4 > p.item-meta-data > b > span').textContent
            const price = document.querySelector('#item-price-1').textContent;
            const coverImage = document.querySelector('#listing_1 > div > img').src;
            const pageLink = window.location.href;
            return {title, By, publisher, year, ISBN, Edition, price, coverImage, pageLink}
        } catch (e) {
            return {error: 'book not found'}
        }
    })
    await browser.close();
    const endDate = new Date().getTime() / 1000
    const time = "" + Math.round(endDate - startDate) + " seconds"
    return res.json({data, time});
})


app.get('/bookfinder/:isbn', async (req, res) => {
    const {isbn} = req.params
    const startDate = new Date().getTime() / 1000
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setDefaultTimeout(30000000);
    await page.goto(`https://www.bookfinder.com/search/?isbn=${isbn}&mode=isbn&st=sr&ac=qr`, {waitUntil: 'load'});
    // await page.waitForSelector('#describe-isbn-title');
    const data = await page.evaluate(() => {
        try {
            const title = document.querySelector('#describe-isbn-title').textContent
            const By = document.querySelector('#bd-isbn > div > div.attributes > div:nth-child(2) > p > strong > a > span').textContent;
            const publisher = document.querySelector('#bd-isbn > div > div.attributes > p:nth-child(3) > span.describe-isbn').textContent;
            const ISBN = document.querySelector('#bd-isbn > div > div.attributes > div:nth-child(1) > h1').textContent;
            const Edition = document.querySelector('#bd-isbn > div > div.attributes > p:nth-child(4) > span.describe-isbn').textContent;
            const language = document.querySelector('#bd-isbn > div > div.attributes > p:nth-child(5) > span.describe-isbn').textContent;
            const price = document.querySelector('#bd-isbn > div > table > tbody > tr > td:nth-child(1) > table > tbody > tr.results-table-first-LogoRow.has-data > td:nth-child(4) > div > span > a').textContent;
            let pagesInDescription = document.querySelector('#bd-isbn > div > table > tbody > tr > td:nth-child(1) > table > tbody > tr.results-table-first-LogoRow.has-data > td.item-note').textContent
            const pages = pagesInDescription.slice(pagesInDescription.indexOf('pages') - 4, pagesInDescription.indexOf('pages') - 1);
            const coverImage = document.querySelector('#coverImage').src;
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
                coverImage,
                pageLink
            }
        } catch (e) {
            return {error: 'book not found'}
        }
    })
    await browser.close();
    const endDate = new Date().getTime() / 1000
    const time = "" + Math.round(endDate - startDate) + " seconds"
    return res.json({data, time});
})

app.get('/cpu/:isbn', async (req, res) => {
    const {isbn} = req.params
    const startDate = new Date().getTime() / 1000
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setDefaultTimeout(30000000);
    await page.goto('https://www.cpu.rnu.tn/index.php/shop/');

    await page.type('#woocommerce_product_search-2 > div > form > p.search_field > input.search-field', isbn);

    await Promise.all([
        page.click('#woocommerce_product_search-2 > div > form > p.search_button > button'),
        page.waitForNavigation({
            waitUntil: 'networkidle0',
        }),
    ]);
    const data = await page.evaluate(() => {
        try {
            const title = document.querySelector('.product_title').textContent;
            const price = document.querySelector('.woocommerce-Price-amount').textContent;
            // const author = document.querySelector('div > div.summary.entry-summary.cmsmasters_product_right_column > div.cmsmasters_product_content > div > p:nth-child(1)').textContent
            // const ISBN = document.querySelector('div > div.summary.entry-summary.cmsmasters_product_right_column > div.cmsmasters_product_content > div > p:nth-child(3)').textContent;
            // const year = document.querySelector('div > div.summary.entry-summary.cmsmasters_product_right_column > div.cmsmasters_product_content > div > p:nth-child(4)').textContent;
            // const pages = document.querySelector('div > div.summary.entry-summary.cmsmasters_product_right_column > div.cmsmasters_product_content > div > p:nth-child(5)').textContent;
            // const format = document.querySelector('#product-26177 > div > div.summary.entry-summary.cmsmasters_product_right_column > div.cmsmasters_product_content > div > p:nth-child(6)').textContent;
            const coverImage = document.querySelector('.attachment-shop_single').src
            const pageLink = window.location.href;
            return {
                title,
                price,
                // author,
                // ISBN,
                // year,
                // pages,
                // format,
                coverImage,
                pageLink
            }
        } catch (e) {
            return {error: 'book not found'}
        }
    })
    await browser.close();
    const endDate = new Date().getTime() / 1000
    const time = "" + Math.round(endDate - startDate) + " seconds"
    return res.json({data, time});
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
