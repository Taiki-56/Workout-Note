import express from "express";

//* Start Express
const app = express();

//* Middlewares
app.use(express.json());
// app.use(morgan("dev"));

export default app;
