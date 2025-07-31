import { model, Schema } from "mongoose";
import { IFeedback } from "./feedback.interface";

const feedbackSchema = new Schema<IFeedback>({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    ride_info: {
        type: Schema.Types.ObjectId,
        require: true
    }
},
  { versionKey: false, timestamps: true }
);

export const Feedback = model("Feedback", feedbackSchema);