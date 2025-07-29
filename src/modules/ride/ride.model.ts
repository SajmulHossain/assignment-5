import { model, Schema } from "mongoose";
import { IDestination, IRide, RideStatus } from "./ride.interface";

const destinationSchema = new Schema<IDestination>({
  place_name: {
    type: String,
    required: true,
  },
  coordinate: {
    type: [Number],
    required: true,
  },
});

const rideSchema = new Schema<IRide>(
  {
    rider: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: Object.values(RideStatus),
      default: RideStatus.requested,
    },
    pickup: destinationSchema,
    destination: destinationSchema,
    amount: {
      type: Number,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Ride = model("Ride", rideSchema);
