import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Assignment 5 server is running");
})


export default app;