import puppeteer from "puppeteer";

export default class Scraper {
  static async search(searchTerm: string) {
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ["--disable-notifications"],
      });

      const [superMartPage, pricePallyPage] = await Promise.all([
        browser.newPage(),
        browser.newPage(),
      ]);

      const [superMartResponse, pricePallyResponse] = await Promise.all([
        superMartPage.goto("https://www.supermart.ng/", {
          waitUntil: "domcontentloaded",
        }),
        pricePallyPage.goto("https://www.pricepally.com/", {
          waitUntil: "domcontentloaded",
        }),
      ]);

      if (!superMartResponse || !pricePallyResponse) {
        throw new Error("One of the responses is undefined");
      }

      if (
        superMartResponse.status() !== 200 ||
        pricePallyResponse.status() !== 200
      ) {
        throw new Error("Failed to load one of the pages");
      }

      try {
        const superMartSearch = async () => {
          superMartPage.on("dialog", async (dialog) => {
            await dialog.dismiss(); // Dismiss any dialogs that appear
          });
          const searchInputSelector = ".main-search__input";
          await superMartPage.type(searchInputSelector, searchTerm); // Adjust the selector for SuperMart's search input
          await superMartPage.keyboard.press("Enter");
          await superMartPage.waitForNavigation({ waitUntil: "networkidle2" });



          const superMartSearchItems = await superMartPage.evaluate(() => 
            Array.from(document.querySelectorAll('.product-block .product-block__inner'), (e: any) => ({
              title: e?.querySelector('.product-block__title-price .title')?.innerText,
              link: e?.querySelector('.product-block__title-price .title')?.href,
              price: e?.querySelector('.product-block__title-price .price span').innerText,
              image: e?.querySelector('.image--shape-1 .rimage__image').getAttribute('src'),
            })
          
          ));
          console.log(superMartSearchItems);

          return superMartSearchItems;
        }

        const pricePallySearch = async () => {
          pricePallyPage.on("dialog", async (dialog) => {
            await dialog.dismiss(); // Dismiss any dialogs that appear
          });

          // confirm city to be lagos -- subsequently ask user for location when loading the application

          // Select the radio button using the type, name, and class attributes
          const radioSelector = 'input[type="radio"][name="Lagos"].w-4';
          await pricePallyPage.waitForSelector(radioSelector);

          // Click the radio button
          await pricePallyPage.click(radioSelector);

          // Select the button using the class attributes
          const buttonSelector = ".btn-primary.fw-800.w-full.py-2";
          await pricePallyPage.waitForSelector(buttonSelector);

          const confirmButton = await pricePallyPage.$(buttonSelector);
          await confirmButton?.click();
          const searchInputSelector = 'input[placeholder="Search food items"]';

          await pricePallyPage.type(searchInputSelector, searchTerm); // Adjust the selector for PricePally's search input
          await pricePallyPage.keyboard.press("Enter");
          await pricePallyPage.waitForNavigation({ waitUntil: "networkidle2" });

          // // handle results, add to array and store in databse
          // const pricePallySearchItems = await pricePallyPage.evaluate(() => 

          //   Array.from(document.querySelectorAll('.w-full.rounded-t.overflow-hidden'), (e: any) => ({
          //     title: e?.querySelector('.lg:fs-700.text-[#333333].fs-500.fw-500.text-ellipsis.overflow-hidden.whitespace-nowrap')?.innerText,
          //     link: e?.querySelector('a')?.href,
          //     price: e?.querySelector('.fs-600.lg:text-lg.fw-600').innerText,
          //     image: e?.querySelector('img').getAttribute('src'),
          //   }))
          // );

          // handle results, add to array and store in database
          const pricePallySearchItems = await pricePallyPage.evaluate(() => 
            Array.from(document.querySelectorAll('.w-full.rounded-t.overflow-hidden'), (e: any) => ({
              title: e?.querySelector('[class*="lg:fs-700"][class*="text-[#333333]"][class*="fs-500"][class*="fw-500"][class*="text-ellipsis"][class*="overflow-hidden"][class*="whitespace-nowrap"]')?.innerText,
              link: e?.querySelector('a')?.href,
              price: e?.querySelector('[class*="fs-600"][class*="lg:text-lg"][class*="fw-600"]')?.innerText,
              image: e?.querySelector('img')?.getAttribute('src'),
            }))
          );

          
          console.log(pricePallySearchItems);

          return pricePallySearchItems;
        };
          

        const [superMartSearchResults, pricePallySearchResults] =
          await Promise.all([superMartSearch(), pricePallySearch()]);

        console.log("SuperMart Search Results:", superMartSearchResults);
        console.log("PricePally Search Results:", pricePallySearchResults);

        return {
          superMart: superMartSearchResults,
          pricePally: pricePallySearchResults,
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
