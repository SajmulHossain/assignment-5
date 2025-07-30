import { model, Schema } from "mongoose";
import { IDestination, IRide, IRideStatus, RideStatus } from "./ride.interface";

const destinationSchema = new Schema<IDestination>(
  {
    place_name: {
      type: String,
      required: true,
    },
    coordinate: {
      type: [Number],
      required: true,
    },
  },
  { _id: false }
);

const statusSchema = new Schema<IRideStatus>({
  state: {
    type: String,
    enum: Object.values(RideStatus),
    default: RideStatus.requested,
  },
},{
  versionKey:false, _id: false, timestamps: true
});

const rideSchema = new Schema<IRide>(
  {
    rider: {
      type: String,
      required: true,
      ref: "User",
    },
    driver: {
      type: String,
      ref: "User",
    },
    status:[statusSchema],
    pickup: destinationSchema,
    destination: destinationSchema,
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Ride = model("Ride", rideSchema);
