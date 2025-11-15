import {
  endOfDay,
  endOfMonth,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { Ride } from "../ride/ride.model";

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
    driver: email,
    createdAt: {
      $gte: startOfDay(new Date()),
      $lte: endOfDay(new Date()),
    },
  }).select("amount createdAt");

  const monthlyData = await Ride.find({
    driver: email,
    createdAt: {
      $gte: startOfMonth(new Date()),
      $lte: endOfMonth(new Date()),
    },
  }).select("amount createdAt");

  const yearlyData = await Ride.find({
    driver: email,
    createdAt: {
      $gte: startOfYear(new Date()),
      $lte: endOfYear(new Date()),
    },
  }).select("amount createdAt");

  return {
    daily: dailyData,
    monthly: monthlyData,
    year: yearlyData,
  };
};

export const AnalyticService = {
  adminAnalytics,
  driverAnalytics,
};
