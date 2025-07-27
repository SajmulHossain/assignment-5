import express from "express";
import { router } from "./routes";
import { globalErrorHandler } from "./middleware/globalErrorHandler";

const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Assignment 5 server is running");
});

app.use(globalErrorHandler);

export default app;
