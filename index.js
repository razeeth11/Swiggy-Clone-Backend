import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import {
  getDataByShopName,
  getAllShopData,
  getDataByDeliveryTime,
  getDataByLowToHigh,
  getDataByHighToLow,
  getDataByRating,
  createShopData,
  updateShop,
  deleteAllShop,
  deleteOneShop,
} from "./getDataFunctions.js";

const PORT = 5000;
const app = express();

// const URL = "mongodb://127.0.0.1";
const URL = "mongodb+srv://Swiggy:Swiggy123@cluster0.mxmqnga.mongodb.net";
export const client = new MongoClient(URL);
client.connect();

app.use(cors());

//  Backend Home Page

app.get("/", function (request, response) {
  response.send("hello");
});

//  get shopName by shopName (API)

app.get("/shopDetails/:shopName", async function (request, response) {
  const { shopName } = request.params;

  const data = await getDataByShopName(shopName);

  response.send(data);
});

//  get All shop details (API)

app.get("/data", async function (request, response) {
  const data = await getAllShopData();

  response.send(data);
});

//  get shopDetails by Delivery Time (API)

app.get("/deliveryTime", async function (request, response) {
  const data = await getDataByDeliveryTime();

  response.send(data);
});

//  get shopDetails by low to high (API)

app.get("/LowToHigh", async function (request, response) {
  const data = await getDataByLowToHigh();

  response.send(data);
});

//  get shopDetails by high to low (API)

app.get("/HighToLow", async function (request, response) {
  const data = await getDataByHighToLow();

  response.send(data);
});

//  get shopDetails by Rating (API)

app.get("/Rating", async function (request, response) {
  const data = await getDataByRating();

  response.send(data);
});

//  create data (API)

app.post("/createData", express.json(), async function (request, response) {
  const data = request.body;
  const result = await createShopData(data);

  response.send(result);
});

//  update shop data (API) -

app.put("/shopId/:id", express.json(), async function (request, response) {
  const { id } = request.params;
  const data = request.body;

  const result = await updateShop(id, data);

  response.send(result);
});

//  delete All data (API) -

app.delete("/deleteAll", async function (request, response) {
  const result = await deleteAllShop();

  response.send(result);
});

//  delete one shop data (API) -

app.delete("/delete/:shopName", async function (request, response) {
  const { shopName } = request.params;

  const result = await deleteOneShop(shopName);

  response.send(result);
});

app.listen(PORT, () => console.log(`Connected in ${PORT}`));
