import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

const PORT = 5000;
const app = express();

// const URL = "mongodb://127.0.0.1";
const URL = "mongodb+srv://Swiggy:Swiggy123@cluster0.mxmqnga.mongodb.net";
const client = new MongoClient(URL);
client.connect();


app.use(cors());

// ------------------------------------------- Backend Home Page -------------------------------------------

app.get("/", function (request, response) {
  response.send("hello");
});


// ------------------------------------------- get shopName by ID (API)  -------------------------------------------

app.get("/shopDetails/:shopName", async function (request, response) {

  const {shopName} = request.params;

  const data = await client
    .db("Swiggy")
    .collection("product")
    .findOne({shopName : shopName})

  response.send(data);
});


// ------------------------------------------- get All shop details (API)  -------------------------------------------

app.get("/data", async function (request, response) {

  const data = await client
    .db("Swiggy")
    .collection("product")
    .find({})
    .toArray();

  response.send(data);
});


// ------------------------------------------- get shopDetails by Delivery Time (API)  -------------------------------------------

app.get("/deliveryTime", async function (request, response) {

  const data = await client
    .db("Swiggy")
    .collection("product")
    .find({}).sort( { delivery : 1} )
    .toArray();

  response.send(data);
});


// ------------------------------------------- get shopDetails by low to high (API)  -------------------------------------------

app.get("/LowToHigh", async function (request, response) {

  const data = await client
    .db("Swiggy")
    .collection("product")
    .find({}).sort( { price : 1} )
    .toArray();

  response.send(data);
});


// ------------------------------------------- get shopDetails by high to low (API)  -------------------------------------------

app.get("/HighToLow", async function (request, response) {

  const data = await client
    .db("Swiggy")
    .collection("product")
    .find({}).sort( { price : -1} )
    .toArray();

  response.send(data);
});



// ------------------------------------------- get shopDetails by Rating (API)  -------------------------------------------

app.get("/Rating", async function (request, response) {

  const data = await client
    .db("Swiggy")
    .collection("product")
    .find({}).sort( { rating : -1} )
    .toArray();

  response.send(data);
});



// ------------------------------------------- create data (API) -------------------------------------------

app.post("/createData", express.json() , async function (request, response) {

  const data = request.body;
  const result = await client
    .db("Swiggy")
    .collection("product")
    .insertMany(data);

  response.send(result);
});


// ------------------------------------------- update shop data (API) --------------------------------------------

app.put("/shopId/:id",express.json(), async function (request, response) {
  const {id} = request.params;
  const data = request.body;

  const result = await client
    .db("Swiggy")
    .collection("product")
    .updateOne({id : id } , { $set : data});

  response.send(result);
});


// ------------------------------------------ delete All data (API) --------------------------------------------

app.delete("/deleteAll", async function (request, response) {

  const result = await client
    .db("Swiggy")
    .collection("product")
    .deleteMany({});

  response.send(result);
});

// ------------------------------------------ delete one shop data (API) --------------------------------------------

app.delete("/delete/:shopName", async function (request, response) {

  const {shopName} = request.params;

  const result = await client
    .db("Swiggy")
    .collection("product")
    .deleteOne({shopName : shopName});

  response.send(result);
});

app.listen(PORT, () => console.log(`Connected in ${PORT}`));