import mongoose, { Schema } from "mongoose";

type DayType = {
  user_id: string;
  title: string;
  exercises: string[];
  createdAt: Date;
  updatedAt: Date;
};

const daySchema = new Schema<DayType>({
  user_id: String,
  title: String,
  exercises: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Day = mongoose.model("Day", daySchema);

export default Day;
