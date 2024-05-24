import Scraper from '../services/scraper.js';


export default class AppController {
    static async getSearchResults(req, res) {
        try {
            // make check for search param must be string and not empty
            console.log(req.query)
            const search_param = req.query.value
            await Scraper.search(search_param);
            res.status(200).json({ message: "Screenshots taken successfully" });
        } catch (error) {
            console.error('Error in getSearchResults:', error);
            res.status(500).json({ error: 'An error occurred during scraping' });
        }
    }
}