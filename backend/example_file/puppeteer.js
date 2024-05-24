const puppeteer = require('puppeteer');
const fs = require('fs');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);

async function run() {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to the URL of page you want to scrape
    await page.goto('https://www.traversymedia.com/');

    // take screenshot of page and saves in specified file
    // await page.screenshot({ path: 'example.png', fullPage: true });

    // save page as pdf
    // await page.pdf({ path: 'example.pdf', format: 'A4' });

    // getting entire html of page
    // const html = await page.content();
    //logging result to the console
    // console.log("All html", html)

    // get page title
    // const title = await page.evaluate(() => document.title);
    // console.log("Page title", title);

    // get all text on the page
    // const text = await page.evaluate(() => document.body.innerText);
    // console.log("Page text", text);

    // get all links on the page
    // may be useful to redirect users to site to buy product
    // const links = await page.evaluate(() =>
    //     Array.from(document.querySelectorAll('a'), (e) => e.href)
    // );
    // console.log("Page links", links);

    // get information about courses using array.from
    // const courses = await page.evaluate(() =>
    //     Array.from(document.querySelectorAll('.cscourse-grid .card'), (e) => ({
    //         title: e.querySelector('.card-body h3').innerText,
    //         level: e.querySelector('.card-body .level').innerText,
    //         url: e.querySelector('.card-footer a').href,
    //         image: e.querySelector('img').getAttribute('src'),
    //     }))
    // );

    // get information about courses using $$eval
    const courses = await page.$$eval('.cscourse-grid .card', (elements) => elements.map((e) => ({
        title: e.querySelector('.card-body h3').innerText,
        level: e.querySelector('.card-body .level').innerText,
        url: e.querySelector('.card-footer a').href,
        image: e.querySelector('img').getAttribute('src'),
    })))


    // save information to json file
    const file_name = 'courses.json';
    try{
        const result = await writeFileAsync(file_name, JSON.stringify(courses));
        console.log("Saved to file", file_name);
    }catch(e){
        throw new Error("File not saved")
    }

    // close browser after we are done
    await browser.close();
}

run();