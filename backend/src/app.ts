import express from "express";
import { authRoutes, dayRoutes, seedRoutes, usersRoutes } from "./routes";

//* Start Express
const app = express();

//* Middlewares
app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:8081", // 許可するオリジンを指定
//   })
// );

// app.use(morgan("dev"));
//* Routes
app.use("/api/seed", seedRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/day", dayRoutes);
app.use("/api/auth", authRoutes);

export default app;
