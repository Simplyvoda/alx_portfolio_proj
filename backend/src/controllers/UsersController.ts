import sha1 from "sha1";
import { dbClient } from "../../utils/db";
import { ObjectId } from "mongodb";
import { Request, Response } from "express";

export default class UsersController {
  /**
   * Creates a new user with the provided email, password, and username.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   */
  static async createUser(req: Request, res: Response): Promise<void> {
    // Get email, password, and username from request body
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;
    const username = req.body ? req.body.username : null;

    // include code to validate username and password and email address

    // Check if the user already exists
    const existingUser = await (
      await dbClient.usersCollection()
    ).findOne({ username });

    if (existingUser) {
      res.status(400).json({
        error: "User already exists",
      });
      return;
    } else {
      const hashedPassword = sha1(password);
      const newUser = {
        email: email,
        password: hashedPassword,
        username: username,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // adding user to database
      const result = await (
        await dbClient.usersCollection()
      ).insertOne(newUser);
      const generatedId = result.insertedId.toString();

      // initiate job to send user welcom email
      // if (generatedId) {
      //     const jobData = { userId: generatedId };
      //     await userQueue.add(jobData);
      // }

      res.status(201).json({
        message: "User created successfully",
        data: {
          id: generatedId,
          email: newUser.email,
          username: newUser.username,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
        },
      });
    }
  }

  /**
   * Authenticates a user with the provided username and password.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   */
  static async loginUser(req: Request, res: Response): Promise<void> {
    const username = req.body ? req.body.username : null;
    const password = req.body ? req.body.password : null;

    if (!username || !password) {
      res.status(400).json({
        error: "Username and password are required",
      });
      return;
    }

    const user = await (await dbClient.usersCollection()).findOne({ username });

    if (!user) {
      res.status(400).json({
        error: "User does not exist",
      });
      return;
    }

    const hashedPassword = sha1(password);

    if (hashedPassword !== user.password) {
      res.status(400).json({
        error: "Incorrect password",
      });
      return;
    } else {
      res.status(200).json({
        message: "User logged in successfully",
        data: {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    }
  }

  /**
   * Retrieves all users from the database.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   */
  static async getUsers(req: Request, res: Response): Promise<void> {
    const users = await (await dbClient.usersCollection()).find().toArray();
    if (users) {
      const all_users = users.map((user) => {
        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      });
      res.status(200).json({ message: "Users fetched", data: all_users });
    } else {
      res.status(500).json({ error: "An error occurred" });
    }
  }

  /**
   * Retrieves a user by username from the database.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   */
  static async getUser(req: Request, res: Response): Promise<void> {
    const username = req.params.username || null;

    if (!username) {
      throw new Error("Username is required");
    }

    try {
      const user = await (
        await dbClient.usersCollection()
      ).findOne({ username });
      if (user) {
        res.status(200).json({ message: "User fetched", data: user });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "An error occurred" });
    }
  }

  static async logoutUser(req: Request, res: Response): Promise<void> {
    const username = req.params.username || null;
  }
}
