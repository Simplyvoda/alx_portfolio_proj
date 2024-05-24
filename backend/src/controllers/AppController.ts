import Scraper from '../services/Scraper';
import { Request, Response } from 'express';


export default class AppController {
    static async getSearchResults(req: Request, res: Response) {
        try {
            // make check for search param must be string and not empty
            const search_param: string = req.query.value as string;
            await Scraper.search(search_param);
            res.status(200).json({ message: "Screenshots taken successfully" });
        } catch (error) {
            console.error('Error in getSearchResults:', error);
            res.status(500).json({ error: 'An error occurred during scraping' });
        }
    }
}