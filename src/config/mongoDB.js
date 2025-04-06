import { config } from "dotenv";
config();
import { connect as _connect } from "mongoose";

async function connect() {
  try {
    await _connect(process.env.MONGO_DB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connect;
