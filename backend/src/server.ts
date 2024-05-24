import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.ts';

const app = express();

const port = process.env.PORT || 4001;

// Use body-parser middleware
app.use(bodyParser.json());

// load all routes from routes/index.js
app.use(routes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})