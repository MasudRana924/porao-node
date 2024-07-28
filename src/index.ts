import express, { Express } from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/database';
const app: Express = express();
const PORT = process.env.PORT || 8000;
connectDB();
app.use(express.json());
app.use(cors());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
