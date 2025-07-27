import { Response } from "express";

interface TMeta {
  page: number;
  limit: number;
  totalPage: number;
  total: number;
}

interface ResponseDataType<T> {
  statusCode: number;
  message: string;
  data: T;
  meta?: TMeta;
}

export const sendResponse = <T>(res: Response, data: ResponseDataType<T>) => {
  res.status(data.statusCode).json({
    success: true,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};
