import puppeteer, { executablePath } from "puppeteer";
import { config } from 'dotenv';

config();

console.log(process.env.CHROME_BIN, "Executable Path")

export default class Scraper {
  static async search(searchTerm: string) {
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.CHROME_BIN,
        args: [
          "--no-sandbox",
          "--disable-notifications",
          "--disable-geolocation",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--no-first-run",
          "--no-zygote",
          "--single-process",
          "--disable-gpu",
        ],
      });

      const [superMartPage, ngMartPage] = await Promise.all([
        browser.newPage(),
        browser.newPage(),
      ]);

      console.log("Browser initialization");

      superMartPage.setDefaultTimeout(60000); 
      ngMartPage.setDefaultTimeout(60000);

      const [superMartResponse, ngMartResponse] = await Promise.all([
        superMartPage.goto("https://www.supermart.ng/", {
          waitUntil: "networkidle2",
        }),
        ngMartPage.goto("https://247foods.ng/", {
          waitUntil: "networkidle2",
        }),
      ]);

      if (!superMartResponse || !ngMartResponse) {
        throw new Error("One of the responses is undefined");
      }

      if (
        superMartResponse.status() !== 200 ||
        ngMartResponse.status() !== 200
      ) {
        throw new Error("Failed to load one of the pages");
      }

      try {
        const superMartSearch = async () => {
          superMartPage.on("dialog", async (dialog) => {
            await dialog.dismiss(); // Dismiss any dialogs that appear
          });

          const searchInputSelector = ".main-search__input";
          await superMartPage.waitForSelector(searchInputSelector);
          await superMartPage.type(searchInputSelector, searchTerm); // Adjust the selector for SuperMart's search input
          await superMartPage.keyboard.press("Enter");
          await superMartPage.waitForNavigation({ waitUntil: "networkidle2" });

          const superMartSearchItems = await superMartPage.evaluate(() =>
            Array.from(
              document.querySelectorAll(".product-block .product-block__inner"),
              (e: any) => ({
                title: e?.querySelector(".product-block__title-price .title")
                  ?.innerText,
                link: e?.querySelector(".product-block__title-price .title")
                  ?.href,
                price: e?.querySelector(
                  ".product-block__title-price .price span"
                ).innerText,
                image: e
                  ?.querySelector(".image--shape-1 .rimage__image")
                  .getAttribute("src"),
              })
            )
          );

          return superMartSearchItems;
        };

        const ngMartSearch = async () => {
          ngMartPage.on("dialog", async (dialog) => {
            await dialog.dismiss(); // Dismiss any dialogs that appear
          });
          // Set geolocation to Lagos, Nigeria (Latitude: 6.5244, Longitude: 3.3792)
          await ngMartPage.setGeolocation({
            latitude: 6.5244,
            longitude: 3.3792,
          });
          const searchInputSelector = "#srch_term";
          await ngMartPage.waitForSelector(searchInputSelector);
          await ngMartPage.type(searchInputSelector, searchTerm); // Adjust the selector for ngMart's search input
          await ngMartPage.keyboard.press("Enter");

          ngMartPage.on("dialog", async (dialog) => {
            await dialog.dismiss(); // Dismiss any dialogs that appear
          });

          await ngMartPage.waitForNavigation({ waitUntil: "networkidle2" });

          const ngMartSearchItems = await ngMartPage.evaluate(() =>
            Array.from(
              document.querySelectorAll(
                ".product-layout .product-item-container"
              ),
              (e: any) => ({
                title: e
                  .querySelector(".right-block .caption h4")
                  ?.innerText.trim(),
                link: e
                  .querySelector(".right-block .caption h4 a")
                  ?.href.trim(),
                price: e
                  .querySelector(
                    ".right-block .caption .total-price .price .price-new"
                  )
                  ?.innerText.trim(),
                image: e
                  .querySelector(".left-block .product-image-container a img")
                  ?.getAttribute("src")
                  .trim(),
              })
            )
          );

          return ngMartSearchItems;
        };


        const [superMartSearchResults, ngMartSearchResults] = await Promise.all(
          [superMartSearch(), ngMartSearch()]
        );

        return {
          superMart: superMartSearchResults,
          ngMart: ngMartSearchResults,
        };
      } catch (error) {
        console.error("Error during search:", error);
      } finally {
        await browser.close();
      }
    } catch (error) {
      console.error("Error during scraping:", error);
      throw error; // Re-throw the error to be handled by the caller
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
