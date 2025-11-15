import { Ride } from "../ride/ride.model";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from "date-fns";

const adminAnalytics = async () => {
  const rideVolume = await Ride.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        totalRides: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        date: {
          $concat: [
            { $toString: "$_id.year" },
            "-",
            { $toString: "$_id.month" },
            "-",
            { $toString: "$_id.day" },
          ],
        },
        totalRides: 1,
      },
    },
    { $sort: { date: 1 } },
  ]);


  const revenueTrend = await Ride.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        revenue: { $sum: "$amount" },
        rides: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        date: {
          $concat: [
            { $toString: "$_id.year" },
            "-",
            { $toString: "$_id.month" },
            "-",
            { $toString: "$_id.day" },
          ],
        },
        revenue: 1,
        rides: 1,
      },
    },
    { $sort: { date: 1 } },
  ]);


  const driverActivity = await Ride.aggregate([
    { $match: { driver: { $ne: null } } },
    {
      $group: {
        _id: "$driver",
        totalRides: { $sum: 1 },
        totalEarnings: { $sum: "$amount" },
        lastRide: { $max: "$createdAt" },
      },
    },
    {
      $project: {
        _id: 0,
        driverId: "$_id",
        totalRides: 1,
        totalEarnings: 1,
        lastRide: 1,
      },
    },
    { $sort: { totalRides: -1 } },
  ]);

  return {
    rideVolume,
    revenueTrend,
    driverActivity,
  };
};

const driverAnalytics = async (email: string) => {
    const dailyData = await Ride.find({
      email,
      createdAt: {
        $gte: startofday,
        $lte: endTime,
      },
    });
}



export const AnalyticService = {
  adminAnalytics,
  driverAnalytics
};
