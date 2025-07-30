import { Types } from "mongoose";
import AppError from "../../utils/AppError";
import { getDistance } from "../../utils/getDistance";
import { IUser, UserRole } from "../user/user.interface";
import { IRide, RideStatus } from "./ride.interface";
import { Ride } from "./ride.model";

const createRide = async (payload: IRide) => {
  const coordinate1 = payload.pickup;
  const coordinate2 = payload.destination;

  const distance = getDistance([
    ...coordinate1.coordinate,
    ...coordinate2.coordinate,
  ]);

  const amount = Math.round(distance * 0.025);

  payload.amount = amount;

  const ride = await Ride.create(payload);

  return ride;
};

const updateRideStatus = async (id: string, payload: Partial<IRide>, user: IUser) => {
  const { status, driver } = payload as { status: RideStatus, driver: Types.ObjectId };
  const ride = await Ride.findById(id);

  if(status === RideStatus.requested) {
    throw new AppError(400, "Invalid request");
  }

  if(user.role === UserRole.rider && status !== RideStatus.cancelled) {
    throw new AppError(400, "Only driver can do this");
  }
  
  if(status === RideStatus.cancelled && ride?.status !== RideStatus.requested) {
    throw new AppError(400, `You cannot cancel the ride now, ride is ${ride?.status}`);
  }

  if(status === ride?.status) {
    throw new AppError(400, `Ride is already ${status}`)
  }
  
  const rideStatusArr = Object.values(RideStatus);
  const rideCurrentIndex = rideStatusArr.findIndex(rideStatus => rideStatus  === ride?.status);
  const rideUpdateStatusIndex = rideStatusArr.findIndex(ride => ride === status);

  if(rideUpdateStatusIndex !== rideCurrentIndex + 1) {
    throw new AppError(400, `Give sequencial update. e.g, ${Object.values(RideStatus)}`)
  }

  const data = await Ride.findByIdAndUpdate(id, { status, driver }, { new: true });

  return data;
};

export const RideService = {
  createRide,
  updateRideStatus,
};
