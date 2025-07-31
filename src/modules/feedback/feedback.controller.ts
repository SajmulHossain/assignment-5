import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { FeedbackService } from "./feedback.service";
import { sendResponse } from "../../utils/sendResponse";

const getFeedback =catchAsync(async(req: Request, res: Response) => {
    const { id } = req.params;
    
    const data = await FeedbackService.getFeedback(id);

    sendResponse(res, {
        statusCode: 201,
        message: "Feedback retrived successfully",
        data
    })
})

const createFeedback =catchAsync(async(req: Request, res: Response) => {
    const data = await FeedbackService.createFeedback(req.body);

    sendResponse(res, {
        statusCode: 201,
        message: "Feedback sent successfully",
        data
    })
})

export const FeedbackController = {
    createFeedback,
    getFeedback
}