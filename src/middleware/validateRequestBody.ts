import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const validateReqBody = (zodSchmea: ZodObject) => async (req:Request, res: Response, next: NextFunction) => {
    try {
        req.body = await zodSchmea.parseAsync(req.body);
        next();
    } catch (error) {
        next(error);
    }
}