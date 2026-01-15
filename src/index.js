// import express from "express";
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
// import dotenv from "dotenv";

// dotenv.config({ path: "../.env" });

// const app = express();

// // IIFE = Immediately Invoked Function Expression
// (async () => {
//   try {
// // await mongoose.connect("mongodb://localhost:27017/mernApp");
// await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

//     app.on("error", (error) => {
//       console.log("Server Error:", error);
//       throw error;
//     });

//     app.listen(process.env.PORT || 5000, () => {
//       console.log(`Server running on port ${process.env.PORT || 5000}`);
//     });

//     console.log("MongoDB Connected Successfully");

//   } catch (error) {
//     console.error("MongoDB Connection Failed:", error);
//     process.exit(1);
//   }
// })();
