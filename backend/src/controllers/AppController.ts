import Scraper from "../services/Scraper";
import { Request, Response } from "express";

export default class AppController {
  static async getSearchResults(req: Request, res: Response) {
    try {
      // make check for search param must be string and not empty
      const search_param: string = req.query.value as string;
      const search_results = await Scraper.search(search_param).then(
        (results) => {
          return results;
        }
      );
      res
        .status(200)
        .send({
          message: "Search results fetched successfully",
          data: search_results,
        });
    } catch (error) {
      res.status(500).json({ error: "An error occurred during scraping" });
    }
  }
}
