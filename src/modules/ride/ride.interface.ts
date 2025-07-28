export enum RideStatus {
  requested = "requested",
  accepted = "accepted",
  picked_up = "picked_up",
  in_transit = "in_transit",
  completed = "completed",
}

export interface IRide {
    destination: string;
    pickup: string;
    status: RideStatus;
}
