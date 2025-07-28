/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { handleCastError } from "../helpers/handleCastError";
import { handlerDuplicateError } from "../helpers/handleDuplicateError";
import { handleValidationError } from "../helpers/handleValidation.error";
import { handleZodError } from "../helpers/handleZodError";
import { IErrorSources } from "../interfaces/error.interface";
import AppError from "../utils/AppError";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something Went Wrong";
  let errorSources: IErrorSources[] = [];

  if (error.code === 11000) {
    const simplifiedError = handlerDuplicateError(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
  } else if (error.name === "CastError") {
    const simplifiedError = handleCastError();
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
  } else if (error.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  } else if (error.name === "ZodError") {
    const simplifiedError = handleZodError(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error,
  });
};
