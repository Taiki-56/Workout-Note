import cors from "cors";
import express from "express";

//* Start Express
const app = express();

//* Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8081", // 許可するオリジンを指定
  })
);

// app.use(morgan("dev"));

export default app;
