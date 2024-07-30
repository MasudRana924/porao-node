import express, { Express } from "express";
import cors from "cors";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();
import connectDB from './config/database';
const routes = require('./routes/index');
const app: Express = express();
const PORT = process.env.PORT || 8000;
connectDB();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/v1', routes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
