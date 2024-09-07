import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { users } from "../data/user";
import { User } from "../models/";

export const seed = async (_: Request, res: Response) => {
  //* delete all the existing user data
  await User.deleteMany();
  console.log("Deleted all users");

  const usersForSeeding = await Promise.all(
    users.map(async (user) => {
      return {
        ...user,
        password: await bcrypt.hash(user.password, 10),
      };
    })
  );

  try {
    //* insert users data
    await User.insertMany(usersForSeeding);
    console.log("Inserted users");
    let allUsers = await User.find();
    console.log(allUsers);

    return res.status(201).json({
      message: "Users saved to database successfully! 🎉",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Could not save users to database. Check logs!",
    });
  }
};
