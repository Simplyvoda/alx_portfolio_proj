import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index";
import session from "express-session";
import cookieParser from "cookie-parser";
import { dbClient } from "../utils/db";

const app = express();

const port = process.env.PORT || 4001;

// Use middleware
app.use(bodyParser.json());
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(session());

// load all routes from routes/index.js
app.use(routes);

async function startServer() {
  // connect to database and log port
  await dbClient.connect();

  try {
    // check if database is alive
    dbClient.isAlive();

    // check for users collection in database -- take out later
    const users = dbClient.countUsers().then((users) => console.log(users));
  } catch (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
