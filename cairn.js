//need

const puppeteer = require('puppeteer');


(async (isbn) => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage();
    await page.setDefaultTimeout(30000000);
    await page.goto(`https://www.cairn.info/resultats_recherche.php?searchTerm=${isbn}`);
    await page.waitForSelector('#resultat-recherche > div > div:nth-child(2) > div > div.well.hidden-xs > div > ul > li:nth-child(1) > b');

    const val = await page.evaluate(() => {
        return document.querySelector('#resultat-recherche > div > div:nth-child(2) > div > div.well.hidden-xs > div > ul > li:nth-child(1) > b').textContent
    })
    console.log(val);
    if (parseInt(val) === 0) {
        console.log('No result');
        await browser.close();
        return;
    }
    await Promise.all([
        await page.mouse.click(141,355),
        page.waitForNavigation({
            waitUntil: 'networkidle0',
        }),
    ]);

    const data = await page.evaluate(() => {
        const title = document.querySelector('#numero > div > div > div > div.media-body > div.article-meta > ul:nth-child(1) > li').textContent
        const Under_the_direction_of = document.querySelector('#numero > div > div > div > div.media-body > div.article-meta > ul:nth-child(2) > li').textContent.trim().slice(21);
        const year = document.querySelector('#numero > div > div > div > div.media-body > div.article-meta > ul:nth-child(3) > li').textContent
        const pages = document.querySelector('#numero > div > div > div > div.media-body > div.article-meta > ul:nth-child(4) > li:nth-child(2)').textContent;
        const collection = document.querySelector('#numero > div > div > div > div.media-body > div.article-meta > ul:nth-child(4) > li:nth-child(3)').textContent;
        const editor = document.querySelector('#numero > div > div > div > div.media-body > div.article-meta > ul:nth-child(4) > li:nth-child(4)').textContent;
        const image = document.querySelector('#numero > div > div > div > div.media-left > img').src
        return {
            title,
            Under_the_direction_of,
            editor,
            year,
            pages,
            collection,
            image,
        }
    })

    console.log(data);
})('9782706121371')


