import AppError from "../../utils/AppError";
import { getDistance } from "../../utils/getDistance";
import { DriverApprovalStatus, IUser, UserRole } from "../user/user.interface";
import { User } from "../user/user.model";
import { IRide, RideStatus } from "./ride.interface";
import { Ride } from "./ride.model";

const createRide = async (payload: IRide, user: IUser) => {
  const coordinate1 = payload.pickup;
  const coordinate2 = payload.destination;

  const distance = getDistance([
    ...coordinate1.coordinate,
    ...coordinate2.coordinate,
  ]);

  const amount = Math.round(distance * 0.025);

  payload.amount = amount;
  payload.rider = user.email;

  const ride = await Ride.create(payload);

  return ride;
};

const updateRideStatus = async (id: string, payload: Record<string,string>, user: IUser) => {
  const { status } = payload as { status: string };
  const { email } = user;

  const isAvailableDriver = await User.findOne({ email, role: UserRole.driver, isDriverActive: true, driverApprovalStatus: DriverApprovalStatus.approve })

  if(!isAvailableDriver) {
    throw new AppError(404, "Driver is not available");
  }

  if(!isAvailableDriver?.vehicleInfo?.model) {
    throw new AppError(400, "Please update your vehicle info");
  }

  
  const ride = await Ride.findById(id);
  
  if(ride?.rider === isAvailableDriver.email) {
    throw new AppError(400, "You cannot handle your requested ride");
  }

  const isOnRide = await Ride.findOne({ driver: email });

  console.log(isOnRide);

  if(isOnRide) {
    throw new AppError(400, "You cannot accept another ride during a in transiter ride");
  }

  if(!ride){
    throw new AppError(404, "Ride not found");
  }

  if(status === RideStatus.requested) {
    throw new AppError(400, "Invalid request");
  }

  if(user.role === UserRole.rider && status !== RideStatus.cancelled) {
    throw new AppError(400, "Only driver can do this");
  }
  
  if (
    status === RideStatus.cancelled &&
    ride?.status.some((singleRide) => singleRide.state !== RideStatus.requested)
  ) {
    throw new AppError(
      400,
      `You cannot cancel the ride now, ride is ${ride?.status}`
    );
  }

  if (ride?.status.some((singleRide) => singleRide.state === status)
  ) {
    throw new AppError(400, `Ride is already ${status}`);
  }
  
  const rideStatusArr = Object.values(RideStatus);

  const currentStatus = ride.status[ride.status.length-1].state;
  
  const rideCurrentIndex = rideStatusArr.findIndex(rideValue => rideValue === currentStatus);

  const rideUpdateStatusIndex = rideStatusArr.findIndex(ride => ride === status);

  if(rideUpdateStatusIndex !== rideCurrentIndex + 1) {
    throw new AppError(400, `Give sequencial update. e.g, ${Object.values(RideStatus)}`);
  }

  const updatedStatus = [...ride.status, {state: status}]

  const data = await Ride.findByIdAndUpdate(id, { status: updatedStatus, driver: email }, { new: true });

  return data;
};

export const RideService = {
  createRide,
  updateRideStatus,
};
