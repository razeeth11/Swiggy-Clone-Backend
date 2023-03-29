import express from "express";
import { client } from "../index.js";
const router = express.Router();

// ------------------------------------------- Backend Home Page -------------------------------------------
router.get("/", function (request, response) {
  response.send("hello");
});
// ------------------------------------------- get shopName by ID (API)  -------------------------------------------
router.get("/shopDetails/:shopName", async function (request, response) {
  const { shopName } = request.params;

  const data = await client
    .db("Swiggy")
    .collection("product")
    .findOne({ shopName: shopName });

  response.send(data);
});
// ------------------------------------------- get All shop details (API)  -------------------------------------------
router.get("/data", async function (request, response) {
  const data = await client
    .db("Swiggy")
    .collection("product")
    .find({})
    .toArray();

  response.send(data);
});
// ------------------------------------------- get shopDetails by Delivery Time (API)  -------------------------------------------
router.get("/deliveryTime", async function (request, response) {
  const data = await client
    .db("Swiggy")
    .collection("product")
    .find({})
    .sort({ delivery: 1 })
    .toArray();

  response.send(data);
});
// ------------------------------------------- get shopDetails by low to high (API)  -------------------------------------------
router.get("/LowToHigh", async function (request, response) {
  const data = await client
    .db("Swiggy")
    .collection("product")
    .find({})
    .sort({ price: 1 })
    .toArray();

  response.send(data);
});
// ------------------------------------------- get shopDetails by high to low (API)  -------------------------------------------
router.get("/HighToLow", async function (request, response) {
  const data = await client
    .db("Swiggy")
    .collection("product")
    .find({})
    .sort({ price: -1 })
    .toArray();

  response.send(data);
});
// ------------------------------------------- get shopDetails by Rating (API)  -------------------------------------------
router.get("/Rating", async function (request, response) {
  const data = await client
    .db("Swiggy")
    .collection("product")
    .find({})
    .sort({ rating: -1 })
    .toArray();

  response.send(data);
});
// ------------------------------------------- create data (API) -------------------------------------------
router.post("/createData", express.json(), async function (request, response) {
  const data = request.body;
  const result = await client
    .db("Swiggy")
    .collection("product")
    .insertMany(data);

  response.send(result);
});
// ------------------------------------------- update shop data (API) --------------------------------------------
router.put("/shopId/:id", express.json(), async function (request, response) {
  const { id } = request.params;
  const data = request.body;

  const result = await client
    .db("Swiggy")
    .collection("product")
    .updateOne({ id: id }, { $set: data });

  response.send(result);
});
// ------------------------------------------ delete All data (API) --------------------------------------------
router.delete("/deleteAll", async function (request, response) {
  const result = await client.db("Swiggy").collection("product").deleteMany({});

  response.send(result);
});
// ------------------------------------------ delete one shop data (API) --------------------------------------------
router.delete("/delete/:shopName", async function (request, response) {
  const { shopName } = request.params;

  const result = await client
    .db("Swiggy")
    .collection("product")
    .deleteOne({ shopName: shopName });

  response.send(result);
});

export default router;
