import { client } from "./index.js";

export async function getDataByShopName(shopName) {
  return await client
    .db("Swiggy")
    .collection("product")
    .findOne({ shopName: shopName });
}
export async function getAllShopData() {
  return await client.db("Swiggy").collection("product").find({}).toArray();
}
export async function getDataByDeliveryTime() {
  return await client
    .db("Swiggy")
    .collection("product")
    .find({})
    .sort({ delivery: 1 })
    .toArray();
}
export async function getDataByLowToHigh() {
  return await client
    .db("Swiggy")
    .collection("product")
    .find({})
    .sort({ price: 1 })
    .toArray();
}
export async function getDataByHighToLow() {
  return await client
    .db("Swiggy")
    .collection("product")
    .find({})
    .sort({ price: -1 })
    .toArray();
}
export async function getDataByRating() {
  return await client
    .db("Swiggy")
    .collection("product")
    .find({})
    .sort({ rating: -1 })
    .toArray();
}
export async function createShopData(data) {
  return await client.db("Swiggy").collection("product").insertMany(data);
}
export async function updateShop(id, data) {
  return await client
    .db("Swiggy")
    .collection("product")
    .updateOne({ id: id }, { $set: data });
}
export async function deleteAllShop() {
  return await client.db("Swiggy").collection("product").deleteMany({});
}
export async function deleteOneShop(shopName) {
  return await client
    .db("Swiggy")
    .collection("product")
    .deleteOne({ shopName: shopName });
}
