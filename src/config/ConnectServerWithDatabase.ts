import mongoose from "mongoose";
import { Express } from "express";
import { host, mongo_url, port } from "../constants/exports";

export const ConnectServerWithDatabase = async (app: Express) => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(mongo_url);
    console.log("database connected succesfully");
    // Start the Express server
    app.listen(port, () => {
      console.log(`Server running on http://${host}:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
};
