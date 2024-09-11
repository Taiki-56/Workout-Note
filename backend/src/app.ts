import cors from "cors";
import express from "express";

import { authRoutes, dayRoutes, seedRoutes, usersRoutes } from "./routes";

//* Start Express
const app = express();

//* Middlewares
app.use(express.json());
//* allow the request from the port 8081
app.use(
  cors({
    origin: "http://localhost:8081",
  })
);

// app.use(morgan("dev"));
//* Routes
app.use("/api/seed", seedRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/day", dayRoutes);
app.use("/api/auth", authRoutes);

export default app;
