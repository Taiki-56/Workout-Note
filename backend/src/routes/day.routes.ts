import { Router } from "express";
import { DayController } from "../controllers";

const router = Router();

router.post("/", DayController.create);

export default router;
