import express from "express";
import session from "express-session";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { router } from "./routes";
import { env } from "./config/env.config";
import "./config/passport.config";
import passport from "passport";
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(session({
    secret: env.express_session_secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Assignment 5 server is running");
});

app.use(globalErrorHandler);

export default app;
