import "dotenv/config";
import mongoose from "mongoose";

class MongoDB {
  static async connect(url: string) {
    try {
      mongoose.connect(url);
      console.log(url);

      console.log("MongoDB Connected Successfully 👍🎉");
    } catch (err) {
      console.log("MongoDB Connection Error💀");
      throw err;
    }
  }
}

export default MongoDB;
