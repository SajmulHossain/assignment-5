import AppError from "../../utils/AppError";
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


export const DriverService = {
  suspendDriver,
  approveDriver,
  updateDriverActiveStatus,
};