import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import router from "./newFile.js"

const PORT = 5000;
export const app = express();

// const URL = "mongodb://127.0.0.1";
const URL = "mongodb+srv://Swiggy:Swiggy123@cluster0.mxmqnga.mongodb.net";
export const client = new MongoClient(URL);
client.connect();

app.use(cors());
app.use("/" , router);

app.listen(PORT, () => console.log(`Connected in ${PORT}`));
