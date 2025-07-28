import express from "express";
import { router } from "./routes";
import dotenv from 'dotenv';
import { globalErrorHandler } from "./middleware/globalErrorHandler";

const app = express();

app.use(express.json());
dotenv.config();

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Assignment 5 server is running");
});

app.use(globalErrorHandler);

export default app;
