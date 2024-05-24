import puppeteer from "puppeteer";

export default class Scraper {
  static async search(searchTerm: string) {
    let browser;
    try {
      browser = await puppeteer.launch();
      const [jumiaPage, kongaPage] = await Promise.all([
        browser.newPage(),
        browser.newPage(),
      ]);

      const [jumiaResponse, kongaResponse] = await Promise.all([
        jumiaPage.goto("https://www.jumia.com.ng/", {
          waitUntil: "networkidle2",
        }),
        kongaPage.goto("https://www.konga.com/", { waitUntil: "networkidle2" }),
      ]);

      if (!jumiaResponse || !kongaResponse) {
        throw new Error("One of the responses is undefined");
      }

      if (jumiaResponse.status() !== 200 || kongaResponse.status() !== 200) {
        throw new Error("Failed to load one of the pages");
      }

      // Type into search box
      await jumiaPage.type('#fi-q', `${searchTerm}`);

      // Wait and click on first result
      const searchResultSelector = '.btn _prim _md -mls -fsh0';
      await jumiaPage.waitForSelector(searchResultSelector);
      await jumiaPage.click(searchResultSelector);

      await jumiaPage.screenshot({ path: 'jumia_seach_example.png', fullPage: true });

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
