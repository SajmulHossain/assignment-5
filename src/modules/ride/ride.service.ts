import AppError from "../../utils/AppError";
import { getDistance } from "../../utils/getDistance";
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

const updateRideStatus = async (id: string, payload: Partial<IRide>) => {
  const { status, driver } = payload;
  const ride = await Ride.findById(id);

  if(status === RideStatus.canceled && ride?.status !== RideStatus.requested) {
    throw new AppError(400, "You cannot cancel the ride now, ride is picked up by a ride");
  } 

  const data = await Ride.findByIdAndUpdate(id, { status, driver }, { new: true });

  return data;
};

export const RideService = {
  createRide,
  updateRideStatus,
};
