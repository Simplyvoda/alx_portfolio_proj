import Scraper from "../services/Scraper";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import User from "../../models/User";
import Item from "../../models/Item";

interface IUser {
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  _id: ObjectId
}

interface IItem {
  title: string;
  link: string;
  price: string;
  image: string;
  store: string;
  createdAt: Date;
  updatedAt: Date;
  _id: ObjectId
}

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

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

  static async saveItem(req: AuthenticatedRequest, res: Response) {
    try {
      const { title, link, price, image, store } = req.body;
      const userId = req.user?._id;

      // Check if the item already exists for the user
      const existingItem = await Item.findOne({ userId, title, link });
      if (existingItem) {
        return res.status(400).json({ error: "Item already saved" });
      }

      // Create and save the new item
      const newItem = new Item({
        userId,
        title,
        link,
        price,
        image,
        store
      });

      await newItem.save();

      res.status(201).json({ message: "Item saved successfully", data: newItem });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while saving the item" });
    }
  }


  static async getSavedItems(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?._id;

      // Find all items saved by the user
      const items = await Item.find({ userId });

      const allItems = items.map((item: IItem) => ({
        title: item.title,
        link: item.link,
        price: item.price,
        image: item.image,
        store: item.store,
        id: item._id
      }));

      res.status(200).json({ message: "Items fetched successfully", data: allItems });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching the items" });
    }
  }



  static async removeSavedItem(req: AuthenticatedRequest, res: Response) {
    
    try {
      const userId = req.user?._id;
      const itemId = req.params.id;

      // Find the item to ensure it belongs to the user
      const item = await Item.findOne({ _id: itemId, userId });

      if (!item) {
        return res.status(404).json({ error: "Item not found or does not belong to the user" });
      }

      // Remove the item
      await Item.deleteOne({ _id: itemId });

      res.status(200).json({ message: "Item removed successfully" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while removing the item" });
    }
  }

}
