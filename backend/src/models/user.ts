import mongoose, { Schema } from "mongoose";

type UserType = {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export const userSchema = new Schema<UserType>({
  name: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

//* the first argument passed to the model should be the singular form of your collection name. Mongoose automatically changes this to the plural form, transforms it to lowercase, and uses that for the database collection name.
//* in this case, "User" translates to the "users" collection
const User = mongoose.model("User", userSchema);

export default User;
