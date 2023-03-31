import { client } from "./index.js";

export async function getUserPhoneNumber(PhoneNumber) {
      const data =  await client
      .db("Swiggy")
      .collection("userPass")
      .findOne({ PhoneNumber: PhoneNumber });

      return data;
  }

