import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index";
import session from "express-session";
import passport from "../config/passport";
import { dbClient } from "../utils/db";
import cors from "cors";

const app = express();

const port = process.env.PORT || 4001;

// Configure CORS to allow all origins
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent
}));
// Use middleware
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));

// load all routes from routes/index.js
app.use(routes);

// do jwt authentication here

async function startServer() {
  // connect to database and log port
  await dbClient.connect();

  try {
    // check if database is alive
    await dbClient.isAlive();
  } catch (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
