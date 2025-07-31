import AppError from "../../utils/AppError";
import { RideStatus } from "../ride/ride.interface";
import { Ride } from "../ride/ride.model";
import { DriverApprovalStatus, UserRole } from "../user/user.interface";
import { User } from "../user/user.model";

const approveDriver = async (id: string) => {
  const driver = await User.findOne({ _id: id, role: UserRole.driver });

  if (!driver) {
    throw new AppError(404, "Driver not found");
  }

  driver.driverApprovalStatus = DriverApprovalStatus.approve;
  await driver.save();

   return {
     driverStatus: driver.driverApprovalStatus,
   };
};

const suspendDriver = async (id: string) => {
  const driver = await User.findOne({ _id: id, role: UserRole.driver });

  if (!driver) {
    throw new AppError(404, "Driver not found");
  }

  driver.driverApprovalStatus = DriverApprovalStatus.suspend;
  driver.isDriverActive = false;
  
  await driver.save();

  return {
    driverStatus: driver.driverApprovalStatus
  }
};

const updateDriverActiveStatus = async (id: string) => {
  const driver = await User.findOne({ _id: id, role: UserRole.driver });

  if (!driver) {
    throw new AppError(404, "Driver not found");
  }

  driver.isDriverActive = !driver.isDriverActive;

  await driver.save();
  return {
    status: driver.isDriverActive
  }
};

const driverEarning = async(email: string) => {
  const [totalIncome] = await Ride.aggregate([
    {
      $match: { driver: email, "status.state": RideStatus.completed },
    },
    {
      $group: {
        _id: null,
        totalIncome: {$sum: "$amount"}
      }
    },
    {
      $project: {
        _id: false
      }
    }
  ]);

  const rides = await Ride.find({
    driver: email,
    "status.state": RideStatus.completed,
  });

  const history = rides.map(ride => {
    return {
      amount: ride.amount,
      from: ride.pickup,
      to: ride.destination,
      at: ride.status.find(state => state.state === RideStatus.completed)?.createdAt,
    }
  })

  return {...totalIncome, history}
}

export const DriverService = {
  suspendDriver,
  approveDriver,
  updateDriverActiveStatus,
  driverEarning,
};