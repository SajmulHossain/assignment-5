import { Types } from "mongoose";

export interface IFeedback {
    rating: number;
    feedback: string;
    ride_info: Types.ObjectId;

    createdAt?: Date;
}