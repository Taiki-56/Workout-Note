import { Request, Response } from "express";
import { Day } from "../models";

export const create = async (req: Request, res: Response) => {
  const payload = req.body;
  console.log(payload);

  const newDay = new Day({
    user_id: payload.user_id,
    title: payload.title,
    exercise: payload.exercise,
  });

  try {
    await newDay.save();
    console.log(newDay);

    return res.status(201).json({
      message: "New day created! 🎉",
      day: newDay,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Couldn't save new day 💀",
    });
  }
};
