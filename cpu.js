// 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸 🗸
const puppeteer = require('puppeteer');


(async (isbn) => {
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
        const title = document.querySelector('#product-26177 > div > div.summary.entry-summary.cmsmasters_product_right_column > div.cmsmasters_product_title_wrap > h1').textContent;
        const price = document.querySelector('#product-26177 > div > div.summary.entry-summary.cmsmasters_product_right_column > div.cmsmasters_product_title_wrap > p > span').textContent;
        // const author = document.querySelector('#product-26177 > div > div.summary.entry-summary.cmsmasters_product_right_column > div.cmsmasters_product_content > div > p:nth-child(2)').textContent;
        const ISBN = document.querySelector('#product-26177 > div > div.summary.entry-summary.cmsmasters_product_right_column > div.cmsmasters_product_content > div > p:nth-child(3)').textContent;
        const year = document.querySelector('#product-26177 > div > div.summary.entry-summary.cmsmasters_product_right_column > div.cmsmasters_product_content > div > p:nth-child(4)').textContent;
        const pages = document.querySelector('#product-26177 > div > div.summary.entry-summary.cmsmasters_product_right_column > div.cmsmasters_product_content > div > p:nth-child(5)').textContent;
        const format = document.querySelector('#product-26177 > div > div.summary.entry-summary.cmsmasters_product_right_column > div.cmsmasters_product_content > div > p:nth-child(6)').textContent;
        const image = document.querySelector('#product-26177 > div > div.cmsmasters_product_left_column > div > div > a > img').src
        const pageLink = window.location.href;
        return {
            title,
            price,
            // author,
            ISBN,
            year,
            pages,
            format,
            image,
            pageLink
        }
    })

    await browser.close();
    console.log(data);
})('978-9938-46-081-0')


