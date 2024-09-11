import { Router } from "express";
import { AuthController } from "../controllers";

const router = Router();

router.post("/signUp", AuthController.signUp);

export default router;
