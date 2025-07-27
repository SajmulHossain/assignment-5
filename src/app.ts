import express from "express";
import { router } from "./routes";

const app = express();

app.use("/api/v1", router)

app.get("/", (req, res) => {
    res.send("Assignment 5 server is running");
})


export default app;