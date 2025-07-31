import { IFeedback } from "./feedback.interface";
import { Feedback } from "./feedback.model";

const getFeedback = async(id: string) => {
    const feedback = await Feedback.findById(id);

    return feedback;
}

const createFeedback = async(payload: IFeedback)=> {
    const feedback = await Feedback.create(payload);

    return feedback;
}

export const FeedbackService = {
    createFeedback,
    getFeedback
}