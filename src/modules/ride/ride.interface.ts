import { Types } from "mongoose";

export enum RideStatus {
  requested = "requested",
  accepted = "accepted",
  picked_up = "picked_up",
  in_transit = "in_transit",
  completed = "completed",
  cancelled = "cancelled",
}

export interface IRideStatus {
  timestamps?: Date;
  state: RideStatus;
  createdAt?: Date;
}

export interface IDestination {
  place_name: string;
  coordinate: number[];
}

export interface IRide {
  _id?: Types.ObjectId;
  rider: string;
  driver: string;
  pickup: IDestination;
  destination: IDestination;
  status: IRideStatus[];
  amount: number;

  createdAt?: Date;
  updatedAt?: Date;
}
