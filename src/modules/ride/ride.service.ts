import { IRide } from "./ride.interface";
import { Ride } from "./ride.model";

const createRide = async(payload: IRide) => {
    const ride = await Ride.create(payload);

    return ride;
}

const RideService = {
    createRide
}