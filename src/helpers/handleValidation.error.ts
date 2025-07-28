import mongoose from "mongoose";
import { IErrorSources } from "../interfaces/error.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleValidationError = (
  error: mongoose.Error.ValidationError
) => {
  const errorSources: IErrorSources[] = [];
  const errors = Object.values(error.errors);
  errors.forEach((err: any) => {
    errorSources.push({
      path: err.path,
      message: err.message,
    });
  });

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};
