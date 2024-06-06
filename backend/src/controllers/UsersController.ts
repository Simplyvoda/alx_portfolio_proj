import sha1 from "sha1";
import { dbClient } from "../../utils/db";
import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/auth";

interface IUser {
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  _id: ObjectId
}

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export default class UsersController {
  /**
   * Creates a new user with the provided email, password, and username.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   */

  static async createUser(req: Request, res: Response) {
    // Get email, password, and username from request body
    const { username, email, password } = req.body;

    // Basic validation
    if (!email || !password || !username) {
      res
        .status(400)
        .json({ error: "Email, username, and password are required" });
      return;
    }

    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const newUser = new User({ username, email, password });
      await newUser.save();

      const token = generateToken(newUser);

      res.status(201).json({
        message: "User created successfully",
        data: {
          id: newUser._id,
          email: newUser.email,
          username: newUser.username,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
          token: token
        },
      });

      // initiate job to send welcome email after successful sign up
    } catch (err: any) {
      res
        .status(500)
        .json({ error: "An error occurred while creating the user" });
    }
  }

  /**
   * Authenticates a user with the provided username and password.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   */
  static async loginUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    try {
      const user = req.user; // Access the authenticated user from req.user
      if (!user) {
        res.status(400).json({ error: "User does not exist" });
        return;
      }

      const token = generateToken(user);

      res.status(200).json({
        message: "User logged in successfully",
        data: {
          id: user._id,
          email: user.email,
          username: user.username,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          token: token,
        },
      });
    } catch (err) {
      res.status(500).json({ error: "An error occurred during login" });
    }
  }

  /**
   * Retrieves all users from the database.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   */
  static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();
      const allUsers = users.map((user: IUser) => ({
        id: user._id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }));

      res.status(200).json({ message: "Users fetched", data: allUsers });
    } catch (err) {
      res.status(500).json({ error: "An error occurred while fetching users" });
    }
  }

  /**
   * Retrieves a user by username from the database.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   */
  static async getUser(req: Request, res: Response): Promise<void> {
    const { username } = req.params;

    if (!username) {
      res.status(400).json({ error: "Username is required" });
      return;
    }

    try {
      const user = await User.findOne({ username });
      if (user) {
        res.status(200).json({ message: "User fetched", data: user });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "An error occurred while fetching the user" });
    }
  }

    /**
   * Logouts out user.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   */
  static async logoutUser(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: "User logged out successfully" });
  }
}
