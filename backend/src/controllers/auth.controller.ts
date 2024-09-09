import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models";

type RequestBodyType = {
  name: string;
  email: string;
  password: string;
};

export const register = async (
  req: Request<never, never, RequestBodyType>,
  res: Response
) => {
  const payload = req.body;

  const emailExisted = await User.find({ email: payload.email });

  if (emailExisted) {
    return res.status(400).json({
      error: "Email has already been taken by other user.",
    });
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  console.log(hashedPassword);

  const newUser = new User({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
  });
  console.log(newUser);

  try {
    await newUser.save();

    return res.status(200).json({
      message: "Account registered successfully! 🎉",
    });
  } catch (err) {
    return res.status(400).json({
      error: "Failed to regiser a new account.",
    });
  }
};
