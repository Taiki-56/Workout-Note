import { Request, Response } from "express";
import { User } from "../models";

export const show = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    const remapUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    }));
    console.log(remapUsers);
    return res.status(200).json({
      users: remapUsers,
    });
  } catch (err) {
    throw err;
  }
};
