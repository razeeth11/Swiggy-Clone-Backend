import { client } from "./index.js";

export async function getDataByShopName(shopName) {
  return await client
    .db("Swiggy")
    .collection("product")
    .findOne({ shopName: shopName });
}
export async function getAllData() {
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
export async function updateShopByID(id, data) {
  return await client
    .db("Swiggy")
    .collection("product")
    .updateOne({ id: id }, { $set: data });
}
export async function deleteAllShop() {
  return await client.db("Swiggy").collection("product").deleteMany({});
}
export async function deleteShopByName(shopName) {
  return await client
    .db("Swiggy")
    .collection("product")
    .deleteOne({ shopName: shopName });
}
export async function createPaymentOffers(data) {
  return await client.db("Swiggy").collection("paymentOffers").insertMany(data);
}
export async function getPaymentOffers() {
  return await client
    .db("Swiggy")
    .collection("paymentOffers")
    .find({})
    .toArray();
}
export async function createCityLinks(data) {
  return await client.db("Swiggy").collection("cityLinks").insertMany(data);
}
export async function getCityLinks() {
  return await client.db("Swiggy").collection("cityLinks").find({}).toArray();
}
