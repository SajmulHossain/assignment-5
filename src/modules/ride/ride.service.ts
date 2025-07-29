import { getDistance } from "../../utils/getDistance";
import { IRide } from "./ride.interface";
import { Ride } from "./ride.model";

const createRide = async(payload: IRide) => {
    const coordinate1 = payload.pickup;
    const coordinate2 = payload.destination;

    const distance = getDistance(
      [...coordinate1.coordinate,
      ...coordinate2.coordinate]
    );
    console.log(distance);

    // const ride = await Ride.create(payload);

    // return ride;
}

export const RideService = {
    createRide
}