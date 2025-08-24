import express from 'express'
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routers/router.js";

dotenv.config();

const PORT = process.env.PORT || 5012
const DB_URL = process.env.DB_URL
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api',router)

async function startApp () {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT,() => console.log(`Server running on port ${PORT}`))
    }
    catch (error){
        console.log('error App',error)
    }
}

startApp();

