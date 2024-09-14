import { Request, Response } from "express";
import { Day } from "../models";

export const create = async (req: Request, res: Response) => {
  const payload = req.body;
  console.log(payload);

  const newDay = new Day({
    // user_id: payload.user_id,
    user_id: "66de725d03cfe3b9347dfff7",
    title: payload.title,
    exercises: payload.exercises,
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
