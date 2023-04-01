import express from "express";
import { getUserPhoneNumber } from "./getUserPhoneNumber.js";
import {
  getDataByShopName,
  getAllData,
  getDataByDeliveryTime,
  getDataByLowToHigh,
  getDataByHighToLow,
  getDataByRating,
  createShopData,
  updateShopByID,
  deleteAllShop,
  deleteShopByName,
  createPaymentOffers,
  getPaymentOffers,
  createCityLinks,
  getCityLinks,
} from "./getDataByShopName.js";
import { app, client } from "./index.js";

const router = express.Router();

//  Backend Home Page

router.get("/", function (request, response) {
  response.send("hello");
});

//  get shopName by ID (API)

router.get("/shopDetails/:shopName", async function (request, response) {
  const { shopName } = request.params;

  const data = await getDataByShopName(shopName);

  response.send(data);
});

//  get All shop details (API)

router.get("/data", async function (request, response) {
  const data = await getAllData();

  response.send(data);
});

//  get shopDetails by Delivery Time (API)

router.get("/deliveryTime", async function (request, response) {
  const data = await getDataByDeliveryTime();

  response.send(data);
});

//  get shopDetails by low to high (API)

router.get("/LowToHigh", async function (request, response) {
  const data = await getDataByLowToHigh();

  response.send(data);
});

//  get shopDetails by high to low (API)

router.get("/HighToLow", async function (request, response) {
  const data = await getDataByHighToLow();

  response.send(data);
});

//  get shopDetails by Rating (API)

router.get("/Rating", async function (request, response) {
  const data = await getDataByRating();

  response.send(data);
});

//  create data (API)

router.post("/createData", express.json(), async function (request, response) {
  const data = request.body;
  const result = await createShopData(data);

  response.send(result);
});

//  update shop data (API) -

router.put("/shopId/:id", express.json(), async function (request, response) {
  const { id } = request.params;
  const data = request.body;

  const result = await updateShopByID(id, data);

  response.send(result);
});

//  delete All data (API)

router.delete("/deleteAll", async function (request, response) {
  const result = await deleteAllShop();

  response.send(result);
});

//  delete one shop data (API)

router.delete("/delete/:shopName", async function (request, response) {
  const { shopName } = request.params;
  const result = await deleteShopByName(shopName);

  response.send(result);
});

// create bank payment offer API

router.post( "/createPaymentOffers", express.json(), async function (request, response) {
    const data = request.body;
    const result = await createPaymentOffers(data);

    response.send(result);
  }
);

// get bank payment offer API

router.get("/PaymentOffers", async function (request, response) {
  const result = await getPaymentOffers();

  response.send(result);
});

// create city links API

router.post( "/createCityLinks", express.json(), async function (request, response) {
    const data = request.body;
    const result = await createCityLinks(data);

    response.send(result);
  }
);

// get city links API

router.get("/CityLinks", async function (request, response) {
  const result = await getCityLinks();

  response.send(result);
});

// Store  password signUp

router.post("/signUp", express.json(), async function (request, response) {
  const { PhoneNumber, Name, Email } = request.body;

  const userPhoneNumber = await getUserPhoneNumber(PhoneNumber);

  if (userPhoneNumber) {
    response
      .status(400)
      .send({ Message: "Phone Number Already Exists ! Please Log In" });
  } else {
    const result = await client.db("Swiggy").collection("userPass").insertOne({
      Name: Name,
      PhoneNumber: PhoneNumber,
      Email: Email,
    });
    response.send(result);
  }
});

// get password LogIn

router.post("/LogIn", express.json(), async function (request, response) {  
  const { PhoneNumber } = request.body;

  console.log(PhoneNumber);

  const userPhoneNumber = await getUserPhoneNumber(PhoneNumber);

  if (userPhoneNumber) {
    response.send({ Message: "Successfully Logged In" });
  } else {
    response.status(400).send({ Message: "Invalid credentials" });
  }
});

export default router;
