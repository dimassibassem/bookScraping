const puppeteer = require("puppeteer");

const abebooks = async (isbn) => {
    const startDate = new Date().getTime() / 1000
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
    return {data, time}
}

const bookFinder = async (isbn) => {
    const startDate = new Date().getTime() / 1000
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setDefaultTimeout(30000000);
    await page.goto(`https://www.bookfinder.com/search/?isbn=${isbn}&mode=isbn&st=sr&ac=qr`, {waitUntil: 'load'});
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
    return {data, time};
}

const cpu = async (isbn) => {
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
    return {data, time}
}

const alManhal = async (isbn) => {
    const startDate = new Date().getTime() / 1000
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setDefaultTimeout(30000000);
    await page.goto(`https://platform.almanhal.com/Search/Result?q=&sf_28_0_2=${isbn}&opsf_28_0=1`, {waitUntil: 'networkidle2'});

    await page.waitForSelector('#result-container', {
        visible: true,
    });
    try {
        const link = await page.evaluate(() => {
            return document.querySelector('#result-container > div > div:nth-child(2) > div > ul > li:nth-child(3) > a').href
        })
        await page.goto(link, {waitUntil: 'load'});
        const data = await page.evaluate(() => {
            const title = document.querySelector('#lnkTitle').textContent.trim();
            const author = document.querySelector('#authorsContainer > div.col-md-10 > div > label').textContent.trim();
            const publisher = document.querySelector('#publishersContainer > div.col-md-10 > label').textContent.trim();
            const topics = document.querySelector('#mainTopicsContainer > div.col-md-10 > label').textContent.trim();
            const pages = document.querySelector('#Details > section > div > div:nth-child(1) > div:nth-child(3) > div > div.col-md-5.p-0 > label').textContent.trim();
            const ISBN = document.querySelector('#Details > section > div > div:nth-child(1) > div:nth-child(6) > div > div.col-md-5.p-0 > label').textContent.trim();
            const coverImage = document.querySelector('#img-title').src;
            const pageLink = window.location.href;
            return {
                title,
                author,
                ISBN,
                publisher,
                topics,
                pages,
                coverImage,
                pageLink
            }
        })
        await browser.close();
        const endDate = new Date().getTime() / 1000
        const time = "" + Math.round(endDate - startDate) + " seconds"
        return {data, time}
    } catch (e) {
        await browser.close();
        return {error: 'book not found'}
    }
}

const amazon = async (isbn) => {
    const startDate = new Date().getTime() / 1000
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setDefaultTimeout(30000000);

    await page.goto(`https://www.amazon.ca/s?k=${isbn}&crid=3P70C7NM9WVF7&sprefix=${isbn}%2Caps%2C190&ref=nb_sb_noss`, {waitUntil: 'networkidle2'});
    try {
        const data = await page.evaluate(() => {
            const title = document.querySelector('#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.s-widget-spacing-small.sg-col-4-of-20 > div > div > div > div > div.a-section.a-spacing-small.s-padding-left-small.s-padding-right-small > div.a-section.a-spacing-none.a-spacing-top-small.s-title-instructions-style > h2 > a > span').textContent
            const coverImage = document.querySelector('#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.s-widget-spacing-small.sg-col-4-of-20 > div > div > div > div > div.s-product-image-container.aok-relative.s-image-overlay-grey.s-text-center.s-padding-left-small.s-padding-right-small.s-spacing-small.s-height-equalized > span > a > div > img').src
            const pageLink = window.location.href;
            return {
                title,
                coverImage,
                pageLink
            }
        })
        await browser.close();
        const endDate = new Date().getTime() / 1000
        const time = "" + Math.round(endDate - startDate) + " seconds"
        return {data, time};
    } catch (e) {
        await browser.close();
        return {error: 'book not found'}
    }
}
module.exports = {
    abebooks,
    bookFinder,
    cpu,
    alManhal,
    amazon
};
