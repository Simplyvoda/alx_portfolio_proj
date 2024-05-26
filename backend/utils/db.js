// define DB class here
import { MongoClient, ServerApiVersion } from 'mongodb';
import { config } from 'dotenv';

config();

// get connection string from env file
const uri = process.env.DB_URI;


class DBClient {
  constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("Connected to DB");
      return true;
    } catch (e) {
      console.log("Connection failed", e);
      return false;
    }
  }

  isAlive() {
    this.client.connect().then((isConnected) => {
      if (isConnected) {
        console.log("Connection to the database was successful!");
        return true;
      } else {
        console.log("Failed to connect to the database.");
        return false;
      }
    });
  }


  async countUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  async usersCollection() {
    return this.client.db().collection('users');
  }
}

export const dbClient = new DBClient();
export default dbClient;
