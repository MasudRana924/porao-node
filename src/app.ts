import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/database';

const createApp = (): Express => {
    const app: Express = express();
    connectDB();
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    const routes = require('./routes/index');
    app.use('/v1', routes);
    return app;
};

export default createApp;
