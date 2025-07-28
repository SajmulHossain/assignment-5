/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import { env } from "./config/env.config";
import {Server} from 'http';
let server: Server;

const pushStart = async () => {
  await mongoose.connect(env.mongodb_uri);
  console.log("DB Connected");
  server = app.listen(Number(env.port), () => {
    console.log(`Server is running on PORT: 3000`);
  });
};

pushStart();

process.on("SIGTERM", () => {
    console.log("SIGTERM signal recieved. Server shutting down.....");

    if(server) {
        server.close(() => {
            process.exit(1);
        })
    }
})

process.on("SIGINT", () => {
    console.log("SIGINT signal recieved. Server is shutting down.....");

    if(server) {
        server.close(() => {
            process.exit(1);
        })
    }
})


process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejecttion detected... Server shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});


process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected... Server shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});